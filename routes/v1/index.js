const authRouter = require("./auth")

module.exports = [
  {
    route: 'auth',
    dir: authRouter
  }
]