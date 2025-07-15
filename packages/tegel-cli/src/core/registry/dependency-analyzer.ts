import fs from 'fs-extra';
import path from 'path';
import { ComponentEntry } from '../../types/index';
import { logger } from '../logger';

interface DependencyInfo {
  components: Set<string>;
  utilities: Set<string>;
  mixins: Set<string>;
  assets: Set<string>;
  types: Set<string>;
}

export class DependencyAnalyzer {
  private componentsPath: string;

  private componentMap: Map<string, ComponentEntry>;

  private tagToComponentMap: Map<string, string> = new Map();

  constructor(componentsPath: string, components: Map<string, ComponentEntry>) {
    this.componentsPath = componentsPath;
    this.componentMap = components;

    // Build tag to component name mapping
    Array.from(components.entries()).forEach(([name, entry]) => {
      this.tagToComponentMap.set(entry.tag, name);
    });
  }

  async analyzeAll(): Promise<void> {
    logger.debug('Analyzing component dependencies...');

    await Promise.all(
      Array.from(this.componentMap.values()).map(async (entry) => {
        const deps = await this.analyzeComponent(entry);

        // Update component entry with dependencies
        entry.dependencies.internal = Array.from(deps.components);
        entry.dependencies.utilities = Array.from(deps.utilities);
        entry.dependencies.mixins = Array.from(deps.mixins);
        entry.dependencies.assets = Array.from(deps.assets);
        entry.dependencies.types = Array.from(deps.types);
      }),
    );

    logger.debug('Dependency analysis complete');
  }

  async analyzeComponent(component: ComponentEntry): Promise<DependencyInfo> {
    const deps: DependencyInfo = {
      components: new Set(),
      utilities: new Set(),
      mixins: new Set(),
      assets: new Set(),
      types: new Set(),
    };

    // Analyze all component files
    const allFiles = [
      path.join(this.componentsPath, component.files.component),
      ...component.files.styles.map((s) => path.join(this.componentsPath, s)),
      ...(component.files.tests || []).map((t) => path.join(this.componentsPath, t)),
    ];

    await Promise.all(
      allFiles.map(async (filePath) => {
        if (await fs.pathExists(filePath)) {
          const content = await fs.readFile(filePath, 'utf-8');

          if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
            await this.analyzeTypeScriptContent(content, deps, filePath);
          } else if (filePath.endsWith('.scss') || filePath.endsWith('.sass')) {
            await DependencyAnalyzer.analyzeScssContent(content, deps);
          }
        }
      }),
    );

    return deps;
  }

  private async analyzeTypeScriptContent(
    content: string,
    deps: DependencyInfo,
    filePath: string,
  ): Promise<void> {
    // Extract imports
    this.extractImports(content, deps);

    // Extract internal component dependencies
    const internalDeps = DependencyAnalyzer.extractInternalDependencies(content);
    internalDeps.forEach((dep) => {
      const componentName = this.tagToComponentMap.get(`tds-${dep}`);
      if (componentName) {
        deps.components.add(componentName);
      }
    });

    // Extract type dependencies
    const typeDeps = DependencyAnalyzer.extractTypeDependencies(content);
    typeDeps.forEach((dep) => deps.types.add(dep));

    // Special handling for specific components
    DependencyAnalyzer.handleSpecialCases(content, deps, filePath);

    // Check for sub-component dependencies in the same folder
    await this.detectSubcomponentDependencies(deps, filePath);
  }

  private extractImports(content: string, deps: DependencyInfo): void {
    // Match import statements
    const importRegex = /import\s+(?:type\s+)?(?:{[^}]+}|[^;]+)\s+from\s+['"]([^'"]+)['"]/g;
    let match;

    // eslint-disable-next-line no-cond-assign
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      const importContent = match[0];

      // Check for utility imports
      if (importPath.includes('/utils/')) {
        const utilName = path.basename(importPath).replace(/\.(js|ts|tsx)$/, '');
        deps.utilities.add(utilName);
      }

      // Check for icon imports
      if (importPath.includes('@scania/tegel-icons') || importPath.includes('types/icons')) {
        deps.types.add('icons');
        // If importing specific icons, we need the icon component
        if (importContent.includes('{') && !importContent.includes('type ')) {
          deps.components.add('icon');
        }
      }

      // Check for types imports (relative paths to types folder)
      if (
        importPath.includes('/types/') ||
        importPath.includes('../types/') ||
        importPath.includes('../../types/')
      ) {
        const typeName = path.basename(importPath, '.ts').replace(/\.(js|tsx)$/, '');
        deps.types.add(typeName.toLowerCase());
      }

      // Check for local icon array imports (relative paths)
      if (
        importPath.startsWith('./') &&
        (importPath.includes('IconsArray') ||
          importPath.includes('scaniaIconsArray') ||
          importPath.includes('tratonIconsArray'))
      ) {
        // Extract the filename for the asset (without extension)
        const fileName = path.basename(importPath);
        deps.assets.add(fileName);
      }

      // Check for component imports
      if (
        importPath.includes('../') &&
        importPath.includes('components/') &&
        !importPath.includes('.scss')
      ) {
        const pathParts = importPath.split('/');
        const componentIdx = pathParts.indexOf('components');
        if (componentIdx !== -1 && componentIdx + 1 < pathParts.length) {
          const possibleComponent = pathParts[componentIdx + 1];
          if (this.componentMap.has(possibleComponent)) {
            deps.components.add(possibleComponent);
          }
        }
      }
    }
  }

  private static extractInternalDependencies(content: string): Set<string> {
    const dependencies = new Set<string>();

    // Common component reference patterns
    const patterns = [
      // Component tag usage in templates/JSX: <tds-button>, </tds-icon>
      /<(\/?)(tds-[a-z-]+)/g,

      // String references: 'tds-button', "tds-icon"
      /['"]tds-([a-z-]+)['"/]/g,

      // CSS selectors: .tds-button, tds-icon
      /(?:^|\s|,)(?:\.|#)?tds-([a-z-]+)(?:[\s[\]{,:)>+~]|$)/gm,

      // querySelector/querySelectorAll
      /querySelector(?:All)?\s*\([\s\S]*?['"`](?:\.|#)?tds-([a-z-]+)/g,

      // getElementsByTagName
      /getElementsByTagName\s*\([\s\S]*?['"`]tds-([a-z-]+)/g,

      // createElement
      /createElement\s*\([\s\S]*?['"`]tds-([a-z-]+)/g,

      // Custom element definitions
      /customElements\.(?:define|get|whenDefined)\s*\([\s\S]*?['"`]tds-([a-z-]+)/g,

      // tagName comparisons (case insensitive)
      /tagName\s*===?\s*['"`]tds-([a-z-]+)['"`]/gi,

      // tagName uppercase comparisons (e.g., TDS-DROPDOWN-OPTION)
      /tagName\s*===?\s*['"`]TDS-([A-Z-]+)['"`]/g,

      // StencilJS specific patterns
      /tag:\s*['"`]tds-([a-z-]+)['"`]/g,

      // Type references (e.g., HTMLTdsDropdownOptionElement)
      /HTML(?:Tds|TDS)([A-Z][a-zA-Z]+)Element/g,
    ];

    patterns.forEach((pattern) => {
      const matches = Array.from(content.matchAll(pattern));
      matches.forEach((match) => {
        let componentName = match[2] || match[1]; // Handle both capture groups

        // Handle uppercase tagName comparisons
        if (pattern.source.includes('TDS-([A-Z-]+)')) {
          componentName = componentName?.toLowerCase();
        }

        // Handle HTMLTds*Element type references
        if (pattern.source.includes('HTML(?:Tds|TDS)')) {
          // Convert PascalCase to kebab-case
          componentName = componentName
            ?.replace(/([A-Z])/g, '-$1')
            .toLowerCase()
            .slice(1);
        }

        if (componentName && !componentName.startsWith('-')) {
          dependencies.add(componentName);
        }
      });
    });

    // Remove self-reference
    const selfMatch = content.match(/tag:\s*['"`]tds-([a-z-]+)['"`]/);
    if (selfMatch) {
      dependencies.delete(selfMatch[1]);
    }

    return dependencies;
  }

  private static extractTypeDependencies(content: string): Set<string> {
    const dependencies = new Set<string>();

    // Import type dependencies
    const importMatches = content.matchAll(
      /import\s+(?:type\s+)?{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g,
    );
    Array.from(importMatches).forEach((match) => {
      const imports = match[1];
      const from = match[2];

      // Look for component-specific types
      if (from.includes('components/') && !from.includes('.scss')) {
        const typeNames = imports.split(',').map((i) => i.trim());
        typeNames.forEach((typeName) => {
          // Convert type names like TdsButtonSize to button
          const componentMatch = typeName.match(/Tds([A-Z][a-z]+)/);
          if (componentMatch) {
            dependencies.add(componentMatch[1].toLowerCase());
          }
        });
      }

      // Check for icon types
      if (from.includes('types/icons') || from.includes('@scania/tegel-icons')) {
        dependencies.add('icons');
      }
    });

    return dependencies;
  }

  private static handleSpecialCases(content: string, deps: DependencyInfo, filePath: string): void {
    const componentName = path.basename(path.dirname(filePath));

    // Special case: dropdown expects dropdown-option children
    if (componentName === 'dropdown') {
      if (
        content.includes('TDS-DROPDOWN-OPTION') ||
        content.includes('HTMLTdsDropdownOptionElement') ||
        content.includes('tds-dropdown-option')
      ) {
        deps.components.add('dropdown-option');
      }
    }

    // Special case: components using icons
    if (content.includes('<tds-icon') || content.includes('tds-icon')) {
      deps.components.add('icon');
    }

    // Special case: table expects various table-related components
    if (componentName === 'table') {
      const tableComponents = [
        'table-header',
        'table-body',
        'table-footer',
        'table-header-cell',
        'table-body-cell',
      ];
      tableComponents.forEach((comp) => {
        if (content.includes(`tds-${comp}`) || content.includes(`TDS-${comp.toUpperCase()}`)) {
          deps.components.add(comp);
        }
      });
    }

    // Special case: toast expects toast-item
    if (componentName === 'toast') {
      if (content.includes('tds-toast-item') || content.includes('TDS-TOAST-ITEM')) {
        deps.components.add('toast-item');
      }
    }
  }

  private async detectSubcomponentDependencies(
    deps: DependencyInfo,
    filePath: string,
  ): Promise<void> {
    const componentDir = path.dirname(filePath);

    try {
      // Check if the component directory exists
      // eslint-disable-next-line no-await-in-loop
      if (!(await fs.pathExists(componentDir))) {
        return;
      }

      // Read all items in the component directory
      // eslint-disable-next-line no-await-in-loop
      const items = await fs.readdir(componentDir, { withFileTypes: true });

      // Find subdirectories (potential sub-components)
      const subdirs = items.filter((item) => item.isDirectory());

      // eslint-disable-next-line no-restricted-syntax
      for (const subdir of subdirs) {
        const subdirName = subdir.name;

        // Check if this subdirectory is a known component
        if (this.componentMap.has(subdirName)) {
          deps.components.add(subdirName);
        }
      }
    } catch (error) {
      // Silently ignore errors in directory reading
      logger.debug(`Could not read component directory: ${componentDir}`);
    }
  }

  private static async analyzeScssContent(content: string, deps: DependencyInfo): Promise<void> {
    // Extract @import statements
    const importRegex = /@import\s+['"]([^'"]+)['"]/g;
    let match;

    // eslint-disable-next-line no-cond-assign
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];

      // Check for mixin imports
      if (importPath.includes('mixins/')) {
        const mixinName = path.basename(importPath, '.scss').replace(/^_/, '');
        deps.mixins.add(mixinName);
      }
    }

    // Extract @use statements (newer Sass syntax)
    const useRegex = /@use\s+['"]([^'"]+)['"]/g;
    // eslint-disable-next-line no-cond-assign
    while ((match = useRegex.exec(content)) !== null) {
      const usePath = match[1];

      if (usePath.includes('mixins/')) {
        const mixinName = path.basename(usePath, '.scss').replace(/^_/, '');
        deps.mixins.add(mixinName);
      }
    }
  }

  // Get full dependency tree for a component (including transitive dependencies)
  getFullDependencyTree(componentName: string): Set<string> {
    const visited = new Set<string>();
    const queue = [componentName];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue; // eslint-disable-line no-continue

      visited.add(current);

      const component = this.componentMap.get(current);
      if (component && component.dependencies.internal) {
        component.dependencies.internal.forEach((dep) => {
          if (!visited.has(dep)) {
            queue.push(dep);
          }
        });
      }
    }

    visited.delete(componentName); // Remove self from dependencies
    return visited;
  }

  // Get all utilities used by a component and its dependencies
  getAllUtilities(componentName: string): Set<string> {
    const utils = new Set<string>();
    const components = this.getFullDependencyTree(componentName);
    components.add(componentName);

    Array.from(components).forEach((comp) => {
      const component = this.componentMap.get(comp);
      if (component && component.dependencies.utilities) {
        component.dependencies.utilities.forEach((util) => utils.add(util));
      }
    });

    return utils;
  }

  // Get all mixins used by a component and its dependencies
  getAllMixins(componentName: string): Set<string> {
    const mixins = new Set<string>();
    const components = this.getFullDependencyTree(componentName);
    components.add(componentName);

    Array.from(components).forEach((comp) => {
      const component = this.componentMap.get(comp);
      if (component && component.dependencies.mixins) {
        component.dependencies.mixins.forEach((mixin) => mixins.add(mixin));
      }
    });

    return mixins;
  }

  // Get all types used by a component and its dependencies
  getAllTypes(componentName: string): Set<string> {
    const types = new Set<string>();
    const components = this.getFullDependencyTree(componentName);
    components.add(componentName);

    Array.from(components).forEach((comp) => {
      const component = this.componentMap.get(comp);
      if (component && component.dependencies.types) {
        component.dependencies.types.forEach((type) => types.add(type));
      }
    });

    return types;
  }

  // Get all assets used by a component and its dependencies
  getAllAssets(componentName: string): Set<string> {
    const assets = new Set<string>();
    const components = this.getFullDependencyTree(componentName);
    components.add(componentName);

    Array.from(components).forEach((comp) => {
      const component = this.componentMap.get(comp);
      if (component && component.dependencies.assets) {
        component.dependencies.assets.forEach((asset) => assets.add(asset));
      }
    });

    return assets;
  }
}
