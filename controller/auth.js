const MESSAGE_CODE = require("../config/message-code")
const AuthService = require("../services/auth")
const { safePromise } = require("../utils/required-helper")
const { response } = require("../utils/response-helper")

const authService = new AuthService()
class Auth {
  signUp = async (req, res) => {
    try {

      const [error, result] = await safePromise(authService.signUpNewUser(req.body))
      if(error) {
        return Promise.reject(response(error))
      }
      res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))
    } catch (error) {
      console.log(error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }

  }

  login = async (req, res) => {
    try {

      const [error, result] = await safePromise(authService.loginUser(req.body))
      if(error) {
        return Promise.reject(response(error))
      }
      res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))

    } catch (error) {
      console.log(error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }

  }
}

module.exports = Auth