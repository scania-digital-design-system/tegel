import { Command } from 'commander';
import prompts from 'prompts';
import chalk from 'chalk';
import path from 'path';
import { configManager } from '../core/config-manager.js';
import { logger } from '../core/logger.js';
import { ComponentScanner } from '../core/registry/component-scanner.js';
import { DependencyAnalyzer } from '../core/registry/dependency-analyzer.js';
export const addCommand = new Command()
    .name('add')
    .description('Add Tegel components to your project')
    .argument('[components...]', 'component names to add')
    .option('-p, --prefix <prefix>', 'override default prefix')
    .option('-v, --version <version>', 'Tegel version to use')
    .option('-a, --all', 'add all available components')
    .option('--no-deps', 'skip dependency installation')
    .option('--dry-run', 'preview changes without writing files')
    .option('-f, --force', 'overwrite existing files')
    .action(async (components, options) => {
    try {
        // Load configuration
        const config = await configManager.load();
        // Override prefix if provided
        if (options.prefix) {
            config.prefix = options.prefix;
        }
        // Get Tegel root path (for now, use relative path)
        // TODO: This should be configurable or use npm package
        const tegelRoot = path.resolve(process.cwd(), '../..');
        // Initialize component scanner
        logger.startSpinner('Scanning Tegel components...');
        const scanner = new ComponentScanner(tegelRoot);
        const componentMap = await scanner.scanAll();
        logger.stopSpinner(true, `Found ${componentMap.size} components`);
        // Initialize dependency analyzer
        logger.startSpinner('Analyzing dependencies...');
        const analyzer = new DependencyAnalyzer(tegelRoot, componentMap);
        await analyzer.analyzeAll();
        logger.stopSpinner(true, 'Dependencies analyzed');
        // Determine which components to add
        let componentsToAdd = [];
        if (options.all) {
            componentsToAdd = Array.from(componentMap.keys());
        }
        else if (components.length === 0) {
            // Interactive selection
            const choices = Array.from(componentMap.entries()).map(([name, entry]) => ({
                title: `${name} (${entry.tag})`,
                value: name,
                description: entry.metadata.description,
            }));
            const response = await prompts({
                type: 'multiselect',
                name: 'components',
                message: 'Select components to add',
                choices,
                hint: 'Space to select, Enter to confirm',
                instructions: false,
            });
            if (!response.components || response.components.length === 0) {
                logger.info('No components selected');
                process.exit(0);
            }
            componentsToAdd = response.components;
        }
        else {
            // Validate component names
            const invalidComponents = components.filter(name => !componentMap.has(name));
            if (invalidComponents.length > 0) {
                logger.error(`Unknown components: ${invalidComponents.join(', ')}`);
                logger.info('Available components:');
                logger.list(Array.from(componentMap.keys()).sort());
                process.exit(1);
            }
            componentsToAdd = components;
        }
        // Resolve all dependencies
        const allComponents = new Set();
        for (const comp of componentsToAdd) {
            allComponents.add(comp);
            if (!options.skipDeps) {
                const deps = analyzer.getFullDependencyTree(comp);
                deps.forEach(dep => allComponents.add(dep));
            }
        }
        // Show what will be added
        logger.newline();
        logger.info(`Will add ${allComponents.size} component(s):`);
        const componentList = Array.from(allComponents).map(name => {
            const isDep = !componentsToAdd.includes(name);
            return isDep ? `${name} ${chalk.gray('(dependency)')}` : name;
        });
        logger.list(componentList);
        // Check for circular dependencies
        for (const comp of allComponents) {
            if (analyzer.hasCircularDependency(comp)) {
                logger.warn(`Component ${comp} has circular dependencies`);
            }
        }
        if (options.dryRun) {
            logger.newline();
            logger.info('Dry run mode - no files will be written');
            // Show what files would be created
            for (const compName of allComponents) {
                const component = componentMap.get(compName);
                logger.newline();
                logger.info(`Component: ${compName}`);
                logger.list([
                    `Tag: ${component.tag} → ${config.prefix}-${component.tag.replace('tds-', '')}`,
                    `Files: ${component.files.component}`,
                    ...component.files.styles.map(f => `       ${f}`),
                ]);
            }
            process.exit(0);
        }
        // Confirm before proceeding
        if (!options.force) {
            const { proceed } = await prompts({
                type: 'confirm',
                name: 'proceed',
                message: 'Continue with installation?',
                initial: true,
            });
            if (!proceed) {
                logger.info('Installation cancelled');
                process.exit(0);
            }
        }
        // TODO: Implement actual file copying and transformation
        logger.newline();
        logger.error('File copying and transformation not yet implemented');
        logger.info('This feature will be available in the next phase of development');
    }
    catch (error) {
        logger.error('Failed to add components:', error);
        process.exit(1);
    }
});
//# sourceMappingURL=add.js.map