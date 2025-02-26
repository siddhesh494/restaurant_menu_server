const authRouter = require("./auth")
const menuRouter = require("./menu")
const restaurantRouter = require("./restaurant")

module.exports = [
  {
    route: 'auth',
    dir: authRouter
  },
  {
    route: 'menu',
    dir: menuRouter
  },
  {
    route: 'restaurant',
    dir: restaurantRouter
  }
]