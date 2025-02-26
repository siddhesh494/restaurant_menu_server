const MESSAGE_CODE = require("../config/message-code")
const AuthService = require("../services/auth")
const { safePromise } = require("../utils/required-helper")
const { response } = require("../utils/response-helper")
const createLogger = require("../utils/create-logger")
const log = createLogger("auth-controller")
const { isEmpty } = require("lodash")
const RestaurantService = require("../services/restaurant")
const { admin } = require("../config/firebase-admin-setup")

const authService = new AuthService()
const restaurantService = new RestaurantService()

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
        return res.status(500).json(response(error))
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

  verifyToken = async (req, res) => {
    const functionName = "verifyToken"
    try {
      if(req.user && !isEmpty(req.user)) {
        const { user_id, email } = req.user
        const userAuthDetail = await admin.auth().getUser(user_id)
        return res.status(200).json(response({
          messageCode: MESSAGE_CODE.SUCCESS,
          data: {
            restaurantID: user_id,
            email: email,
            isEmailVerified: userAuthDetail.emailVerified
          }
        }))
      } else {
        return res.status(401).json(response({
          messageCode: MESSAGE_CODE.UNAUTHORIZED_ERROR
        }))
      }
      
    } catch (error) {
      log.error(functionName, "Error in verifyToken: Catch Error", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }

  forgotPassword = async (req, res) => {
    const functionName = "forgotPassword"
    try {
      const [error, result] = await safePromise(authService.forgotPassword(req.body))
      if(error) {
        log.error(functionName, "Error in forgotPassword", error)
        return res.status(500).json(response(error))
      }

      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        message: "Link send to your EmailID"
      }))

    } catch (error) {
      log.error(functionName, "Error in forgotPassword: Catch Error", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }
  
  emailVerification = async (req, res) => {
    const functionName = "emailVerification"
    try {
      const [error, result] = await safePromise(authService.emailVerification(req.body))
      if(error) {
        log.error(functionName, "Error in emailVerification", error)
        return res.status(500).json(response(error))
      }

      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        message: "Verification link send to your EmailID"
      }))

    } catch (error) {
      log.error(functionName, "Error in emailVerification: Catch Error", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }
}

module.exports = Auth