import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from '../stencil-generated/value-accessor';

/**
 * A custom value accessor for the tds-dropdown. It extends the default ValueAccessor that is auto-generated by Stencil
 * The tds-dropdown requires slightly different event handling since it doesn't act like any of the native inputs.
 * The main difference between this value accessor and the other value accessors that are auto-generated by Stencil, is that this one handles `$event.detail.value` instead of `$event.target.value`.
 */
@Directive({
  selector: 'tds-dropdown',
  host: {
    '(tdsChange)': 'handleChangeEvent($event.detail.value)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TdsDropdownValueAccessor,
      multi: true,
    },
  ],
})
export class TdsDropdownValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el);
  }
}
