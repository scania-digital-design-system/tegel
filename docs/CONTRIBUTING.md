# Contribution Guide

## Welcome Section
- **Introduction**: Welcome, dear contributors, to the Tegel Design system. We are very thankful for your interest in contributing.

- **Project Overview**: The aim of Tegel Design system is to provide a set of reusable components that can be used in any project. The project is open source and we welcome contributions from the community.

## How to Contribute
- **Types of Contributions**: There are different ways to contribute to the project. You can contribute by writing code, documentation, reporting bugs, requesting new features, or providing community support in our [Development support channel](https://teams.microsoft.com/l/channel/19%3a5e33f67fe502441f914fbcdc6e2548f5%40thread.skype/Development%2520support%2520-%2520Tegel?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac) or use [GitHub Discussions](https://github.com/scania-digital-design-system/tegel/discussions) to start new topic.
- **First-Time Contributors**: We recommend taking a look on the reported [issues](https://github.com/scania-digital-design-system/tegel/issues) here on GitHub. We consider a small bug or improvement a best candidate for first contribution.

## Before You Start
- **Type of Contribution**: If the contribution is a new component or a significant change to an existing one, please get in touch with Tegel's designers and developers beforehand to align on the direction.
- **Check Existing Issues/PRs**: Take a look on the [issues](https://github.com/scania-digital-design-system/tegel/issues) and [pull requests](https://github.com/scania-digital-design-system/tegel/pulls) to see if someone has already started on the same thing.

## Contribution Process
- **Repo access**: You can either fork the repo or in case you are a Scania employee you can ask for access to the repo as an external contributor.
- **Setting Up Your Environment**: Check main [README.md](https://github.com/scania-digital-design-system/tegel/blob/main/README.md) for instructions on how to setup the development environment.
- **Commit Messages**: We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). In case you have not used it so far, type `npm run commit` in your terminal, and an interactive guide will help you formulate the correct message. There is a pre-commit hook that lints the message. We may have strong opinions about commit messages, but they help make our release notes short, informative, and neat.
- **Pull Request Process**: Please follow the [Pull Request Template](https://github.com/scania-digital-design-system/tegel/blob/main/.github/PULL_REQUEST_TEMPLATE.md) and fill out all the sections. Provide title of PR according to conventional commits, add reviewers, assign yourself as assignee and add eventual appropriate label that describes the PR.
- **Code Review Process**: We will review your PR and provide feedback. Once the PR is ready for merge, it will be merged by the maintainers.

## Style Guides
- **Code Style**: Please read our [Code Style](https://github.com/scania-digital-design-system/tegel/blob/main/.github/CODE_STYLE.md) before contributing.

## Testing your changes locally
To properly test your changes' behaviors in a project, reference your local Tegel instance instead of the published version on the registry
- **Build Tegel**: Navigate to your current Tegel monorepo directory, and run `npm run build-all`. This will build core Tegel as well as all packages currently supported (Angular, Angular 17 & React).
- **Linking**: Now building is done, navigate to `packages/core` within Tegel's repository and run `npm link`.
- **Using linked instance**: We're ready to work now, navigate to your project and run `npm link '@scania/tegel'`. This will create a symlink to the local package, but it won't add Tegel to your dependencies, if it wasn't already. Be sure to install it as dependency before linking, if required.

### (Optional) Testing Packages
In case you need to test React or Angular packages of Tegel, follow the instructions below replacing `{package}` for **react**, **angular** or **angular-17** respectively.
- **Building**: Complete the build step for Tegel and verify that the package you plan to test has been built successfully. There are commands available to only build specific packages, i.e., `npm run build-{package}`.
- **Linking**: After linking core, navigate to `packages/{package}` and execute `npm run link`.
- **Using linked instances**: In your project run `npm link '@scania/tegel-{package}'` before running `npm link '@scania/tegel'`.

### Unlinking
- **Removing from Project**: In the project you want the link to be removed execute `npm unlink '@scania/tegel'`. In case any dependency issue arises, delete the `node_modules` folder and run `npm i` to start fresh.
- **Removing link from npm**: The reference for your local instance is stored globally, to remove it execute `npm uninstall --global '@scania/tegel'`.

## Testing
- **Running Tests**: Run `npm run test` to run the test suite. It will execute numerous Playwright tests and might take 15-20 seconds to complete all the tests. Tests run on commit at the moment. A successful test will enable committing.
- **Writing Tests**: In case a component has been changed or a new feature added, please update or write tests for it. We use [Playwright](https://playwright.dev/docs/writing-tests) for writing tests. Also, take a look at existing tests in our components and see how they are written.


