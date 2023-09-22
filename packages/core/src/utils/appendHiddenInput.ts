/** reference: https://github.com/ionic-team/ionic-framework/blob/main/core/src/utils/helpers.ts#L346
 *
 * Appends a hidden input element to allow the component
 * work within and get picked up by a <form>.
 * @param element The element on which the input with be appended.
 * @param name Name of the input.
 * @param value The value of the input.
 * @param disabled Disables the input if true.
 * @param additionalAttributes Additional attributes that should be passed to the input.
 */
const appendHiddenInput = (
  element: HTMLElement,
  name: string,
  value: string | undefined | null,
  disabled: boolean,
  additionalAttributes?: Array<{ key: string; value: string }>,
) => {
  let input = element.querySelector('input') as HTMLInputElement | null;
  if (!element.querySelector('input')) {
    input = element.ownerDocument!.createElement('input');
    input.type = 'hidden';
    if (additionalAttributes) {
      additionalAttributes.forEach((attr) => input.setAttribute(attr.key, attr.value));
    }
    element.appendChild(input);
  }
  input.disabled = disabled;
  input.name = name;
  input.value = value || '';
};

export default appendHiddenInput;
