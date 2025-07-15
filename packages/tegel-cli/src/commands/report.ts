import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import { resolveTegelSource } from '../utils/tegel-source-resolver';
import { ComponentScanner } from '../core/registry/component-scanner';
import { DependencyAnalyzer } from '../core/registry/dependency-analyzer';
import { logger } from '../core/logger';
import type { ComponentEntry } from '../types/index';

interface DependencyReport {
  generated: string;
  totalComponents: number;
  components: Array<{
    name: string;
    tag: string;
    dependencies: {
      components: string[];
      utilities: string[];
      mixins: string[];
      types: string[];
      total: number;
    };
    transitiveDependencies: {
      components: string[];
      utilities: string[];
      mixins: string[];
      types: string[];
      total: number;
    };
  }>;
  statistics: {
    mostDependedOn: Array<{ name: string; count: number }>;
    largestDependencies: Array<{ name: string; count: number }>;
    noDependencies: string[];
  };
}

function generateReport(
  components: Map<string, ComponentEntry>,
  analyzer: DependencyAnalyzer,
): DependencyReport {
  const componentReports = [];
  const dependencyCount = new Map<string, number>();

  // Process each component
  Array.from(components.entries()).forEach(([name, entry]) => {
    // Get transitive dependencies
    const transitiveDeps = analyzer.getFullDependencyTree(name);
    const transitiveUtils = analyzer.getAllUtilities(name);
    const transitiveMixins = analyzer.getAllMixins(name);
    const transitiveTypes = analyzer.getAllTypes(name);
    const transitiveAssets = analyzer.getAllAssets(name);

    // Count how many components depend on this one
    (entry.dependencies.internal || []).forEach((dep) => {
      dependencyCount.set(dep, (dependencyCount.get(dep) || 0) + 1);
    });

    componentReports.push({
      name,
      tag: entry.tag,
      dependencies: {
        components: entry.dependencies.internal || [],
        utilities: entry.dependencies.utilities || [],
        mixins: entry.dependencies.mixins || [],
        types: entry.dependencies.types || [],
        assets: entry.dependencies.assets || [],
        total:
          (entry.dependencies.internal?.length || 0) +
          (entry.dependencies.utilities?.length || 0) +
          (entry.dependencies.mixins?.length || 0) +
          (entry.dependencies.types?.length || 0) +
          (entry.dependencies.assets?.length || 0),
      },
      transitiveDependencies: {
        components: Array.from(transitiveDeps),
        utilities: Array.from(transitiveUtils),
        mixins: Array.from(transitiveMixins),
        types: Array.from(transitiveTypes),
        assets: Array.from(transitiveAssets),
        total:
          transitiveDeps.size +
          transitiveUtils.size +
          transitiveMixins.size +
          transitiveTypes.size +
          transitiveAssets.size,
      },
    });
  });

  // Sort components by name
  componentReports.sort((a, b) => a.name.localeCompare(b.name));

  // Calculate statistics
  const mostDependedOn = Array.from(dependencyCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  const largestDependencies = componentReports
    .map((comp) => ({ name: comp.name, count: comp.transitiveDependencies.total }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const noDependencies = componentReports
    .filter((comp) => comp.dependencies.total === 0)
    .map((comp) => comp.name);

  return {
    generated: new Date().toISOString(),
    totalComponents: components.size,
    components: componentReports,
    statistics: {
      mostDependedOn,
      largestDependencies,
      noDependencies,
    },
  };
}

async function outputJsonReport(report: DependencyReport, outputPath: string): Promise<void> {
  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeJSON(outputPath, report, { spaces: 2 });
}

async function outputMarkdownReport(report: DependencyReport, outputPath: string): Promise<void> {
  const lines: string[] = [
    '# Tegel Component Dependency Report',
    '',
    `Generated: ${new Date(report.generated).toLocaleString()}`,
    `Total Components: ${report.totalComponents}`,
    '',
    '## Statistics',
    '',
    '### Most Depended On Components',
    '| Component | Used By |',
    '|-----------|---------|',
  ];

  report.statistics.mostDependedOn.forEach(({ name, count }) => {
    lines.push(`| ${name} | ${count} |`);
  });

  lines.push(
    '',
    '### Components with Most Dependencies',
    '| Component | Total Dependencies |',
    '|-----------|-------------------|',
  );

  report.statistics.largestDependencies.forEach(({ name, count }) => {
    lines.push(`| ${name} | ${count} |`);
  });

  lines.push('', '### Components with No Dependencies', '');
  report.statistics.noDependencies.forEach((name) => {
    lines.push(`- ${name}`);
  });

  lines.push('', '## Component Details', '');

  report.components.forEach((comp) => {
    lines.push(`### ${comp.name} (${comp.tag})`);
    lines.push('');

    if (comp.dependencies.total > 0) {
      lines.push('**Direct Dependencies:**');
      if (comp.dependencies.components.length > 0) {
        lines.push(`- Components: ${comp.dependencies.components.join(', ')}`);
      }
      if (comp.dependencies.utilities.length > 0) {
        lines.push(`- Utilities: ${comp.dependencies.utilities.join(', ')}`);
      }
      if (comp.dependencies.mixins.length > 0) {
        lines.push(`- Mixins: ${comp.dependencies.mixins.join(', ')}`);
      }
      if (comp.dependencies.types.length > 0) {
        lines.push(`- Types: ${comp.dependencies.types.join(', ')}`);
      }
    } else {
      lines.push('*No direct dependencies*');
    }

    lines.push('');

    if (comp.transitiveDependencies.total > 0) {
      lines.push('**All Dependencies (including transitive):**');
      if (comp.transitiveDependencies.components.length > 0) {
        lines.push(`- Components: ${comp.transitiveDependencies.components.join(', ')}`);
      }
      if (comp.transitiveDependencies.utilities.length > 0) {
        lines.push(`- Utilities: ${comp.transitiveDependencies.utilities.join(', ')}`);
      }
      if (comp.transitiveDependencies.mixins.length > 0) {
        lines.push(`- Mixins: ${comp.transitiveDependencies.mixins.join(', ')}`);
      }
      if (comp.transitiveDependencies.types.length > 0) {
        lines.push(`- Types: ${comp.transitiveDependencies.types.join(', ')}`);
      }
    }

    lines.push('', '---', '');
  });

  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, lines.join('\n'));
}

export const reportCommand = new Command('report')
  .description('Generate a dependency report for all Tegel components')
  .option('-o, --output <path>', 'Output file path', './tegel-dependency-report.json')
  .option('-f, --format <format>', 'Output format (json|markdown)', 'json')
  .action(async (options) => {
    try {
      logger.info('Generating component dependency report...');

      // Resolve Tegel source
      const sourceInfo = await resolveTegelSource();
      logger.debug(`Using Tegel source from: ${sourceInfo.root}`);

      const { componentsPath } = sourceInfo;

      // Scan all components
      const scanner = new ComponentScanner(componentsPath);
      const scanResult = await scanner.scanAll();
      const components = scanResult.allComponents;

      // Create dependency analyzer
      const analyzer = new DependencyAnalyzer(componentsPath, components);

      // Analyze all dependencies
      await analyzer.analyzeAll();

      // Generate report data
      const report = generateReport(components, analyzer);

      // Output report
      if (options.format === 'markdown') {
        await outputMarkdownReport(report, options.output);
      } else {
        await outputJsonReport(report, options.output);
      }

      logger.success(`Report generated successfully: ${options.output}`);
    } catch (error) {
      logger.error(`Failed to generate report: ${error}`);
      process.exit(1);
    }
  });
