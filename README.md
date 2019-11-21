```diff
- This package is not ready yet. Please wait until this line is removed.
```

# ntn-try-me
![npm](https://img.shields.io/npm/v/ntn-try-me?color=blue&style=flat-square) ![NPM](https://img.shields.io/npm/l/ntn-try-me?color=blue&style=flat-square)

<b>try-me</b> is a __tiny utility__.  
<b>try-me</b> help Eliminate regular, tangled and heavy __try-catch-finally__.  
With the aim to help you with error handling.
You will be able to gain the following:
* Less code
* A more intelligent code
* More flexibility

## Prepare
`npm i ntn-try-me -P`

## API

<pre>
<b>tryThat</b>: The function you would like to try
<b>meta</b>: An optional object for configuration
    valid: An event if <b>tryThat</b> is passing
    fail: An event if <b>tryThat</b> failed
    finalize: An event when <b>valid</b> and <b>fail</b> are fulfill
    debugLevel: Might be in the future
    ifFailFireErr: If have an Error, Throw it Back
        fireErrUniqType: If <b>ifFailFireErr</b> <b>true</b>, it will fire only if the Error Type Equal <b>fireErrUniqType</b>
        fireErrData: If <b>ifFailFireErr</b> <b>true</b>, it will be the data Thrown Back

<u>DEFAULT</u>
<b>tryThat</b>: ✔️ Required
<b>meta</b>: ❌ Required, {}
</pre>

## Example

### Example1

```Typescript
import { tryMe } from 'try-me';

tryMe(() => { });
```
### Example2

```Typescript
import { tryMe } from 'try-me';

tryMe<AppComponent>(() => Number['f1'](), {
    valid: () => console.log('Great!'),
    fail: (e: AppComponent) => console.log('Bummer...'),
    ifFailFireErr: true,
    fireErrUniqType: TypeError,
    finalize: () => console.log('We did it.')
});
```

---

## In the future
* Async Ability
* Generic Ability
* Fluent API Ability
* Test Environment Ability
* Minification Ability
* And more...

## Git
Have a bug? Want a meaningful feature? Anything you need?  
Well, I do apologize. Feel free and __Pull Req__ and I might permit it.

A little help ?  

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://paypal.me/netanel0058)

## Many Thanx!
