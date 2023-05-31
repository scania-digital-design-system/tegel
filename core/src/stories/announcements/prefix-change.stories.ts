import type { Meta } from '@storybook/html';

const meta: Meta = {
  title: 'Intro/Announcements',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: false,
    },
  },
};

export default meta;
export const PrefixChange = {
  render: () => `
    <style>
        article {
            box-sizing: border-box;
            max-width: 688px;
            margin: auto;
            display: flex;
            flex-direction: column;
            gap: 72px;
        }

        section > p,
        section > ul,
        section > tds-link {
            margin-bottom: 32px;
        }

        tds-link {
            display: inline-block;
        }
    </style>
    <article class="tds-u-p2 tds-body-01">
        <section>
            <p class="tds-body-01"><strong>Published: 2022-05-30</strong></p>
            <h1 class="tds-headline-02">Prefix change 🔁</h1>
            <p>
                In a previous announcement, we mentioned that @scania/tegel would undergo a prefix change. We have been diligently
                working on this for the past few weeks, and we are pleased to inform you that it is now complete. Previously, all
                components, utility classes, and CSS variables were prefixed with 'sdds'. However, we have decided to introduce a
                different prefix for @scania/tegel, which will be 'tds'. As a result, all our components, utility classes, and CSS
                variables will now be prefixed with 'tds', as shown below:
            </p>
            <ul class="tds-body-01">
                <li> &lt;tds-button/&gt; </li>
                <li>--tds-1button-color</li>
                <li>.tds-u-flex</li>
            </ul>
            <p>
                We have made this change to establish a clear distinction between @scania/components and @scania/tegel. Additionally, it
                will facilitate a smoother transition to the new package for you, the users. You can now install @scania/tegel alongside
                @scania/components, allowing for an incremental transition.</p>
            </p>
        </section>
        <section>
            <h3 class="tds-u-mb1">
                Want to get in touch? 📞
            </h3>


            <p>
                Awesome! We are available via teams and have two support channels. One for
                <tds-link>
                    <a
                        href="https://teams.microsoft.com/l/channel/19%3a5e33f67fe502441f914fbcdc6e2548f5%40thread.skype/Development%2520support?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac">development</a>
                </tds-link>
                and one for
                <tds-link>
                    <a
                        href="https://teams.microsoft.com/l/channel/19%3A8d30ded56af14672b471062ec1e66345%40thread.skype/Design%2520support?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac">design.</a>

                </tds-link>
                If you want to submit a bug report or feature request, please do so via our
                <tds-link>
                    <a href="https://github.com/scania-digital-design-system/tegel/issues">GitHub</a>
                </tds-link>.

            <p>
                All the best,<br />
                The Tegel Team.
            </p>
            </p>
        </section>

    </article>
    `,
};
