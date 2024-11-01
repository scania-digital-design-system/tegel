import formatHtmlPreview from '../formatHtmlPreview';
import { iconsNames } from '../../components/icon/iconsArray';

export default {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
      showToolbar: true,
    },
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
};

const icons = iconsNames.map(
  (icon) => `
    <tds-block mode-variant="primary" data-icon="${icon}">
        <tds-icon name="${icon}" size="48"></tds-icon>
        <p class="tds-detail-05">${icon}</p>
    </tds-block>
`,
);

const Template = () =>
  formatHtmlPreview(
    `
    <style>
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(144px, 1fr));
            gap: 16px;
            padding: 16px;
        }
    </style>

    <section class="tds-u-p2">
        <h2 class="tds-headline-02">Icons Gallery</h2>
        <p class="tds-body-01">
            The icons displayed here provide an easy overview of all available icons in the library. 
            Each icon is shown at 48px for presentation purposes only; we do not recommend using this size in the product. 
            To export a single icon, we suggest using the <a href="/?path=/story/foundations-icons--component">Component</a> story.
        </p>
        <div style="width: 256px;">
            <tds-text-field
                id="icon-search"
            type="text"
            size="sm"
            state="default"
            label="Icon search"
            label-position="outside"
            no-min-width
            placeholder="..."     
            >
                <tds-icon slot="suffix" name="search" size="20px"></tds-icon>
            </tds-text-field>
        </div>
    </section>
    <div class="grid-container" id="icon-container">
        ${icons.join('')}
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const textElement = document.getElementById("icon-search");
            
            const handleInput = (event) => {           
                filterIcons();
            };

            textElement.addEventListener("input", handleInput);

            window.addEventListener("beforeunload", () => {
                textElement.removeEventListener("input", handleInput);
            });

            function filterIcons() {
                const searchTerm = document.getElementById('icon-search').value.toLowerCase();
                const iconBlocks = document.querySelectorAll('.grid-container tds-block');

                iconBlocks.forEach(block => {
                    const iconName = block.getAttribute('data-icon').toLowerCase();
                    if (searchTerm === '' || iconName.includes(searchTerm)) {
                        block.classList.remove('tds-u-display-none');
                    } else {
                        block.classList.add('tds-u-display-none');
                    }
                });
            }
        });
    </script>
    `,
  );

export const Gallery = Template.bind({});
