import { cosmiconfig } from 'cosmiconfig';
import { z } from 'zod';
import fs from 'fs-extra';
import path from 'path';
import { logger } from './logger';

const CONFIG_FILE_NAME = 'tegel.config.json';

const TegelConfigSchema = z.object({
  version: z.string().optional(),
  prefix: z.string().regex(/^[a-z][a-z0-9-]*$/, {
    message:
      'Prefix must start with lowercase letter and contain only lowercase letters, numbers, and hyphens',
  }),
  targetDir: z.string(),
  aliases: z.record(z.string()),
  includeTests: z.boolean().optional(),
});

export type TegelConfig = z.infer<typeof TegelConfigSchema>;

// Default configuration (version is set dynamically from the bundled Tegel source)
const DEFAULT_CONFIG: TegelConfig = {
  prefix: 'tds',
  targetDir: './src/components/tegel',
  aliases: {
    '@tegel/utils': '@/src/components/tegel/utils',
    '@tegel/mixins': '@/src/components/tegel/mixins',
    '@tegel/tokens': '@/src/components/tegel/tokens',
    '@tegel/types': '@/src/components/tegel/types',
    '@tegel/components': '@/src/components/tegel',
  },
  includeTests: false,
};

export class ConfigManager {
  private config: TegelConfig | null = null;

  private configPath: string | null = null;

  private explorer = cosmiconfig('tegel', {
    searchPlaces: [
      'package.json',
      'tegel.config.json',
      'tegel.config.js',
      'tegel.config.mjs',
      'tegel.config.cjs',
      '.tegelrc.json',
      '.tegelrc',
    ],
  });

  async load(projectPath: string = process.cwd()): Promise<TegelConfig> {
    try {
      const result = await this.explorer.search(projectPath);

      if (result) {
        logger.debug(`Found config at: ${result.filepath}`);
        this.configPath = result.filepath;

        const validated = TegelConfigSchema.parse(result.config);
        this.config = validated;

        return validated;
      }

      logger.debug('No config found, using defaults');
      this.config = DEFAULT_CONFIG;
      return DEFAULT_CONFIG;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error('Invalid configuration:', error);
        throw new Error(
          `Configuration validation failed: ${error.errors.map((e) => e.message).join(', ')}`,
        );
      }
      throw error;
    }
  }

  async save(config: Partial<TegelConfig>, projectPath: string = process.cwd()): Promise<void> {
    const configPath = path.join(projectPath, CONFIG_FILE_NAME);

    const fullConfig = { ...DEFAULT_CONFIG, ...config };

    const validated = TegelConfigSchema.parse(fullConfig);

    await fs.writeJSON(configPath, validated, { spaces: 2 });

    this.config = validated;
    this.configPath = configPath;

    logger.success(`Configuration saved to ${configPath}`);
  }

  async init(
    projectPath: string = process.cwd(),
    options: Partial<TegelConfig> = {},
  ): Promise<void> {
    const configPath = path.join(projectPath, CONFIG_FILE_NAME);

    if (await fs.pathExists(configPath)) {
      throw new Error(`Configuration already exists at ${configPath}`);
    }

    const config: TegelConfig = {
      ...DEFAULT_CONFIG,
      ...options,
    };

    await this.save(config, projectPath);
  }

  get(): TegelConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded. Call load() first.');
    }
    return this.config;
  }

  getPath(): string | null {
    return this.configPath;
  }

  update(updates: Partial<TegelConfig>): TegelConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded. Call load() first.');
    }

    this.config = {
      ...this.config,
      ...updates,
    };

    this.config = TegelConfigSchema.parse(this.config);

    return this.config!;
  }

  static async validate(config: unknown): Promise<boolean> {
    try {
      TegelConfigSchema.parse(config);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error('Configuration validation failed:');
        error.errors.forEach((err) => {
          logger.error(`  ${err.path.join('.')}: ${err.message}`);
        });
      }
      return false;
    }
  }

  resolvePath(relativePath: string): string {
    if (!this.configPath) {
      return path.resolve(process.cwd(), relativePath);
    }

    const configDir = path.dirname(this.configPath);
    return path.resolve(configDir, relativePath);
  }

  getTargetDir(): string {
    const config = this.get();
    return this.resolvePath(config.targetDir);
  }
}

export const configManager = new ConfigManager();
