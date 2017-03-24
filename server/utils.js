/**
 * Created by Vova on 21.03.2017.
 */

exports.serialAsync = function (data, handler) {
  let promise = Promise.resolve()
  data.forEach(function (file) {
    promise = promise.then(() => { return handler(file) })
  })
  return promise
}
