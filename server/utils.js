/**
 * Created by Vova on 21.03.2017.
 */

exports.serialAsync = function (filesArray, handler) {
  //todo: what exactly in data? rename parameter. F.E: filesArray
  let promise = Promise.resolve();
  filesArray.forEach(function (file) {
    promise = promise.then(() => handler(file) );
  });
  return promise;
};
