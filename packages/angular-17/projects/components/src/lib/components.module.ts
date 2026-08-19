import { APP_INITIALIZER, NgModule } from '@angular/core';
import { defineCustomElements } from '@scania/tegel/loader';
import { DIRECTIVES } from './stencil-generated';
import { TextValueAccessor } from './stencil-generated/text-value-accessor';
import { BooleanValueAccessor } from './stencil-generated/boolean-value-accessor';
import { NumericValueAccessor } from './stencil-generated/number-value-accessor';
import { TdsRadioValueAccessor } from './directives/tds-radio-value-accessor';
import { TdsDropdownValueAccessor } from './directives/tds-dropdown-value-accessor';

@NgModule({
  declarations: [
    ...DIRECTIVES,
    BooleanValueAccessor,
    NumericValueAccessor,
    TextValueAccessor,
    TdsRadioValueAccessor,
    TdsDropdownValueAccessor,
  ],
  exports: [
    ...DIRECTIVES,
    BooleanValueAccessor,
    NumericValueAccessor,
    TextValueAccessor,
    TdsRadioValueAccessor,
    TdsDropdownValueAccessor,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true,
    },
  ],
})
export class TegelModule {}
