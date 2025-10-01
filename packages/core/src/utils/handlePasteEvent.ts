/**
 * Utility function to handle paste events and trigger input events
 * This ensures that paste operations properly trigger tdsInput events
 *
 * @param element - The HTMLInputElement or HTMLTextAreaElement that received the paste
 * @param onInputCallback - Callback function to handle the input event
 * @param valueProcessor - Optional function to process the value before setting it
 */
export function handlePasteEvent(
  element: HTMLInputElement | HTMLTextAreaElement,
  onInputCallback: (syntheticEvent: InputEvent) => void,
  valueProcessor?: (value: string) => string,
): void {
  // Use setTimeout to ensure the paste content is processed before we trigger the input event
  setTimeout(() => {
    let value = element.value;

    // Apply value processing if provided (e.g., for number inputs with min/max validation)
    if (valueProcessor) {
      value = valueProcessor(value);
      element.value = value;
    }

    // Create a synthetic input event to maintain consistency
    const syntheticInputEvent = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      inputType: 'insertFromPaste',
      data: null,
      isComposing: false,
    });

    // Trigger the callback with the synthetic event
    onInputCallback(syntheticInputEvent);
  }, 0);
}
