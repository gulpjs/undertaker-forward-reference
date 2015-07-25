# undertaker-forward-reference

[![Travis Build Status](https://img.shields.io/travis/undertakerjs/undertaker-forward-reference/master.svg?label=travis&style=flat-square)](https://travis-ci.org/undertakerjs/undertaker-forward-reference)

Undertaker registry supporting forward referenced tasks

## Why?

The focus of gulp 4.0 is to make the 90% use case extremely easy, but we don't want to
completely unsupport the 10% use cases. We have noticed patterns people use and things
they want to do (and have worked around), like serial execution. However, I believe
forward referenced tasks (as defined in https://github.com/gulpjs/gulp/issues/802) are
an edge case that is better handled with other patterns (coming soon: links to better
patterns). If you must use forward referenced tasks, you can set this as a custom
registry before registering any tasks.

## Example

```js
var gulp = require('gulp');
var FwdRef = require('undertaker-forward-reference');

gulp.registry(FwdRef());

gulp.task('default', gulp.series('forward-ref'));

gulp.task('forward-ref', function(cb){
  // do task things
  cb();
});
```

## API

### ForwardReferenceRegistry

Constructor for the registry. Pass an instance of this registry to `gulp.registry`.

## License

MIT
