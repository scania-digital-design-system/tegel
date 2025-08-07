import type { TegelConfig } from '../core/config-manager';

export interface ComponentEntry {
  name: string;
  tag: string;
  files: {
    component: string;
    styles: string[];
    tests?: string[];
    types?: string[];
    stories?: string[];
  };
  dependencies: {
    internal: string[]; // Other Tegel components
    external?: string[]; // Third-party deps
    utilities: string[]; // Shared utils
    assets?: string[]; // Icons, fonts
    mixins?: string[]; // SCSS mixins
    types?: string[]; // Type dependencies like icons
  };
  exports?: {
    types?: string[];
    functions?: string[];
    constants?: string[];
  };
  metadata: {
    version: string;
    stability?: 'stable' | 'beta' | 'experimental';
    description?: string;
    isSubComponent?: boolean;
    parentComponent?: string;
  };
}

export interface ComponentManifest {
  version: string;
  generated: string;
  components: Record<string, ComponentEntry>;
  utilities: Record<string, UtilityEntry>;
  mixins: Record<string, MixinEntry>;
  assets: AssetEntry[];
}

export interface UtilityEntry {
  name: string;
  file: string;
  exports: string[];
  usedBy: string[];
}

export interface MixinEntry {
  name: string;
  file: string;
  usedBy: string[];
}

export interface AssetEntry {
  type: 'icon' | 'font' | 'image';
  name: string;
  path: string;
  variants?: string[];
}

export interface TransformContext {
  config: TegelConfig;
  component: ComponentEntry;
  sourceRoot: string;
  targetRoot: string;
}

export interface TransformResult {
  success: boolean;
  transformedFiles: string[];
  errors?: TransformError[];
  warnings?: string[];
}

export interface TransformError {
  file: string;
  line?: number;
  column?: number;
  message: string;
  code?: string;
}

export interface CLIOptions {
  prefix?: string;
  targetDir?: string;
  version?: string;
  force?: boolean;
  dryRun?: boolean;
  verbose?: boolean;
  skipDeps?: boolean;
  all?: boolean;
}

export interface InstalledComponentInfo {
  name: string;
  path: string;
  files: {
    styles: string[];
    component?: string;
  };
}
