# ntn-try-me
[![npm](https://img.shields.io/npm/v/ntn-try-me?color=blue&style=flat-square)](https://www.npmjs.com/package/ntn-try-me) 
[![Minified](https://img.shields.io/badge/MINIFIED%20%2B%20GZIPPED-2KB%20+/---blue?style=flat-square)]() 
[![MIT](https://img.shields.io/badge/MIT-blue?style=flat-square)](https://en.wikipedia.org/wiki/MIT_License)

<b>try-me</b> is a __tiny utility__.  
<b>try-me</b> help Eliminate regular, tangled and heavy __try-catch-finally__.  
With the aim to help you with error handling.
You will be able to gain the following:
* Less code
* A more intelligent code
* More flexibility
* All in Typescript
* With ESM \ ES Modules

## Get ready
`npm i ntn-try-me`

[unpkg.com/ntn-try-me/bundle/bundle](http://unpkg.com/ntn-try-me/bundle/bundle)

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

## Need an Example ?
```Typescript
import { tryMe } from 'ntn-try-me';

tryMe(() => { });
```

```Typescript
import { _try } from 'ntn-try-me'; // Lighter

_try(() => { });
```

```Typescript
import { tryMe } from 'ntn-try-me';

tryMe<MyErr>(() => Number['myFn'](), {
    valid: () => console.log('Great!'),
    fail: (e: MyErr) => console.log('Bummer...'),
    ifFailFireErr: true,
    fireErrUniqType: TypeError,
    finalize: () => console.log('We did it.')
});
```

## In the future
* __Async__
* Fluent API
