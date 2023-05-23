<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# undertaker-forward-reference

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][ci-image]][ci-url] [![Coveralls Status][coveralls-image]][coveralls-url]

Undertaker custom registry supporting forward referenced tasks.

## Why?

The focus of gulp 4.0 is to make the 90% use case extremely easy, but we don't want to
completely unsupport the 10% use cases. We have noticed patterns people use and things
they want to do (and have worked around), like serial execution. However, I believe
forward referenced tasks (as defined in https://github.com/gulpjs/gulp/issues/802) are
an edge case that is better handled with other patterns (coming soon: links to better
patterns). If you must use forward referenced tasks, you can set this as a custom
registry before registering any tasks.

## Usage

```js
var gulp = require('gulp');
var FwdRef = require('undertaker-forward-reference');

gulp.registry(FwdRef()); // or gulp.registry(new FwdRef());

gulp.task('default', gulp.series('forward-ref'));

gulp.task('forward-ref', function (cb) {
  // do task things
  cb();
});
```

## API

### `ForwardReferenceRegistry()`

Constructor for the registry. Pass an instance of this registry to `gulp.registry`.

## License

MIT

<!-- prettier-ignore-start -->
[downloads-image]: https://img.shields.io/npm/dm/undertaker-forward-reference.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/undertaker-forward-reference
[npm-image]: https://img.shields.io/npm/v/undertaker-forward-reference.svg?style=flat-square

[ci-url]: https://github.com/gulpjs/undertaker-forward-reference/actions?query=workflow:dev
[ci-image]: https://img.shields.io/github/actions/workflow/status/gulpjs/undertaker-forward-reference/dev.yml?branch=master&style=flat-square

[coveralls-url]: https://coveralls.io/r/gulpjs/undertaker-forward-reference
[coveralls-image]: https://img.shields.io/coveralls/gulpjs/undertaker-forward-reference/master.svg?style=flat-square
<!-- prettier-ignore-end -->
