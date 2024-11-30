const joi = require("joi")
const { safePromise } = require("../../utils/required-helper")
const MESSAGE_CODE = require("../../config/message-code")
const { response } = require("../../utils/response-helper")

class AuthRequestValidator {
  signUp = async (req, res, next) => {
    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    })

    try {
      const [error, result] = await safePromise(schema.validateAsync(req.body))
      if(error) {
        return res.status(422).json(response({
          messageCode: MESSAGE_CODE.VALIDATION_ERROR,
          message: error.message
        }))
      }
      next()
    } catch (error) {
      return res.status(422).json(response({
        messageCode: MESSAGE_CODE.VALIDATION_ERROR,
        message: error.message
      }))
    }
  }
}

module.exports = AuthRequestValidator