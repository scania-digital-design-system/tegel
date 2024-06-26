import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Foundations/Grid',
  parameters: {
    layout: 'fullscreen',
  },
};

// Styling for grid templates
const style = formatHtmlPreview(`
  <style>
    /* Demo code for presentation purposes */
    .tds-grid-fixed,
    .tds-grid-fluid {
      outline: 1px solid red;
      background: #fbc5c5;
      }
    .tds-grid-item {
      height: 200px;
      background: #ef9191;
      border: 1px solid #ccc;
      text-align: center;
    }
  </style>
`);

const GridFixedTemplate = () =>
  formatHtmlPreview(`
    <h4>Fixed</h4>
    
    <div class="tds-grid-container">
      <div class="tds-grid-fixed">
        <div class="tds-grid-item">1</div>
        <div class="tds-grid-item">2</div>
        <div class="tds-grid-item">3</div>
        <div class="tds-grid-item">4</div>
        <div class="tds-grid-item">5</div>
        <div class="tds-grid-item">6</div>
        <div class="tds-grid-item">7</div>
        <div class="tds-grid-item">8</div>
        <div class="tds-grid-item">9</div>
        <div class="tds-grid-item">10</div>
        <div class="tds-grid-item">11</div>
        <div class="tds-grid-item">12</div>
      </div>  
    </div>
    ${style}
  `);

export const Fixed = GridFixedTemplate.bind({});

const GridFluidTemplate = () =>
  formatHtmlPreview(`
    <h4>Fluid</h4>
    
    <div class="tds-grid-container">
      <div class="tds-grid-fluid">
        <div class="tds-grid-item">1</div>
        <div class="tds-grid-item">2</div>
        <div class="tds-grid-item">3</div>
        <div class="tds-grid-item">4</div>
        <div class="tds-grid-item">5</div>
        <div class="tds-grid-item">6</div>
        <div class="tds-grid-item">7</div>
        <div class="tds-grid-item">8</div>
        <div class="tds-grid-item">9</div>
        <div class="tds-grid-item">10</div>
        <div class="tds-grid-item">11</div>
        <div class="tds-grid-item">12</div>
      </div>  
    </div>
    ${style}
  `);

export const Fluid = GridFluidTemplate.bind({});
