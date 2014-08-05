# read-input

Easily read from stdin or files.

<!-- include: index.js -->

### read()
> `read(files, fn)`

Reads from files. If no files are given, read from stdin.
The `err` argument will always be null, as errors will be part of `res`.

```js
var read = require('read-input');
var fnames = process.argv.slice(2); //=> ['readme.txt']

read(fnames, function (err, res) {
  res.data    //=> '...'
  res.error   //=> undefined | Error()
  res.stdin   //=> true | false
  res.files   //=> [...]
});
```

You can also iterate through `res.files`.

```js
read(fnames, function (err, res) {
  res.files.forEach(function (f) {
    f.data    //=> ...
    f.error   //=> undefined | Error(...)
    f.stdin   //=> true | false
    f.name    //=> 'readme.txt'
  }
});
```

If `files` is a blank array (or null), data will be read from stdin. The
resulting data will have a similar schema.

```js
read([], function (err, res) {
  ...
});
```

### read.stdin()
> `read.stdin(fn)`

Read data from standard input. The `err` argument will always be null.

```js
read.stdin(function (err, data) {
  console.log(data); // string
});
```

### res

The results value is an object passed to the callback of `read()`.

* `data` *(String)* <span class='dash'>&mdash;</span> a concatenation of all data in all the files.
* `error` *(Error)* <span class='dash'>&mdash;</span> The first error in all files. `undefined` if successful.
* `stdin` *(Boolean)* <span class='dash'>&mdash;</span> is `true` if the file is read from stdin
* `files` *(Array)* <span class='dash'>&mdash;</span> A list of files.

Each of the items in `files` has a similar list of values:

* `data` *(String)* <span class='dash'>&mdash;</span> File data
* `error` *(Error)* <span class='dash'>&mdash;</span> error, if applicable
* `stdin` *(Boolean)* <span class='dash'>&mdash;</span> is `true` if the file is read from stdin
* `name` *(String)* <span class='dash'>&mdash;</span> File name

See [read()](read) for an example.

<!-- /include -->

## Thanks

**read-input** © 2014+, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT License]: License.md
[MIT License]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/nprogress/contributors
