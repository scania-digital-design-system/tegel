
## Mixins folder

When one rule needs to be the same for all components it makes sense to make a mixin out of it.

Separating mixins in the separate files is to optimise usage of it - meaning in component you just need to import one specific mixin, not all of them.

However, there is `mixins.scss` file which imports all mixins. It is just in case that we need to export all of them in the future, either to use them in component or as to ship them in another package etc.