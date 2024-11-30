
const authMiddleware = require("./../middleware/auth")

class Middleware {
  async init(app) {

    return new Promise((resolve, reject) => {
      
      app.use(authMiddleware)
      
      return resolve()
    })
  }
}

module.exports = Middleware