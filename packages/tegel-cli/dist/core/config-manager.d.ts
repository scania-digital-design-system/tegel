import { TegelConfig } from '../types/index.js';
export declare class ConfigManager {
    private config;
    private configPath;
    private explorer;
    load(projectPath?: string): Promise<TegelConfig>;
    save(config: Partial<TegelConfig>, projectPath?: string): Promise<void>;
    init(projectPath?: string, options?: Partial<TegelConfig>): Promise<void>;
    get(): TegelConfig;
    getPath(): string | null;
    update(updates: Partial<TegelConfig>): TegelConfig;
    validate(config: any): Promise<boolean>;
    resolvePath(relativePath: string): string;
    getTargetDir(): string;
}
export declare const configManager: ConfigManager;
//# sourceMappingURL=config-manager.d.ts.map