import { ComponentEntry } from '../../types/index.js';
interface DependencyInfo {
    components: Set<string>;
    utilities: Set<string>;
    mixins: Set<string>;
    assets: Set<string>;
}
export declare class DependencyAnalyzer {
    private componentsPath;
    private componentMap;
    private tagToComponentMap;
    constructor(tegelRootPath: string, components: Map<string, ComponentEntry>);
    analyzeAll(): Promise<void>;
    analyzeComponent(component: ComponentEntry): Promise<DependencyInfo>;
    private analyzeTypeScriptFile;
    private extractImports;
    private extractDomQueries;
    private extractJsxComponents;
    private analyzeScssFile;
    getFullDependencyTree(componentName: string): Set<string>;
    hasCircularDependency(componentName: string): boolean;
    getAllUtilities(componentName: string): Set<string>;
    getAllMixins(componentName: string): Set<string>;
}
export {};
//# sourceMappingURL=dependency-analyzer.d.ts.map