## OOP and timers

An example of using `setTimeout()` in the context of a class definition specifically. Sadly, it doesn't "just work" the way you would expect because when `setTimeout()` calls a function it changes the meaning of `this` in that function. This example shows how to avoid this with the `bind()` method.

[Running program](https://pippinbarr.github.io/cart253-2020/examples/time/oop-and-timers/) / [Source Code](https://github.com/pippinbarr/cart253-2020/tree/master/examples/time/oop-and-timers) / [Download](https//pippinbarr.github.io/cart253-2020/examples/time/oop-and-timers.zip)
