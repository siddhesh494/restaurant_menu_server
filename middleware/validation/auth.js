const joi = require("joi")
const { safePromise } = require("../../utils/required-helper")
const MESSAGE_CODE = require("../../config/message-code")
const { response } = require("../../utils/response-helper")
const createLogger = require("../../utils/create-logger")
const log = createLogger("auth-validation")

class AuthRequestValidator {
  signUp = async (req, res, next) => {
    const functionName = "signUp"
    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    })

    try {
      const [error, result] = await safePromise(schema.validateAsync(req.body))
      if(error) {
        log.error(functionName, "Error in validation", error)
        return res.status(422).json(response({
          messageCode: MESSAGE_CODE.VALIDATION_ERROR,
          message: error.message
        }))
      }
      next()
    } catch (error) {
      log.error(functionName, "Error in validation: catch error", error)
      return res.status(422).json(response({
        messageCode: MESSAGE_CODE.VALIDATION_ERROR,
        message: error.message
      }))
    }
  }
  login = async (req, res, next) => {
    const functionName = "login"
    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    })

    try {
      const [error, result] = await safePromise(schema.validateAsync(req.body))
      if(error) {
        log.error(functionName, "Error in validation", error)
        return res.status(422).json(response({
          messageCode: MESSAGE_CODE.VALIDATION_ERROR,
          message: error.message
        }))
      }
      next()
    } catch (error) {
      log.error(functionName, "Error in validation: catch error", error)
      return res.status(422).json(response({
        messageCode: MESSAGE_CODE.VALIDATION_ERROR,
        message: error.message
      }))
    }
  }
}

module.exports = AuthRequestValidator