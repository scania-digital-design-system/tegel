# Contribution Guide

## Welcome Section
- **Introduction**: Welcome dear contributors to the Tegel Design system project. We are very thankful for your interest in contributing.

- **Project Overview**: The aim of Tegel Design system is to provide a set of reusable components that can be used in any project. The project is open source and we welcome contributions from the community.

## How to Contribute
- **Types of Contributions**: There are different ways to contribute to the project. You can contribute by writing code, documentation, reporting bugs, requesting new features, or providing community support in our [Development support channel](https://teams.microsoft.com/l/channel/19%3a5e33f67fe502441f914fbcdc6e2548f5%40thread.skype/Development%2520support%2520-%2520Tegel?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac).
- **First-Time Contributors**: We recommend taking a look on the reported [issues](https://github.com/scania-digital-design-system/tegel/issues) here on GitHub. We consider a small bug or improvement a best candidate for first contribution. 

## Before You Start
- **Type of Contribution**: If the contribution is a new component or a significant change to an existing one, please get in touch with Tegel's designers and developers beforehand to align on the direction.
- **Check Existing Issues/PRs**: Take a look on the [issues](https://github.com/scania-digital-design-system/tegel/issues) and [pull requests](https://github.com/scania-digital-design-system/tegel/pulls) to see if someone has already started on the same thing.

## Contribution Process
- **Repo access**: You can either fork the repo or in case you are Scania employee you can ask for access to the repo as external contributor.
- **Setting Up Your Environment**: Check main [README.md](https://github.com/scania-digital-design-system/tegel/blob/main/README.md) for instructions on how to setup the development environment.
- **Commit Messages**: We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). In case you have not used it so far, type `npm run commit` in your terminal, and an interactive guide will help you formulate the correct message. There is a pre-commit hook that lints the message. We may have strong opinions about commit messages, but they help make our release notes short, informative, and neat.
- **Pull Request Process**: Please follow the [Pull Request Template](https://github.com/scania-digital-design-system/tegel/blob/main/.github/pull_request_template.md) and fill out all the sections. Provide title of PR according to conventional commits, add reviewers, assign yourself as assignee and add eventual appropriate label that describes the PR.
- **Code Review Process**: We will review your PR and provide feedback. Once the PR is ready for merge, it will be merged by the maintainers.

## Style Guides
- **Code Style**: Please read our [Code Style](https://github.com/scania-digital-design-system/tegel/blob/main/CODE_STYLE.md) before contributing.

## Testing
- **Running Tests**: Run `npm run test` to run the test suite. It will execute numerous Playwright tests and might take 15-20 seconds to complete all the tests. Tests run on commit at the moment. A successful test will enable committing.
- **Writing Tests**: In case component has been changed or new feature added, please update or write tests for it. We use [Playwright](https://playwright.dev/docs/writing-tests) for writing tests. Also, take a look at existing tests in our components and see how they are written.


