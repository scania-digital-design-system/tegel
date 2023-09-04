# Tegel Design System - Code conventions

Welcome to the code conventions section of Tegel, a comprehensive design system that aims to provide a unified and consistent visual language for all of your digital products. In this section, we'll cover the coding standards and conventions that are used to build and maintain Tegel components.

## General
 - Use camelCase for variables and functions.
 - Use PascalCase for classes and interfaces.
 - Use template literals instead of concatenation.
 - Use meaningful variable and function names: Name your variables and functions in a way that clearly communicates their purpose.
Avoid using single-letter variable names, instead of `i` for index, be descriptive and name the variable `index`.
 - Use single quotes (') for strings.

## Branching
- Branch out of `develop` branch for day-to-day work
- Branch named `main` is updated once release is done by merging develop to it
- Use task type as to separate branches in different categories (fix, feat, chore, build, docs, release...)
- Start the name of the branch with Jira ticket number followed by short description of task
- example: `fix/CDEP-1369-banner-color-correction`


## Folder structure

All components are located in the `src/components` directory. Each component in this folder has a dedicated folder named as the
component minus the `tds`-prefix. For our Button the file path is `src/components/button`. The components tsx/sccs files are 
all named without the `tds`-prefix. E.g. `button.tsx`, `button.scss`, `button-vars.scss`.

### Example - folder structure for Button

```
├── src
│   ├── components
│   │   ├── button
│   │   │   ├──button-vars.scss
│   │   │   ├──button.tsx
│   │   │   ├──button.scss
```


## Component structure

Our component files (e.g. button.tsx) should follow the following structure, in order:

1. Props, state and variables
   - @Component decorator with the component specific arguments.
   - Host element for the component (@Element). 
   - Component props.
   - Component state.
   - Private variables.
2. Event, emitters and listeners
   - Events emitters (@Event).
   - Event listeners (@Listen)
3. Methods
   - Props and state watchers (@Watch)
   - Public methods (@Method)
   - Private methods
   - Lifecycle methods
   - Render method. 



### Example: 
```jsx
 
@Component({
  tag: 'tds-component',
  styleUrl: 'tds-component.scss',
  shadow: true,
})
export class TdsComponent {
  @Element() host: HTMLElement;

  /** Comment explaining the use of the the prop */
  @Prop() prop: string;
 
  /** Comment explaining the use of the the prop */
  @Prop() secondProp: string;

  @State() state: boolean;

  variable: string

  /** Comment explaining the event. */
  @Event({
    eventName: 'tdsEvent',
    composed: true ,
    cancelable: true,
    bubbles: true,
  })
  tdsEvent: EventEmitter<{}>;

  @Listen('tdsEvent', { target: 'body' })
  handleListener(){
  }

  @Watch('prop')
  handlePropChange(){
  }

  /** Comment explaining the method. */
  @Method()
  async handleComponent(){
  }

  handleClick(){
  }

  connectedCallback(){
  }

  componentWillLoad() {
  }

  render() {
    return (
      <Host>
      </Host>
    );
  }
}

```


## Slots

Slots are used throughout many of our components. Some of these are named slots, and in that case they should follow
the following convention: The slot should always be named to represent its position/use case. For example this could be
'bottom', 'label' or 'end'.

## Events
The tegel components emit custom events to allow the users to repond to changes/updates in the components. These are all named using the 
tds-prefix. This is done in order to not have conflicting events and to make it clear to the user the specified event is something that is emitted
from a tegel component.

The events are named according to our naming convention: 'tds' + event. For a click event this would result in the event being called `tdsClick`. 

### Internal events
Some of the component are using event to communicate with its parent/child. These events are not recommended to use in any way since
they might change without notice. Their payload might also be changed based on refactoring of components. These events are prefixed
with 'internal'. This is to make it as clear as possible to a user that this is an internal event that the components are using,
but the user should not interact with it. E.g. `internalTdsPropsChange`.

### Development version of Storybook
https://develop--tegel-storybook.netlify.app/ is a Storybook version connected to the develop branch.
It offers the possibility to check out the version of code that is merged to develop branch.
It can be used to see a version of code that is about to be released or to do a regression test. 


