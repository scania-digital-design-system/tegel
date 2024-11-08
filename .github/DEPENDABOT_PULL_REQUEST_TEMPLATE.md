### Checklist for Dependency Update PR

1. Checkout to this branch.
2. Remove `node_modules` and `package-lock.json`.
3. Run `npm run build-all` and `npm start` to ensure there are no build errors.  
   - [ ] Confirm that the build completes without errors.
   - [ ] Start Storybook and check for any issues.
   - [ ] Verify that there are no visual deviations or errors in the components.
