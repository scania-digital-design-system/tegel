import fs from 'fs-extra';
import path from 'path';
import { logger } from '../logger.js';
export class DependencyAnalyzer {
    componentsPath;
    componentMap;
    tagToComponentMap = new Map();
    constructor(tegelRootPath, components) {
        this.componentsPath = path.join(tegelRootPath, 'packages', 'core', 'src', 'components');
        this.componentMap = components;
        // Build tag to component name mapping
        for (const [name, entry] of components) {
            this.tagToComponentMap.set(entry.tag, name);
        }
    }
    async analyzeAll() {
        logger.debug('Analyzing component dependencies...');
        for (const [_name, entry] of this.componentMap) {
            const deps = await this.analyzeComponent(entry);
            // Update component entry with dependencies
            entry.dependencies.internal = Array.from(deps.components);
            entry.dependencies.utilities = Array.from(deps.utilities);
            entry.dependencies.mixins = Array.from(deps.mixins);
            entry.dependencies.assets = Array.from(deps.assets);
        }
        logger.debug('Dependency analysis complete');
    }
    async analyzeComponent(component) {
        const deps = {
            components: new Set(),
            utilities: new Set(),
            mixins: new Set(),
            assets: new Set(),
        };
        // Analyze TypeScript/TSX files
        const tsxFile = path.join(this.componentsPath, component.files.component);
        if (await fs.pathExists(tsxFile)) {
            await this.analyzeTypeScriptFile(tsxFile, deps);
        }
        // Analyze SCSS files
        for (const styleFile of component.files.styles) {
            const scssPath = path.join(this.componentsPath, styleFile);
            if (await fs.pathExists(scssPath)) {
                await this.analyzeScssFile(scssPath, deps);
            }
        }
        return deps;
    }
    async analyzeTypeScriptFile(filePath, deps) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            // Parse imports
            this.extractImports(content, deps);
            // Parse DOM queries and component references
            this.extractDomQueries(content, deps);
            // Parse JSX component usage
            this.extractJsxComponents(content, deps);
        }
        catch (error) {
            logger.warn(`Failed to analyze TypeScript file ${filePath}: ${error}`);
        }
    }
    extractImports(content, deps) {
        // Match import statements
        const importRegex = /import\s+(?:{[^}]+}|[^;]+)\s+from\s+['"]([^'"]+)['"]/g;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
            const importPath = match[1];
            // Check for utility imports
            if (importPath.includes('../utils/') || importPath.includes('../../utils/')) {
                const utilName = path.basename(importPath, '.js').replace(/\.(ts|tsx)$/, '');
                deps.utilities.add(utilName);
            }
            // Check for component imports
            if (importPath.includes('../') && !importPath.includes('utils')) {
                // Could be another component
                const possibleComponent = path.basename(path.dirname(importPath));
                if (this.componentMap.has(possibleComponent)) {
                    deps.components.add(possibleComponent);
                }
            }
        }
    }
    extractDomQueries(content, deps) {
        // Match querySelector patterns
        const patterns = [
            /querySelector(?:All)?\s*\(\s*['"]tds-([^'"]+)['"]/g,
            /getElementsByTagName\s*\(\s*['"]tds-([^'"]+)['"]/g,
            /closest\s*\(\s*['"]tds-([^'"]+)['"]/g,
        ];
        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                const tagSuffix = match[1];
                const tag = `tds-${tagSuffix}`;
                const componentName = this.tagToComponentMap.get(tag);
                if (componentName) {
                    deps.components.add(componentName);
                }
            }
        }
        // Match tag name comparisons
        const tagCompareRegex = /tagName\.toLowerCase\(\)\s*===\s*['"]tds-([^'"]+)['"]/g;
        let match;
        while ((match = tagCompareRegex.exec(content)) !== null) {
            const tag = `tds-${match[1]}`;
            const componentName = this.tagToComponentMap.get(tag);
            if (componentName) {
                deps.components.add(componentName);
            }
        }
    }
    extractJsxComponents(content, deps) {
        // Match JSX component usage
        const jsxRegex = /<(tds-[a-z-]+)/g;
        let match;
        while ((match = jsxRegex.exec(content)) !== null) {
            const tag = match[1];
            const componentName = this.tagToComponentMap.get(tag);
            if (componentName) {
                deps.components.add(componentName);
            }
        }
    }
    async analyzeScssFile(filePath, deps) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            // Extract @import statements
            const importRegex = /@import\s+['"]([^'"]+)['"]/g;
            let match;
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
            while ((match = useRegex.exec(content)) !== null) {
                const usePath = match[1];
                if (usePath.includes('mixins/')) {
                    const mixinName = path.basename(usePath, '.scss').replace(/^_/, '');
                    deps.mixins.add(mixinName);
                }
            }
        }
        catch (error) {
            logger.warn(`Failed to analyze SCSS file ${filePath}: ${error}`);
        }
    }
    // Get full dependency tree for a component (including transitive dependencies)
    getFullDependencyTree(componentName) {
        const visited = new Set();
        const queue = [componentName];
        while (queue.length > 0) {
            const current = queue.shift();
            if (visited.has(current))
                continue;
            visited.add(current);
            const component = this.componentMap.get(current);
            if (component && component.dependencies.internal) {
                for (const dep of component.dependencies.internal) {
                    if (!visited.has(dep)) {
                        queue.push(dep);
                    }
                }
            }
        }
        visited.delete(componentName); // Remove self from dependencies
        return visited;
    }
    // Check for circular dependencies
    hasCircularDependency(componentName) {
        const visited = new Set();
        const recursionStack = new Set();
        const hasCycle = (name) => {
            visited.add(name);
            recursionStack.add(name);
            const component = this.componentMap.get(name);
            if (component && component.dependencies.internal) {
                for (const dep of component.dependencies.internal) {
                    if (!visited.has(dep)) {
                        if (hasCycle(dep))
                            return true;
                    }
                    else if (recursionStack.has(dep)) {
                        return true;
                    }
                }
            }
            recursionStack.delete(name);
            return false;
        };
        return hasCycle(componentName);
    }
    // Get all utilities used by a component and its dependencies
    getAllUtilities(componentName) {
        const utils = new Set();
        const components = this.getFullDependencyTree(componentName);
        components.add(componentName);
        for (const comp of components) {
            const component = this.componentMap.get(comp);
            if (component && component.dependencies.utilities) {
                for (const util of component.dependencies.utilities) {
                    utils.add(util);
                }
            }
        }
        return utils;
    }
    // Get all mixins used by a component and its dependencies
    getAllMixins(componentName) {
        const mixins = new Set();
        const components = this.getFullDependencyTree(componentName);
        components.add(componentName);
        for (const comp of components) {
            const component = this.componentMap.get(comp);
            if (component && component.dependencies.mixins) {
                for (const mixin of component.dependencies.mixins) {
                    mixins.add(mixin);
                }
            }
        }
        return mixins;
    }
}
//# sourceMappingURL=dependency-analyzer.js.map