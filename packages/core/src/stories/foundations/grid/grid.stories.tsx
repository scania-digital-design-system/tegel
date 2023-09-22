import formatHtmlPreview from '../../formatHtmlPreview';

export default {
  title: 'Foundations/Grid',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    fluidContainer: false,
    padding: true,
  },
  argTypes: {
    fluidContainer: {
      name: 'Fluid container',
      description: 'Set container to fluid or not',
      control: {
        type: 'boolean',
      },
    },
    padding: {
      name: 'Fluid container',
      description: 'Toggle padding on columns',
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
    .tds-container,
    .tds-container-fluid {
      background-color: #ff00009e;
      color: black;
      outline: 1px solid red;
    }

    .tds-row > div {
      outline: 1px solid #ef1919;
      background: #fbc5c5;
      min-height: 50px;
    }

    .tds-sidebar {
      background-color: rgba(255, 0, 0, 0.1);
    }

    .inside-demo {
      background: #ef9191;
      height: 100%;
      word-break: break-word;
    }

    .container-demo {
      margin-top: 16px;
    }

  </style>`);

const GridTemplate = ({ fluidContainer, padding }) =>
  formatHtmlPreview(`
  ${style}
  <h4>Grid</h4>

  <div class="${fluidContainer === true ? 'tds-container-fluid' : 'tds-container'} ${
    padding === false ? 'tds-no-padding' : ''
  }">

    <div class="tds-row">
      <div class="tds-col-max-12 tds-col-xxlg-12 tds-col-xlg-12 tds-col-lg-12 tds-col-md-12 tds-col-sm-12 tds-col-xs-12">
        <div class="inside-demo">12</div>
      </div>
    </div>

    <div class="tds-row">
      <div class="tds-col-max-11 tds-col-xxlg-11 tds-col-xlg-11 tds-col-lg-11 tds-col-md-11 tds-col-sm-11 tds-col-xs-11">
        <div class="inside-demo">11</div>
      </div>
    </div>

    <div class="tds-row">
      <div class="tds-col-max-10 tds-col-xxlg-10 tds-col-xlg-10 tds-col-lg-10 tds-col-md-10 tds-col-sm-10 tds-col-xs-10">
        <div class="inside-demo">10</div>
      </div>
    </div>

    <div class="tds-row">
      <div class="tds-col-max-9 tds-col-xxlg-9 tds-col-xlg-9 tds-col-lg-9 tds-col-md-9 tds-col-sm-9 tds-col-xs-9">
        <div class="inside-demo">9</div>
      </div>
    </div>

    <div class="tds-row">
      <div class="tds-col-max-8 tds-col-xxlg-8 tds-col-xlg-8 tds-col-lg-8 tds-col-md-8 tds-col-sm-8 tds-col-xs-8">
        <div class="inside-demo">8</div>
      </div>
    </div>

    <div class="tds-row">
      <div class="tds-col-max-7 tds-col-xxlg-7 tds-col-xlg-7 tds-col-lg-7 tds-col-md-7 tds-col-sm-7 tds-col-xs-7">
        <div class="inside-demo">7</div>
      </div>
    </div>

    <div class="tds-row">
      <div class="tds-col-max-6 tds-col-xxlg-6 tds-col-xlg-6 tds-col-lg-6 tds-col-md-6 tds-col-sm-6 tds-col-xs-6">
        <div class="inside-demo">6</div>
      </div>
    </div>

    <div class="tds-row">
      <div class="tds-col-max-5 tds-col-xxlg-5 tds-col-xlg-5 tds-col-lg-5 tds-col-md-5 tds-col-sm-5 tds-col-xs-5">
        <div class="inside-demo">5</div>
      </div>
    </div>

    <div class="tds-row">
      <div class="tds-col-max-4 tds-col-xxlg-4 tds-col-xlg-4 tds-col-lg-4 tds-col-md-4 tds-col-sm-4 tds-col-xs-4">
        <div class="inside-demo">4</div>
      </div>
    </div>

    <div class="tds-row">
      <div class="tds-col-max-3 tds-col-xxlg-3 tds-col-xlg-3 tds-col-lg-3 tds-col-md-3 tds-col-sm-3 tds-col-xs-3">
        <div class="inside-demo">3</div>
      </div>
    </div>

    <div class="tds-row">
      <div class="tds-col-max-2 tds-col-xxlg-2 tds-col-xlg-2 tds-col-lg-2 tds-col-md-2 tds-col-sm-2 tds-col-xs-2">
        <div class="inside-demo">2</div>
      </div>
    </div>

    <div class="tds-row">
      <div class="tds-col-max-1 tds-col-xxlg-1 tds-col-xlg-1 tds-col-lg-1 tds-col-md-1 tds-col-sm-1 tds-col-xs-1">
        <div class="inside-demo">1</div>
      </div>
    </div>
  </div>
  `);

// Controls for the grid
export const Default = GridTemplate.bind({});

const GridAutoColTemplate = ({ fluidContainer, padding }) =>
  formatHtmlPreview(`
  ${style}

  <h4>Grid Auto columns</h4>
  <h5>Container 1</h5>

  <div class="${fluidContainer === true ? 'tds-container-fluid' : 'tds-container'} ${
    padding === false ? 'tds-no-padding' : ''
  }">
    <div class="tds-row">
      <div class="tds-col">
        <div class="inside-demo">.tds-col</div>
      </div>
    </div>
  </div>

  <h5>Container 2</h5>

  <div class="${fluidContainer === true ? 'tds-container-fluid' : 'tds-container'} ${
    padding === false ? 'tds-no-padding' : ''
  }">
    <div class="tds-row">
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
    </div>
  </div>

  <h5>Container 3</h5>

  <div class="${fluidContainer === true ? 'tds-container-fluid' : 'tds-container'} ${
    padding === false ? 'tds-no-padding' : ''
  }">
    <div class="tds-row">
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
      <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
        <div class="inside-demo">.tds-col</div>
      </div>
    </div>
  </div>
  `);

export const Auto = GridAutoColTemplate.bind({});

const GridPushTemplate = ({ fluidContainer, collapse, padding }) =>
  formatHtmlPreview(`
  ${style}

  <h4>Grid Push</h4>

  <div class="tds-push">
    <div class="tds-sidebar ${collapse ? 'tds-sidebar-collapse' : ''}">
    </div>
    <div class="${fluidContainer === true ? 'tds-container-fluid' : 'tds-container'} ${
    padding === false ? 'tds-no-padding' : ''
  }">
      <div class="tds-row">
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="tds-col-max tds-col-xxlg tds-col-xlg tds-col-lg tds-col-md tds-col-sm tds-col-xs">
          <div class="inside-demo">1</div>
        </div>
      </div>
    </div>
  </div>
  `);

export const Push = GridPushTemplate.bind({});

Push.args = {
  collapse: false,
};

const GridOffsetTemplate = ({ fluidContainer, padding }) =>
  formatHtmlPreview(`
  ${style}

  <h4>Grid Offset</h4>

    <div class="${fluidContainer === true ? 'tds-container-fluid' : 'tds-container'} ${
    padding === false ? 'tds-no-padding' : ''
  }">
      <div class="tds-row">
        <div class="tds-col-max-1 tds-col-max-2-offset tds-col-xxlg-1 tds-col-xxlg-2-offset tds-col-xlg-1 tds-col-xlg-2-offset tds-col-lg-1 tds-col-lg-2-offset tds-col-md-1 tds-col-md-2-offset tds-col-sm-1 tds-col-sm-2-offset tds-col-xs-1 tds-col-xs-2-offset">
          <div class="inside-demo">Offset</div>
        </div>
        <div class="tds-col-max-1 tds-col-max-2-offset tds-col-xxlg-1 tds-col-xxlg-2-offset tds-col-xlg-1 tds-col-xlg-2-offset tds-col-lg-1 tds-col-lg-2-offset tds-col-md-1 tds-col-md-2-offset tds-col-sm-1 tds-col-sm-2-offset tds-col-xs-1 tds-col-xs-2-offset">
          <div class="inside-demo">Offset</div>
        </div>
        <div class="tds-col-max-2 tds-col-max-2-offset tds-col-xxlg-2 tds-col-xxlg-2-offset tds-col-xlg-2 tds-col-xlg-2-offset tds-col-lg-2 tds-col-lg-2-offset tds-col-md-2 tds-col-md-2-offset tds-col-sm-2 tds-col-sm-2-offset tds-col-xs-2 tds-col-xs-2-offset">
          <div class="inside-demo">Offset</div>
        </div>
      </div>
    </div>
  `);

export const Offset = GridOffsetTemplate.bind({});

const GridNoPaddingTemplate = ({ fluidContainer, padding }) =>
  formatHtmlPreview(`
    ${style}

    <h4>Grid no-padding</h4>

    <div class="${
      fluidContainer === true ? 'tds-container-fluid' : 'tds-container'
    } demo-example-cols">
      <div class="tds-row">
        <div class="tds-no-padding tds-col-max-8 tds-col-xxlg-8 tds-col-xlg-8 tds-col-lg-8 tds-col-md-8 tds-col-sm-8 tds-col-xs-8">
          <div class="inside-demo">no padding</div>
        </div>
        <div class="tds-no-padding tds-col-max-12 tds-col-xxlg-12 tds-col-xlg-12 tds-col-lg-12 tds-col-md-12 tds-col-sm-12 tds-col-xs-12">
          <div class="inside-demo">no padding</div>
        </div>
        <div class="${
          padding ? '' : 'tds-no-padding'
        } tds-col-max-12 tds-col-xxlg-12 tds-col-xlg-12 tds-col-lg-12 tds-col-md-12 tds-col-sm-12 tds-col-xs-12">
          <div class="inside-demo">padding</div>
        </div>
        <div class="${
          padding ? '' : 'tds-no-padding'
        } tds-col-max-8 tds-col-xxlg-8 tds-col-xlg-8 tds-col-lg-8 tds-col-md-8 tds-col-sm-8 tds-col-xs-8">
          <div class="inside-demo">padding</div>
        </div>
      </div>
    </div>
  `);

export const NoPadding = GridNoPaddingTemplate.bind({});

NoPadding.args = {
  padding: true,
};

const GridFluidTemplate = ({ fluidContainer = true, padding }) =>
  formatHtmlPreview(`
    ${style}

    <h4>Grid fluid</h4>

    <div class="tds-container-fluid ${padding === false ? 'tds-no-padding' : ''}">
      <div class="tds-row">
        <div class="tds-col-max-12 tds-col-xxlg-12 tds-col-xlg-12 tds-col-lg-12 tds-col-md-12 tds-col-sm-12 tds-col-xs-12">
          <div class="inside-demo">container fluid</div>
        </div>
      </div>
    </div>
    <div class="${fluidContainer ? 'tds-container-fluid' : 'tds-container'} ${
    padding === false ? 'tds-no-padding' : ''
  } container-demo">
      <div class="tds-row">
        <div class="tds-col-max-12 tds-col-xxlg-12 tds-col-xlg-12 tds-col-lg-12 tds-col-md-12 tds-col-sm-12 tds-col-xs-12">
          <div class="inside-demo">container</div>
        </div>
      </div>
    </div>
  `);

export const Fluid = GridFluidTemplate.bind({});

const GridNestedTemplate = ({ fluidContainer, padding }) =>
  formatHtmlPreview(`
 ${style}

 <h4>Nested</h4>

 <div class="${fluidContainer === true ? 'tds-container-fluid' : 'tds-container'}">
   <div class="tds-row">
     <div class="${
       padding === false ? 'tds-no-padding' : ''
     } tds-col-max-12 tds-col-xxlg-12 tds-col-xlg-12 tds-col-lg-12 tds-col-md-12 tds-col-sm-12 tds-col-xs-12">
       <div class="inside-demo">12</div>
     </div>
   </div>
   <div class="tds-row">
     <div class="tds-col-max-6 tds-col-xxlg-6 tds-col-xlg-6 tds-col-lg-6 tds-col-md-6 tds-col-sm-6 tds-col-xs-6">
      <div class="tds-row">
        <div class="${
          padding === false ? 'tds-no-padding' : ''
        } tds-col-max-6 tds-col-xxlg-6 tds-col-xlg-6 tds-col-lg-6 tds-col-md-6 tds-col-sm-6 tds-col-xs-6">
          <div class="inside-demo">6 nested</div>
        </div>
        <div class=" ${
          padding === false ? 'tds-no-padding' : ''
        } tds-col-max-6 tds-col-xxlg-6 tds-col-xlg-6 tds-col-lg-6 tds-col-md-6 tds-col-sm-6 tds-col-xs-6">
          <div class="inside-demo">6 nested</div>
        </div>
      </div>
     </div>
     <div class="${
       padding === false ? 'tds-no-padding' : ''
     } tds-col-max-6 tds-col-xxlg-6 tds-col-xlg-6 tds-col-lg-6 tds-col-md-6 tds-col-sm-6 tds-col-xs-6">
       <div class="inside-demo">6</div>
     </div>
   </div>
  </div>
 `);

export const Nested = GridNestedTemplate.bind({});

const GridHideShow = ({ fluidContainer }) =>
  formatHtmlPreview(`
  ${style}

  <h4>Hide/show element</h4>

  <div class="${fluidContainer === true ? 'tds-container-fluid' : 'tds-container'}">
    <div class="tds-row">
      <div class="tds-hide-xlg tds-col-max-12 tds-col-xxlg-12 tds-col-xlg-12 tds-col-lg-12 tds-col-md-12 tds-col-sm-12 tds-col-xs-12">
        <div class="inside-demo">Hide on xlg and wider</div>
      </div>
    </div>
    <div class="tds-row">
      <div class="tds-hide-xs tds-show-md tds-col-max-12 tds-col-xxlg-12 tds-col-xlg-12 tds-col-lg-12 tds-col-md-12 tds-col-sm-12 tds-col-xs-12">
        <div class="inside-demo">Show on md and wider</div>
      </div>
    </div>
  </div>
  `);

export const ShowHide = GridHideShow.bind({});
