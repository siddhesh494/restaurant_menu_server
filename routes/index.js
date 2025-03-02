const routeV1 = require("./v1")

async function bindRoutes(app) {
  routeV1.forEach(item => {
    app.use(`/.netlify/api/v1/${item.route}`, item.dir)
  });
  return Promise.resolve()
}

module.exports = bindRoutes