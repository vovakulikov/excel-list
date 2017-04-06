exports.serialAsync = function (filesArray, handler) {
  let promise = Promise.resolve();

  filesArray.forEach(function (file) {
    promise = promise.then(() => handler(file));
  });
  return promise;
};

exports.hash = function (value) {
  let hash = 0, i, chr;

  if (value.length === 0) {
    return hash;
  }
  for (i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
// todo: u can just write:
/**
 * module.exports = {
 *    serialAsync: // code...,
 *    hash: // code...
 * }
 */
// todo: also, when making utils try to split them in a separate modules, f.e: hash, serialAsync. Usually you don't need all utils at once
