import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Foundations/Gridnew',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    fluidContainer: false,
  },
  argTypes: {
    fluidContainer: {
      name: 'Fluid container',
      description: 'Set container to fluid or not',
      control: {
        type: 'boolean',
      },
    },
  },
};

// Styling for grid templates
const style = formatHtmlPreview(`
  <style>
    /* Demo code for presentation purposes */
    .hide-on-small-screen {
      display: none;
    }

    .tds-grid-container {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  
    .tds-grid-fixed, .tds-grid-fluid {
      outline: 1px solid red;
      background: #fbc5c5;
      display: grid;
      width: calc(100% - 32px);
      padding: 0 16px;
      grid-template-columns: repeat(6, 1fr);
      grid-template-rows: repeat(2,1fr);
      grid-gap: 16px;
    }

    .tds-grid-item {
      height: 200px;
      background: #ef9191;
      border: 1px solid #ccc;
      text-align: center;
    }
    
    @media screen and (min-width: 416px) {
      .tds-grid-fluid {
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: 1fr;
      }

      .tds-grid-fixed {
        width: calc(416px - 32px);
      }
    }

  @media screen and (min-width: 604px) {
    .tds-grid-fixed {
      width: calc(604px - 32px);
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: 1fr;
    }
  }

  @media screen and (min-width: 796px) {
    .tds-grid-fluid {
      width: calc(100% - 64px);
      padding: 0 32px;
    }

    .tds-grid-fixed {
      width: calc(796px - 32px);
    }
  }

  @media screen and (min-width: 976px) {
    .tds-grid-fixed {
      width: calc(976px - 32px);
    }
  }

  // desktop-sm
  @media screen and (min-width: 1200px) {
    .tds-grid-fixed {
      width: calc(1200px - 64px);
      padding: 0 32px;
    }
  }

  @media screen and (min-width: 1440px) {
    .tds-grid-fixed {
      width: calc(1440px - 64px);
    }
  }

  @media screen and (min-width: 1920px) {
    .tds-grid-fixed {
      width: calc(1920px - 64px);
    }
  }
  </style>
  
  
`);

const GridFluidTemplate = ({ fluidContainer }) =>
  formatHtmlPreview(`
    <h4>Grid fluid New</h4>
    
    <div class="tds-grid-container">
      <div class="${fluidContainer === true ? 'tds-grid-fluid' : 'tds-grid-fixed'}">
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
