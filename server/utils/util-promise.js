module.exports = {
  serialAsync : function (filesArray, handler) {
    let promise = Promise.resolve();

    filesArray.forEach(function (file) {
      promise = promise.then(() => handler(file));
    });
    return promise;
  }
};

// todo: u can just write:
/**
 * module.exports = {
 *    serialAsync: // code...,
 *    hash: // code...
 * }
 */
// todo: also, when making utils try to split them in a separate modules, f.e: hash, serialAsync. Usually you don't need all utils at once
