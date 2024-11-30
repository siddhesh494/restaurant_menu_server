const userRouter = require("./user")
const productRouter = require("./product")
const authRouter = require("./auth")

module.exports = [
  {
    route: 'auth',
    dir: authRouter
  },
  {
    route: 'user',
    dir: userRouter
  },
  {
    route: 'product',
    dir: productRouter
  }
]