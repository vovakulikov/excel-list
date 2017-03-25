/**
 * Created by Vova on 21.03.2017.
 */

exports.serialAsync = function (data, handler) {
  //todo: what exactly in data? rename parameter. F.E: filesArray
  let promise = Promise.resolve();

  data.forEach(function (file) {
    promise = promise.then(() => handler(file));
  });
  return promise;
};
