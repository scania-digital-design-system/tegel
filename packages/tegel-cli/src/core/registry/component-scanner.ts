import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import { ComponentEntry } from '../../types/index';
import { logger } from '../logger';
import { DependencyAnalyzer } from './dependency-analyzer';

export interface ComponentScanResult {
  allComponents: Map<string, ComponentEntry>;
  topLevelComponents: Map<string, ComponentEntry>;
  subComponents: Map<string, ComponentEntry>;
}

export class ComponentScanner {
  private componentsPath: string;

  private cache: Map<string, ComponentEntry> = new Map();

  private topLevelComponents: Map<string, ComponentEntry> = new Map();

  private subComponents: Map<string, ComponentEntry> = new Map();

  constructor(componentsPath: string) {
    this.componentsPath = componentsPath;
  }

  async scanAll(): Promise<ComponentScanResult> {
    logger.debug(`Scanning components in: ${this.componentsPath}`);

    // First, find only top-level component directories
    const topLevelDirs = await this.findTopLevelComponentDirectories();

    // Scan each top-level directory and its subdirectories
    await Promise.all(topLevelDirs.map((dir) => this.scanComponentDirectory(dir)));

    // Analyze dependencies after all components are scanned
    const analyzer = new DependencyAnalyzer(this.componentsPath, this.cache);
    await analyzer.analyzeAll();

    logger.debug(
      `Found ${this.cache.size} total components (${this.topLevelComponents.size} top-level, ${this.subComponents.size} sub-components)`,
    );

    return {
      allComponents: this.cache,
      topLevelComponents: this.topLevelComponents,
      subComponents: this.subComponents,
    };
  }

  private async scanComponentDirectory(componentDir: string): Promise<void> {
    // Scan the main component
    const entry = await this.scanComponent(componentDir);
    if (entry) {
      this.cache.set(entry.name, entry);

      // Use the isSubComponent flag from the component metadata
      if (!entry.metadata.isSubComponent) {
        this.topLevelComponents.set(entry.name, entry);
      } else {
        this.subComponents.set(entry.name, entry);
      }
    }

    // Look for sub-components in subdirectories
    const subDirs = await ComponentScanner.findSubComponentDirectories(componentDir);
    await Promise.all(subDirs.map((subDir) => this.scanComponentDirectory(subDir)));
  }

  async scanComponent(componentDir: string): Promise<ComponentEntry | null> {
    const componentName = path.basename(componentDir);

    // Skip special directories
    if (componentName.startsWith('_') || componentName === 'test' || componentName === 'tests') {
      return null;
    }

    try {
      // Find main component file
      const componentFile = await ComponentScanner.findComponentFile(componentDir);
      if (!componentFile) {
        logger.debug(`No component file found in ${componentDir}`);
        return null;
      }

      // Extract component metadata
      const metadata = await ComponentScanner.extractMetadata(componentFile);
      if (!metadata.tag) {
        return null;
      }

      // Determine if this is a sub-component based on path
      const relativePath = path.relative(this.componentsPath, componentDir);
      const pathParts = relativePath.split(path.sep).filter((p) => p !== '');
      const pathDepth = pathParts.length;

      // Determine if this is a sub-component
      const dirName = path.basename(componentDir);
      const parentDirName = pathDepth > 1 ? pathParts[pathParts.length - 2] : null;

      // Special cases for determining if something is a top-level component:
      // 1. If the component directory name matches its parent (e.g., table/table)
      const isMainComponentInSubdir = parentDirName && dirName === parentDirName;

      // 2. If it's directly under a category folder like tabs/ but is a complete component
      // (e.g., tabs/folder-tabs, tabs/inline-tabs, tabs/navigation-tabs)
      const firstDir = pathParts[0];
      const isTabVariant = firstDir === 'tabs' && dirName.endsWith('-tabs') && pathDepth === 2;

      const isSubComponent = pathDepth > 1 && !isMainComponentInSubdir && !isTabVariant;

      // Find all related files
      const files = await ComponentScanner.findComponentFiles(componentDir);

      // Create component entry
      const entry: ComponentEntry = {
        name: componentName,
        tag: metadata.tag,
        files: {
          component: path.relative(this.componentsPath, componentFile),
          styles: files.styles.map((f) => path.relative(this.componentsPath, f)),
          tests: files.tests.map((f) => path.relative(this.componentsPath, f)),
          types: files.types.map((f) => path.relative(this.componentsPath, f)),
          stories: files.stories.map((f) => path.relative(this.componentsPath, f)),
        },
        dependencies: {
          internal: [], // Will be filled by dependency analyzer
          utilities: [], // Will be filled by dependency analyzer
          mixins: [], // Will be filled by dependency analyzer
          types: [], // Will be filled by dependency analyzer
        },
        metadata: {
          version: '1.33.0', // TODO: Get from package.json
          stability: ComponentScanner.determineStability(componentDir),
          description: metadata.description,
          isSubComponent,
          parentComponent: isSubComponent ? this.getParentComponentName(componentDir) : undefined,
        },
      };

      return entry;
    } catch (error) {
      logger.warn(`Failed to scan component ${componentName}`);
      return null;
    }
  }

  private async findTopLevelComponentDirectories(): Promise<string[]> {
    const pattern = path.join(this.componentsPath, '*/');
    const dirs = await glob(pattern);

    // Filter out non-component directories
    return dirs.filter((dir) => {
      const basename = path.basename(dir);
      return !basename.startsWith('_') && basename !== 'test' && basename !== 'tests';
    });
  }

  private static async findSubComponentDirectories(parentDir: string): Promise<string[]> {
    const pattern = path.join(parentDir, '*/');
    const dirs = await glob(pattern);

    // Filter to find only directories that contain component files
    const componentDirs: string[] = [];

    const componentDirPromises = dirs
      .filter((dir) => {
        const basename = path.basename(dir);
        return !basename.startsWith('_') && basename !== 'test' && basename !== 'tests';
      })
      .map(async (dir) => {
        const hasComponent = await ComponentScanner.hasComponentFile(dir);
        return hasComponent ? dir : null;
      });

    const results = await Promise.all(componentDirPromises);
    componentDirs.push(...(results.filter((dir) => dir !== null) as string[]));

    return componentDirs;
  }

  private static async hasComponentFile(dir: string): Promise<boolean> {
    const componentFile = await ComponentScanner.findComponentFile(dir);
    return componentFile !== null;
  }

  private static async findComponentFile(componentDir: string): Promise<string | null> {
    const baseName = path.basename(componentDir);
    const possibleFiles = [
      path.join(componentDir, `${baseName}.tsx`),
      path.join(componentDir, 'index.tsx'),
      // Check for components with different file names
      ...(await glob(path.join(componentDir, '*.tsx'))),
    ];

    const fileChecks = await Promise.all(
      possibleFiles.map(async (file) => {
        if (await fs.pathExists(file)) {
          const content = await fs.readFile(file, 'utf-8');
          // Check if it's a Stencil component
          if (content.includes('@Component') && content.includes('tag:')) {
            return file;
          }
        }
        return null;
      }),
    );

    return fileChecks.find((file) => file !== null) || null;
  }

  private static async extractMetadata(componentFile: string): Promise<{
    tag?: string;
    description?: string;
  }> {
    const content = await fs.readFile(componentFile, 'utf-8');
    const metadata: {
      tag?: string;
      description?: string;
    } = {};

    // Extract tag name
    const tagMatch = content.match(/tag:\s*['"]([^'"]+)['"]/);
    if (tagMatch) {
      [, metadata.tag] = tagMatch;
    }

    // Extract description from JSDoc
    const jsdocMatch = content.match(/\/\*\*([^*]|\*(?!\/))*\*\/\s*@Component/s);
    if (jsdocMatch) {
      const jsdoc = jsdocMatch[0];
      const descMatch = jsdoc.match(/@description\s+(.+?)(?:@|\*\/)/s);
      if (descMatch) {
        metadata.description = descMatch[1].trim();
      } else {
        // Try to get first line of JSDoc as description
        const firstLineMatch = jsdoc.match(/\/\*\*\s*\n\s*\*\s*([^@\n]+)/);
        if (firstLineMatch) {
          metadata.description = firstLineMatch[1].trim();
        }
      }
    }

    return metadata;
  }

  private static async findComponentFiles(componentDir: string): Promise<{
    styles: string[];
    tests: string[];
    types: string[];
    stories: string[];
  }> {
    const files = {
      styles: [] as string[],
      tests: [] as string[],
      types: [] as string[],
      stories: [] as string[],
    };

    // Find style files
    files.styles = await glob(path.join(componentDir, '*.scss'));

    // Find test files
    const testDir = path.join(componentDir, 'test');
    if (await fs.pathExists(testDir)) {
      files.tests = await glob(path.join(testDir, '**/*.{ts,tsx,js,jsx}'));
    }

    // Find type definition files
    files.types = await glob(path.join(componentDir, '*.d.ts'));

    // Find story files
    files.stories = await glob(path.join(componentDir, '*.stories.{ts,tsx,js,jsx}'));

    return files;
  }

  private static determineStability(componentDir: string): 'stable' | 'beta' | 'experimental' {
    // Check if component is in beta folder
    if (componentDir.includes('_beta')) {
      return 'beta';
    }

    // Check if component is in experimental folder
    if (componentDir.includes('_experimental')) {
      return 'experimental';
    }

    return 'stable';
  }

  private getParentComponentName(componentDir: string): string {
    const relativePath = path.relative(this.componentsPath, componentDir);
    const parts = relativePath.split(path.sep);
    return parts[0]; // The first part is the parent component name
  }

  // Get a specific component entry
  getComponent(name: string): ComponentEntry | undefined {
    return this.cache.get(name);
  }

  // Get all components
  getAllComponents(): ComponentEntry[] {
    return Array.from(this.cache.values());
  }

  // Get only top-level components
  getTopLevelComponents(): ComponentEntry[] {
    return Array.from(this.topLevelComponents.values());
  }

  // Find component by tag name
  findByTag(tag: string): ComponentEntry | undefined {
    return Array.from(this.cache.values()).find((entry) => entry.tag === tag);
  }

  // Get component names
  getComponentNames(): string[] {
    return Array.from(this.cache.keys());
  }

  // Get only top-level component names
  getTopLevelComponentNames(): string[] {
    return Array.from(this.topLevelComponents.keys());
  }

  // Scan for installed components in a project directory
  async scanInstalled(): Promise<{
    components: Map<string, import('../../types/index').InstalledComponentInfo>;
  }> {
    logger.debug(`Scanning installed components in: ${this.componentsPath}`);

    const installedComponents = new Map<
      string,
      import('../../types/index').InstalledComponentInfo
    >();

    try {
      // Check if the components directory exists
      if (!(await fs.pathExists(this.componentsPath))) {
        return { components: installedComponents };
      }

      // Find all component directories (direct subdirectories only)
      const entries = await fs.readdir(this.componentsPath, { withFileTypes: true });
      const componentDirs = entries
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
        .map((entry) => entry.name);

      // Process each component directory
      await Promise.all(
        componentDirs.map(async (dirName) => {
          const componentPath = path.join(this.componentsPath, dirName);

          // Find the main component file (TSX)
          const componentFiles = await glob(path.join(componentPath, '*.tsx'));
          const mainComponentFile = componentFiles.find(
            (file) => path.basename(file, '.tsx') === dirName,
          );

          // Find all style files
          const styleFiles = await glob(path.join(componentPath, '*.scss'));

          if (mainComponentFile || styleFiles.length > 0) {
            installedComponents.set(dirName, {
              name: dirName,
              path: componentPath,
              files: {
                component: mainComponentFile,
                styles: styleFiles.map((f) => path.relative(componentPath, f)),
              },
            });
          }
        }),
      );
    } catch (error) {
      logger.error(`Failed to scan installed components: ${error}`);
    }

    logger.debug(`Found ${installedComponents.size} installed component(s)`);
    return { components: installedComponents };
  }
}
