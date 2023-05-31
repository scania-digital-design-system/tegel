import type { Meta } from '@storybook/html';

const meta: Meta = {
  title: 'Intro',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
export const TegelDesignSystem = {
  render: () => `
            <style>
                tds-link {
                    display: inline-block;
                }
            </style>
            <tds-banner type="information" icon="information" header="We are moving away from the sdds prefix!">
                <tds-link slot="banner-link">
                    <a href="?path=/story/intro-announcements-prefix-change--page">
                        Read more here!
                    </a>
                </tds-link>
            </tds-banner>

            <div class="tds-u-p2">
                <h1>Tegel Design System</h1>
                <p class="tds-body-02">The design system supports the design and development of digital solutions at Scania. The purpose is to secure a
                    coherent, premium brand and user experience across all of Scania's digital touchpoints.
                </p>

                <a href="https://tegel.scania.com/">
                    https://tegel.scania.com/
                </a>

                <h3 class="tds-u-mb0">Status</h3>

                <p class="tds-body-02">
                    This package is currently in a <b>pre-beta</b> stage. We are now working hard towards a 1.0-beta release, but if you
                    want to try out the package today you can! It's available via NPM and can be installed using the installation guide
                    below.
                </p>

                <h2>@scania/tegel 🧱</h2>
                <p class="tds-body-02">
                    <b>TLDR;</b><i>The new @scania/tegel package is an improvement and continuation of the previous @scania/component,
                        @scania/theme-light, and @scania/icons packages. It simplifies the installation process and ships with types
                        which offers type safety and improves the developer experience with intellisence and autocompletion. The new
                        package includes all components as web components, removes the old "native" components and makes the
                        installation and updates easier. The current prefix for components, CSS variables, and utility classes - "sdds",
                        will be changed. We have also created a new Storybook for @scania/tegel, which allows developers and designers
                        to preview all variants of the components by changing the props.</i>


                    <h3 class="tds-u-mb0">
                        What is @scania/tegel? 🧱
                    </h3>

                    <p class="tds-body-02">
                        In short, the new @scania/tegel package is an improvement and continuation of the previous @scania/component,
                        @scania/theme-light and @scania/icons packages. These three packages have now instead been merged into one to
                        simplify both the installation process, but also to make it easier for us to maintain and keep improving going
                        forward. The new @scania/tegel is also shipped with types. This makes integrations in other Stenciljs projects
                        possible, but also improves the developer experience with intellisence and autocompletion, and of course type
                        safety. In this work we have also bumped the Stenciljs version (the compiler used to build our components) to the
                        latest major. And we have saved the best for last, @scania/tegel is 100% web component. Previous packages had some
                        web components, but also "native" components, these were utility classes that could be added to a predefined HTML
                        structure to create the look and feel of Tegel. Now we are making a big effort to provide all components as web
                        components.
                    </p>
                    <h3 class="tds-u-mb0">
                        What improvements does @scania/tegel have? 🚀
                    </h3>
                    <p class="tds-body-02">
                        So, what we are striving for in the new package is:

                        <ul>
                            <li>Easy installation and updates</li>
                            <li>A clear and intuitive API</li>
                            <li>Types to be included in package bundle</li>
                            <li>All input elements to work within a form</li>
                            <li>Only web components</li>
                            <li>Dark mode</li>
                            <li>Improved interactive documentation - Storybook</li>
                        </ul>

                        With this new package we are creating a foundation for us to stand on going forward. We will keep improving and
                        maintaining it after its initial release and with the changes we are introducing now we hope to be able to do this as
                        smoothly as possible.


                    </p>


                    <h3 class="tds-u-mb0">
                        Removing "native" components ❌
                    </h3>
                    <p class="tds-body-02">
                        With this new package we are also removing our "native" components and instead introducing web component
                        counterparts to these. This means that every component that was available as a "native" component in
                        @scania/components will have a web component alternative in @scania/tegel. This removal will be done in our next
                        release of @scania/tegel. This change does not change the current @scania/components package.

                    </p>


                    <h3 class="tds-u-mb0">
                        Prefix change 🔁
                    </h3>
                    <tds-link>
                        <a href="?path=/story/intro-announcements-prefix-change--page">Read more here.</a>
                    </tds-link>
                    <p class="tds-body-02">
                        We are also working on a prefix change for our new package. Instead of "sdds" the components, CSS variables and
                        utility classes will instead be prefixed with something else, for example:
                        <ul>
                            <li> <{prefix}-button /> </li>
                            <li> --{prefix}-button-color </li>
                            <li>.{prefix}-u-flex</li>
                        </ul>
                        This is done to have a clear distinction between what was @scania/components and what is @scania/tegel. What it also
                        does is that it enables the two solutions to be installed alongside each other. This means that your migration can be
                        done incrementally.
                    </p>


                    <h3 class="tds-u-mb0">
                        Migration docs 📜
                    </h3>
                    <p class="tds-body-02">
                        Migrations are always hard, but during the last couple of months we have put a lot of effort into creating a
                        "migration document", which explains and highlights all the changes in our API from version 4 of @scania/components
                        and @scania/tegel. We hope that this will ease your migration to our new package. The migration document will
                        continue to be updated until we release 1.0 and is available
                        <a href="https://tegel-storybook.netlify.app/?path=/story/intro-migrating-from-components%C2%A0v4--page">here.</a>

                    </p>


                    <h3 class="tds-u-mb0">
                        Support for @scania/components 🤳
                    </h3>
                    <p class="tds-body-02">
                        We will keep supporting @scania/components for a short while going forward, however we see no major updates being
                        done to the package. This means we will keep answering and helping with support questions and do minor releases with
                        bugfixes, but we are not introducing any new features.

                    </p>


                    <h3 class="tds-u-mb0">
                        When can I try our @scania/tegel? 🧪
                    </h3>
                    <p class="tds-body-02">
                        Today! Some of you have already tried this package out, and provided us with valuable feedback, thank you! But
                        please note that this package is still in beta and breaking changes are to be expected before we release 1.0. The
                        package is available via npm and an installation guide is available <a
                            href="https://www.npmjs.com/package/@scania/tegel">here.</a>

                    </p>


                    <h3 class="tds-u-mb0">
                        Want to get in touch? 📞
                    </h3>
                    <p class="tds-body-02">
                        Awesome! We are available via teams and have two support channels. One for
                        <tds-link>
                            <a href="https://teams.microsoft.com/l/channel/19%3a5e33f67fe502441f914fbcdc6e2548f5%40thread.skype/Development%2520support?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac">development</a>
                        </tds-link>
                        and one for
                        <tds-link>
                            <a href="https://teams.microsoft.com/l/channel/19%3A8d30ded56af14672b471062ec1e66345%40thread.skype/Design%2520support?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac">design.</a>

                        </tds-link>
                        If you want to submit a bug report or feature request, please do so via our
                        <tds-link>
                            <a href="https://github.com/scania-digital-design-system/tegel/issues">GitHub</a>
                        </tds-link>.

                        <p class="tds-body-02">
                            All the best,<br />
                            The Tegel Team.
                        </p>
                    </p>
            </div>
  `,
};
