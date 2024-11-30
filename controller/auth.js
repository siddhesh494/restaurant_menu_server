const MESSAGE_CODE = require("../config/message-code")
const AuthService = require("../services/auth")
const { safePromise } = require("../utils/required-helper")
const { response } = require("../utils/response-helper")
const createLogger = require("../utils/create-logger")
const log = createLogger("auth-controller")

const authService = new AuthService()
class Auth {
  signUp = async (req, res) => {
    const functionName = "signUpController"
    try {
      const [error, result] = await safePromise(authService.signUpNewUser(req.body))
      if(error) {
        log.error(functionName, "Error in signup", error)
        return res.status(500).json(response(error))
      }
      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))
    } catch (error) {
      log.error(functionName, "Error in signup: Catch Error", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }

  }

  login = async (req, res) => {
    const functionName = "loginController"
    try {
      const [error, result] = await safePromise(authService.loginUser(req.body))
      if(error) {
        log.error(functionName, "Error in login", error)
        return Promise.reject(response(error))
      }

      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))

    } catch (error) {
      log.error(functionName, "Error in login: Catch Error", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }

  }
}

module.exports = Auth