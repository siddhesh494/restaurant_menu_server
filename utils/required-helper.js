

const safePromise = (p) => p.then((res) => [null, res]).catch((err) => [err, null])


module.exports = {
  safePromise
}