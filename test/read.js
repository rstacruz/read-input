/* jshint expr: true */
var expect = require('chai').expect;
var read = require('../index');
var res, err;

describe('read.files', function () {
  beforeEach(function (next) {
    read(['./test/read.js', './foo'], function (_err, _res) {
      err = _err;
      res = _res;
      next();
    });
  });

  it('returns no error', function () {
    expect(err).falsy;
  });

  it('returns a result', function () {
    expect(res).a('object');
  });

  it('returns .files', function () {
    expect(res.files).array;
    expect(res.files).have.length(2);
  });

  it('concatenates res', function () {
    expect(res.data).eql(res.files[0].data);
  });

  it('gives res', function () {
    var file = res.files[0];
    expect(file.data).a('string');
    expect(file.data).match(/Hola mundo/);
    expect(file.name).eql('./test/read.js');
  });

  it('gives errors', function () {
    var file = res.files[1];
    expect(file.error).instanceOf(Error);
    expect(file.error.code).eql('ENOENT');
  });
});

describe('a run with multiple errors', function () {
  beforeEach(function (next) {
    read(['./test/read.js', './foo', './bar'], function (_err, _res) {
      err = _err;
      res = _res;
      next();
    });
  });

  xit('has err that matches res.error', function () {
    // Now deprecated
    expect(err.message).eq(res.error.message);
  });

  it('has .error that joins all errors', function () {
    expect(res.error.message).include("ENOENT");
    expect(res.error.message).include("./foo");
    expect(res.error.message).include("./bar");
  });

  it('has .failures', function () {
    var items = res.failures;
    expect(items).have.length(2);
    expect(items[0].name).eql('./foo');
    expect(items[1].name).eql('./bar');
  });

  it('has .successes', function () {
    var items = res.successes;
    expect(items).have.length(1);
    expect(items[0].name).eql('./test/read.js');
  });
});

describe('a run with no errors', function () {
  beforeEach(function (next) {
    read(['./test/read.js'], function (_err, _res) {
      err = _err;
      res = _res;
      next();
    });
  });

  it('has no .error', function () {
    expect(res.error).be.falsy;
  });

  it('has no error', function () {
    expect(err).be.falsy;
  });

  it('has no .failures', function () {
    var items = res.failures;
    expect(items).have.length(0);
  });

  it('has .successes', function () {
    var items = res.successes;
    expect(items).have.length(1);
  });
});

/* Hola mundo */
