![GitHub release (latest by date)](https://img.shields.io/github/v/release/scania-digital-design-system/tegel)
![Status: Beta](https://img.shields.io/badge/status-beta-red)
[![Storybook](https://img.shields.io/badge/docs-storybook-ff69b4)](https://tds-storybook.tegel.scania.com/)
![](https://img.shields.io/github/license/scania-digital-design-system/tegel)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![node-current](https://img.shields.io/badge/Node.js-18-orange)
[![Downloads](https://img.shields.io/npm/dy/@scania/tegel?color=f4c430)](https://www.npmjs.com/package/@scania/tegel)
[![Downloads](https://img.shields.io/npm/dw/@scania/tegel?color=76a4ed)](https://www.npmjs.com/package/@scania/tegel)
[![Last Commit](https://img.shields.io/github/last-commit/scania-digital-design-system/tegel)](https://github.com/scania-digital-design-system/tegel/commits/main)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/scania-digital-design-system/tegel/pulls)



# Tegel Design System

Official website: https://tegel.scania.com/

Storybook: https://tds-storybook.tegel.scania.com/

The design system supports the design and development of digital solutions at Scania. The purpose is to secure a coherent, premium brand and user experience across all of Scania's digital touchpoints.

## Status

This package is currently in a **beta** stage. We are now working hard towards a 1.0 release, but if you want to try out the package today you can! It's available via NPM and can be installed using the installation guide below.

## Getting started

Read about how to get started on our website: https://tegel.scania.com/development/getting-started-development

The website also includes information on browser support.

## Contributing

We warmly welcome contributions from the community! Whether you're fixing bugs, adding new features, improving documentation, or just have questions, your help and questions are invaluable to us. Here's how you can get involved:

- **Report Bugs or Request Features**: Use the [Issues](https://github.com/scania-digital-design-system/tegel/issues) page to report bugs or request new features.
- **Submit Pull Requests**: Feel free to submit PRs for bug fixes, feature implementations, or documentation updates. Please refer to our [Contribution Guidelines](https://github.com/scania-digital-design-system/tegel/blob/develop/CONTRIBUTING.md) for more details on submitting PRs.
- **Code Conventions**: Our code conventions are documented [here](https://github.com/scania-digital-design-system/tegel/blob/main/.github/CODE_STYLE.md). Please make sure your contributions adhere to these guidelines.
- **Setting Up Development Environment**: Follow the steps outlined above to set up your development environment. If you're contributing code, make sure to run tests and adhere to the coding standards mentioned.
- **First-Time Contributors**: If you're new to open source, have a look at the reported [issues](https://github.com/scania-digital-design-system/tegel/issues) and see if there is something you can help out with. If you find something, assign your name to it and add a comment to keep everyone updated on its status. 
- **Questions or Discussions**: Join our [Teams](https://teams.microsoft.com/l/team/19%3a1257007a64d44c64954acca27a9d4b46%40thread.skype/conversations?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac) channel for discussions, questions, or getting in touch with the team and community.

Your contributions, big or small, make a significant impact on the project. Thank you for your support!

### Code conventions

The code conventions used in (and enforced by) Tegel is documented [here](https://github.com/scania-digital-design-system/tegel/blob/main/.github/CODE_STYLE.md).

### Setting up the development environment

1. Make sure you are using the required node.js version specified in `tegel/package.json` (node 20 at the time of writing).
2. Make sure you have Docker installed. It is needed for running unit tests.
3. Run `npm install` in the root directory.
4. Run `npm install` in the `packages/core` directory.
5. Development version of Storybook with additional plugins and beta components can be activated by setting the environment variable `STORYBOOK_ENV` to `dev` in the same terminal where you run rest of the commands.


```
export STORYBOOK_ENV=dev
```

6. Make sure you are in the root directory, and start the dev server with `npm run start`.
 - *Alternatively navigate to `packages/core` and start the dev server with `npm run storybook`*

## Community

Get in touch with the team and the community:

- [Teams](https://teams.microsoft.com/l/team/19%3a1257007a64d44c64954acca27a9d4b46%40thread.skype/conversations?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac)

## Static assets

For users that can't access our CDN there is a [script](https://github.com/scania-digital-design-system/tegel/blob/develop/packages/core/static-assets-copying.md) for copying over static assets(fonts, logos).

## Testing Guide for Tegel

[This](./docs/TESTING_GUIDE.md) guide provides developers with best practices and guidelines on how and when to write unit tests for components within our design system. Our aim is to ensure that each component is reliable, maintainable, and functions as intended.

## License

All CSS, HTML and JS code are available under the MIT license. The Scania brand identity, logos and photographs found in this repository are copyrighted Scania CV AB and are not available on an open source basis or to be used as examples or in any other way, if not specifically ordered by Scania CV AB.

