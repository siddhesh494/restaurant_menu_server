const authRouter = require("./auth")
const menuRouter = require("./menu")

module.exports = [
  {
    route: 'auth',
    dir: authRouter
  },
  {
    route: 'menu',
    dir: menuRouter
  }
]