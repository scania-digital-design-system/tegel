import { execSync } from 'child_process';

export function generateTagNamesPlugin() {
  return {
    name: 'generate-tag-names',
    buildStart() {
      console.log('Running generate-tag-names script...');
      try {
        execSync('node --loader ts-node/esm ../packages/shared/scripts/generateTagNames.mjs', {
          stdio: 'inherit',
        });
        console.log('Script executed successfully.');
      } catch (error) {
        console.error('Error executing generate-tag-names script:', error);
      }
    },
  };
}
