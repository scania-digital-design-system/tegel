import { formatHtmlPreview } from "../../../utils/utils";

export default {
  title: "Foundations/Grid",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    fluidContainer: false,
    padding: true,
  },
  argTypes: {
    fluidContainer: {
      name: "Fluid container",
      description: "Set container to fluid or not",
      control: {
        type: "boolean",
      },
    },
    padding: {
      name: "Fluid container",
      description: "Toggle padding on columns",
      control: {
        type: "boolean",
      },
    },
  },
};

// Styling for grid templates
const style = formatHtmlPreview(`
  <style>
    /* Demo code for presentation purposes */
    .sdds-container,
    .sdds-container-fluid {
      background-color: #ff00009e;
      color: black;
      outline: 1px solid red;
    }

    .sdds-row > div {
      outline: 1px solid #ef1919;
      background: #fbc5c5;
      min-height: 50px;
    }

    .sdds-sidebar {
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

  <div class="${
    fluidContainer === true ? "sdds-container-fluid" : "sdds-container"
  } ${padding === false ? "sdds-no-padding" : ""}">

    <div class="sdds-row">
      <div class="sdds-col-max-12 sdds-col-xxlg-12 sdds-col-xlg-12 sdds-col-lg-12 sdds-col-md-12 sdds-col-sm-12 sdds-col-xs-12">
        <div class="inside-demo">12</div>
      </div>
    </div>

    <div class="sdds-row">
      <div class="sdds-col-max-11 sdds-col-xxlg-11 sdds-col-xlg-11 sdds-col-lg-11 sdds-col-md-11 sdds-col-sm-11 sdds-col-xs-11">
        <div class="inside-demo">11</div>
      </div>
    </div>

    <div class="sdds-row">
      <div class="sdds-col-max-10 sdds-col-xxlg-10 sdds-col-xlg-10 sdds-col-lg-10 sdds-col-md-10 sdds-col-sm-10 sdds-col-xs-10">
        <div class="inside-demo">10</div>
      </div>
    </div>

    <div class="sdds-row">
      <div class="sdds-col-max-9 sdds-col-xxlg-9 sdds-col-xlg-9 sdds-col-lg-9 sdds-col-md-9 sdds-col-sm-9 sdds-col-xs-9">
        <div class="inside-demo">9</div>
      </div>
    </div>

    <div class="sdds-row">
      <div class="sdds-col-max-8 sdds-col-xxlg-8 sdds-col-xlg-8 sdds-col-lg-8 sdds-col-md-8 sdds-col-sm-8 sdds-col-xs-8">
        <div class="inside-demo">8</div>
      </div>
    </div>

    <div class="sdds-row">
      <div class="sdds-col-max-7 sdds-col-xxlg-7 sdds-col-xlg-7 sdds-col-lg-7 sdds-col-md-7 sdds-col-sm-7 sdds-col-xs-7">
        <div class="inside-demo">7</div>
      </div>
    </div>

    <div class="sdds-row">
      <div class="sdds-col-max-6 sdds-col-xxlg-6 sdds-col-xlg-6 sdds-col-lg-6 sdds-col-md-6 sdds-col-sm-6 sdds-col-xs-6">
        <div class="inside-demo">6</div>
      </div>
    </div>

    <div class="sdds-row">
      <div class="sdds-col-max-5 sdds-col-xxlg-5 sdds-col-xlg-5 sdds-col-lg-5 sdds-col-md-5 sdds-col-sm-5 sdds-col-xs-5">
        <div class="inside-demo">5</div>
      </div>
    </div>

    <div class="sdds-row">
      <div class="sdds-col-max-4 sdds-col-xxlg-4 sdds-col-xlg-4 sdds-col-lg-4 sdds-col-md-4 sdds-col-sm-4 sdds-col-xs-4">
        <div class="inside-demo">4</div>
      </div>
    </div>

    <div class="sdds-row">
      <div class="sdds-col-max-3 sdds-col-xxlg-3 sdds-col-xlg-3 sdds-col-lg-3 sdds-col-md-3 sdds-col-sm-3 sdds-col-xs-3">
        <div class="inside-demo">3</div>
      </div>
    </div>

    <div class="sdds-row">
      <div class="sdds-col-max-2 sdds-col-xxlg-2 sdds-col-xlg-2 sdds-col-lg-2 sdds-col-md-2 sdds-col-sm-2 sdds-col-xs-2">
        <div class="inside-demo">2</div>
      </div>
    </div>

    <div class="sdds-row">
      <div class="sdds-col-max-1 sdds-col-xxlg-1 sdds-col-xlg-1 sdds-col-lg-1 sdds-col-md-1 sdds-col-sm-1 sdds-col-xs-1">
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

  <div class="${
    fluidContainer === true ? "sdds-container-fluid" : "sdds-container"
  } ${padding === false ? "sdds-no-padding" : ""}">
    <div class="sdds-row">
      <div class="sdds-col">
        <div class="inside-demo">.sdds-col</div>
      </div>
    </div>
  </div>

  <h5>Container 2</h5>

  <div class="${
    fluidContainer === true ? "sdds-container-fluid" : "sdds-container"
  } ${padding === false ? "sdds-no-padding" : ""}">
    <div class="sdds-row">
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
    </div>
  </div>

  <h5>Container 3</h5>

  <div class="${
    fluidContainer === true ? "sdds-container-fluid" : "sdds-container"
  } ${padding === false ? "sdds-no-padding" : ""}">
    <div class="sdds-row">
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
      <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
        <div class="inside-demo">.sdds-col</div>
      </div>
    </div>
  </div>
  `);

export const Auto = GridAutoColTemplate.bind({});

const GridPushTemplate = ({ fluidContainer, collapse, padding }) =>
  formatHtmlPreview(`
  ${style}

  <h4>Grid Push</h4>

  <div class="sdds-push">
    <div class="sdds-sidebar ${collapse ? "sdds-sidebar-collapse" : ""}">
    </div>
    <div class="${
      fluidContainer === true ? "sdds-container-fluid" : "sdds-container"
    } ${padding === false ? "sdds-no-padding" : ""}">
      <div class="sdds-row">
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
          <div class="inside-demo">1</div>
        </div>
        <div class="sdds-col-max sdds-col-xxlg sdds-col-xlg sdds-col-lg sdds-col-md sdds-col-sm sdds-col-xs">
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

    <div class="${
      fluidContainer === true ? "sdds-container-fluid" : "sdds-container"
    } ${padding === false ? "sdds-no-padding" : ""}">
      <div class="sdds-row">
        <div class="sdds-col-max-1 sdds-col-max-2-offset sdds-col-xxlg-1 sdds-col-xxlg-2-offset sdds-col-xlg-1 sdds-col-xlg-2-offset sdds-col-lg-1 sdds-col-lg-2-offset sdds-col-md-1 sdds-col-md-2-offset sdds-col-sm-1 sdds-col-sm-2-offset sdds-col-xs-1 sdds-col-xs-2-offset">
          <div class="inside-demo">Offset</div>
        </div>
        <div class="sdds-col-max-1 sdds-col-max-2-offset sdds-col-xxlg-1 sdds-col-xxlg-2-offset sdds-col-xlg-1 sdds-col-xlg-2-offset sdds-col-lg-1 sdds-col-lg-2-offset sdds-col-md-1 sdds-col-md-2-offset sdds-col-sm-1 sdds-col-sm-2-offset sdds-col-xs-1 sdds-col-xs-2-offset">
          <div class="inside-demo">Offset</div>
        </div>
        <div class="sdds-col-max-2 sdds-col-max-2-offset sdds-col-xxlg-2 sdds-col-xxlg-2-offset sdds-col-xlg-2 sdds-col-xlg-2-offset sdds-col-lg-2 sdds-col-lg-2-offset sdds-col-md-2 sdds-col-md-2-offset sdds-col-sm-2 sdds-col-sm-2-offset sdds-col-xs-2 sdds-col-xs-2-offset">
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
      fluidContainer === true ? "sdds-container-fluid" : "sdds-container"
    } demo-example-cols">
      <div class="sdds-row">
        <div class="sdds-no-padding sdds-col-max-8 sdds-col-xxlg-8 sdds-col-xlg-8 sdds-col-lg-8 sdds-col-md-8 sdds-col-sm-8 sdds-col-xs-8">
          <div class="inside-demo">no padding</div>
        </div>
        <div class="sdds-no-padding sdds-col-max-12 sdds-col-xxlg-12 sdds-col-xlg-12 sdds-col-lg-12 sdds-col-md-12 sdds-col-sm-12 sdds-col-xs-12">
          <div class="inside-demo">no padding</div>
        </div>
        <div class="${
          padding ? "" : "sdds-no-padding"
        } sdds-col-max-12 sdds-col-xxlg-12 sdds-col-xlg-12 sdds-col-lg-12 sdds-col-md-12 sdds-col-sm-12 sdds-col-xs-12">
          <div class="inside-demo">padding</div>
        </div>
        <div class="${
          padding ? "" : "sdds-no-padding"
        } sdds-col-max-8 sdds-col-xxlg-8 sdds-col-xlg-8 sdds-col-lg-8 sdds-col-md-8 sdds-col-sm-8 sdds-col-xs-8">
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

    <div class="sdds-container-fluid ${
      padding === false ? "sdds-no-padding" : ""
    }">
      <div class="sdds-row">
        <div class="sdds-col-max-12 sdds-col-xxlg-12 sdds-col-xlg-12 sdds-col-lg-12 sdds-col-md-12 sdds-col-sm-12 sdds-col-xs-12">
          <div class="inside-demo">container fluid</div>
        </div>
      </div>
    </div>
    <div class="${fluidContainer ? "sdds-container-fluid" : "sdds-container"} ${
    padding === false ? "sdds-no-padding" : ""
  } container-demo">
      <div class="sdds-row">
        <div class="sdds-col-max-12 sdds-col-xxlg-12 sdds-col-xlg-12 sdds-col-lg-12 sdds-col-md-12 sdds-col-sm-12 sdds-col-xs-12">
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

 <div class="${
   fluidContainer === true ? "sdds-container-fluid" : "sdds-container"
 }">
   <div class="sdds-row">
     <div class="${
       padding === false ? "sdds-no-padding" : ""
     } sdds-col-max-12 sdds-col-xxlg-12 sdds-col-xlg-12 sdds-col-lg-12 sdds-col-md-12 sdds-col-sm-12 sdds-col-xs-12">
       <div class="inside-demo">12</div>
     </div>
   </div>
   <div class="sdds-row">
     <div class="sdds-col-max-6 sdds-col-xxlg-6 sdds-col-xlg-6 sdds-col-lg-6 sdds-col-md-6 sdds-col-sm-6 sdds-col-xs-6">
      <div class="sdds-row">
        <div class="${
          padding === false ? "sdds-no-padding" : ""
        } sdds-col-max-6 sdds-col-xxlg-6 sdds-col-xlg-6 sdds-col-lg-6 sdds-col-md-6 sdds-col-sm-6 sdds-col-xs-6">
          <div class="inside-demo">6 nested</div>
        </div>
        <div class=" ${
          padding === false ? "sdds-no-padding" : ""
        } sdds-col-max-6 sdds-col-xxlg-6 sdds-col-xlg-6 sdds-col-lg-6 sdds-col-md-6 sdds-col-sm-6 sdds-col-xs-6">
          <div class="inside-demo">6 nested</div>
        </div>
      </div>
     </div>
     <div class="${
       padding === false ? "sdds-no-padding" : ""
     } sdds-col-max-6 sdds-col-xxlg-6 sdds-col-xlg-6 sdds-col-lg-6 sdds-col-md-6 sdds-col-sm-6 sdds-col-xs-6">
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

  <div class="${
    fluidContainer === true ? "sdds-container-fluid" : "sdds-container"
  }">
    <div class="sdds-row">
      <div class="sdds-hide-xlg sdds-col-max-12 sdds-col-xxlg-12 sdds-col-xlg-12 sdds-col-lg-12 sdds-col-md-12 sdds-col-sm-12 sdds-col-xs-12">
        <div class="inside-demo">Hide on xlg and wider</div>
      </div>
    </div>
    <div class="sdds-row">
      <div class="sdds-hide-xs sdds-show-md sdds-col-max-12 sdds-col-xxlg-12 sdds-col-xlg-12 sdds-col-lg-12 sdds-col-md-12 sdds-col-sm-12 sdds-col-xs-12">
        <div class="inside-demo">Show on md and wider</div>
      </div>
    </div>
  </div>
  `);

export const ShowHide = GridHideShow.bind({});
