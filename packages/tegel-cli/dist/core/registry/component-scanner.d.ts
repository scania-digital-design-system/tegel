import { ComponentEntry } from '../../types/index.js';
export declare class ComponentScanner {
    private componentsPath;
    private cache;
    constructor(tegelRootPath: string);
    scanAll(): Promise<Map<string, ComponentEntry>>;
    scanComponent(componentDir: string): Promise<ComponentEntry | null>;
    private findComponentDirectories;
    private findComponentFile;
    private extractMetadata;
    private findComponentFiles;
    private determineStability;
    getComponent(name: string): ComponentEntry | undefined;
    getAllComponents(): ComponentEntry[];
    findByTag(tag: string): ComponentEntry | undefined;
    getComponentNames(): string[];
}
//# sourceMappingURL=component-scanner.d.ts.map