import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import { logger } from '../logger.js';
export class ComponentScanner {
    componentsPath;
    cache = new Map();
    constructor(tegelRootPath) {
        this.componentsPath = path.join(tegelRootPath, 'packages', 'core', 'src', 'components');
    }
    async scanAll() {
        logger.debug(`Scanning components in: ${this.componentsPath}`);
        // Find all component directories
        const componentDirs = await this.findComponentDirectories();
        // Scan each component
        for (const dir of componentDirs) {
            const entry = await this.scanComponent(dir);
            if (entry) {
                this.cache.set(entry.name, entry);
            }
        }
        logger.debug(`Found ${this.cache.size} components`);
        return this.cache;
    }
    async scanComponent(componentDir) {
        const componentName = path.basename(componentDir);
        // Skip special directories
        if (componentName.startsWith('_') || componentName === 'test') {
            return null;
        }
        try {
            // Find main component file
            const componentFile = await this.findComponentFile(componentDir);
            if (!componentFile) {
                logger.debug(`No component file found in ${componentDir}`);
                return null;
            }
            // Extract component metadata
            const metadata = await this.extractMetadata(componentFile);
            if (!metadata.tag) {
                return null;
            }
            // Find all related files
            const files = await this.findComponentFiles(componentDir);
            // Create component entry
            const entry = {
                name: componentName,
                tag: metadata.tag,
                files: {
                    component: path.relative(this.componentsPath, componentFile),
                    styles: files.styles.map(f => path.relative(this.componentsPath, f)),
                    tests: files.tests.map(f => path.relative(this.componentsPath, f)),
                    types: files.types.map(f => path.relative(this.componentsPath, f)),
                    stories: files.stories.map(f => path.relative(this.componentsPath, f)),
                },
                dependencies: {
                    internal: [], // Will be filled by dependency analyzer
                    utilities: [], // Will be filled by dependency analyzer
                    mixins: [], // Will be filled by dependency analyzer
                },
                metadata: {
                    version: '1.33.0', // TODO: Get from package.json
                    stability: this.determineStability(componentDir),
                    description: metadata.description,
                },
            };
            return entry;
        }
        catch (error) {
            logger.warn(`Failed to scan component ${componentName}: ${error}`);
            return null;
        }
    }
    async findComponentDirectories() {
        const pattern = path.join(this.componentsPath, '*/');
        const dirs = await glob(pattern);
        // Also check for nested components (like dropdown-option inside dropdown)
        const nestedPattern = path.join(this.componentsPath, '*', '*/');
        const nestedDirs = await glob(nestedPattern);
        // Filter out non-component directories
        const allDirs = [...dirs, ...nestedDirs].filter(dir => {
            const basename = path.basename(dir);
            return !basename.startsWith('_') && basename !== 'test' && basename !== 'tests';
        });
        return allDirs;
    }
    async findComponentFile(componentDir) {
        const baseName = path.basename(componentDir);
        const possibleFiles = [
            path.join(componentDir, `${baseName}.tsx`),
            path.join(componentDir, 'index.tsx'),
            // Check for components with different file names
            ...(await glob(path.join(componentDir, '*.tsx'))),
        ];
        for (const file of possibleFiles) {
            if (await fs.pathExists(file)) {
                const content = await fs.readFile(file, 'utf-8');
                // Check if it's a Stencil component
                if (content.includes('@Component') && content.includes('tag:')) {
                    return file;
                }
            }
        }
        return null;
    }
    async extractMetadata(componentFile) {
        const content = await fs.readFile(componentFile, 'utf-8');
        const metadata = {};
        // Extract tag name
        const tagMatch = content.match(/tag:\s*['"]([^'"]+)['"]/);
        if (tagMatch) {
            metadata.tag = tagMatch[1];
        }
        // Extract description from JSDoc
        const jsdocMatch = content.match(/\/\*\*([^*]|\*(?!\/))*\*\/\s*@Component/s);
        if (jsdocMatch) {
            const jsdoc = jsdocMatch[0];
            const descMatch = jsdoc.match(/@description\s+(.+?)(?:@|\*\/)/s);
            if (descMatch) {
                metadata.description = descMatch[1].trim();
            }
            else {
                // Try to get first line of JSDoc as description
                const firstLineMatch = jsdoc.match(/\/\*\*\s*\n\s*\*\s*([^@\n]+)/);
                if (firstLineMatch) {
                    metadata.description = firstLineMatch[1].trim();
                }
            }
        }
        return metadata;
    }
    async findComponentFiles(componentDir) {
        const files = {
            styles: [],
            tests: [],
            types: [],
            stories: [],
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
    determineStability(componentDir) {
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
    // Get a specific component entry
    getComponent(name) {
        return this.cache.get(name);
    }
    // Get all components
    getAllComponents() {
        return Array.from(this.cache.values());
    }
    // Find component by tag name
    findByTag(tag) {
        return Array.from(this.cache.values()).find(entry => entry.tag === tag);
    }
    // Get component names
    getComponentNames() {
        return Array.from(this.cache.keys());
    }
}
//# sourceMappingURL=component-scanner.js.map