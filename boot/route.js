const bindRoutes = require("./../routes")

class Route {
  async init(app) {
    return new Promise(async (resolve, reject) => {
      await bindRoutes(app)
      return resolve()
    })
  }
}

module.exports = Route