exports.serialAsync = function (filesArray, handler) {
  // todo: what exactly in data? rename parameter. F.E: filesArray
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
