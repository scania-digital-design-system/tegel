import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';
import { defineCustomElements } from '@scania/tegel/loader';
import { TextValueAccessor } from './stencil-generated/text-value-accessor';
import { BooleanValueAccessor } from './stencil-generated/boolean-value-accessor';
import { NumericValueAccessor } from './stencil-generated/number-value-accessor';
import { RadioValueAccessor } from './stencil-generated/radio-value-accessor';
import { TdsDropdownValueAccessor } from './directives/tds-dropdown-value-accessor';

@NgModule({
  declarations: [
    ...DIRECTIVES,
    BooleanValueAccessor,
    NumericValueAccessor,
    RadioValueAccessor,
    TextValueAccessor,
    TdsDropdownValueAccessor,
  ],
  exports: [
    ...DIRECTIVES,
    BooleanValueAccessor,
    NumericValueAccessor,
    RadioValueAccessor,
    TextValueAccessor,
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
