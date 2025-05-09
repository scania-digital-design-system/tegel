export default {
  title: 'System Setup/Events',
  tags: ['!autodocs'],
  parameters: {
    docs: {
      description: {
        story: 'Documentation about events in tegel components',
      },
    },
  },
};

export const Events = () => `
    <div>
      <h2>Events Documentation</h2>
      <p>The tegel components emit custom events to allow the users to respond to changes/updates in the components. These are all named using the tds-prefix.</p>
      <p>For a click event this would result in the event being called <code>tdsClick</code>. To listen for these events in vanilla JS:</p>
      <pre><code>document.addEventListener('tdsClick', (event) => {
  // Do something with/based on the event.
});</code></pre>
      <p>In React, you can listen to events by adding an event listener to the element:</p>
      <pre><code>&lt;tds-textfield
  ref={(element) =>
    element.addEventListener('tdsClick', (event) => {
      // Do something with/based on the event.
    })
  }
&gt;&lt;/tds-textfield&gt;</code></pre>
      <p>In other JSX-environments, you can use the on-prefix:</p>
      <pre><code>&lt;tds-textfield
  onTdsChange={(event) => {
    // Do something with/based on the event.
  }}
&gt;&lt;/tds-textfield&gt;</code></pre>
      <h3>Internal events</h3>
      <p>Some components use internal events prefixed with <strong>internal</strong>. These events are not recommended for use as they might change without notice.</p>
    </div>
  `;
