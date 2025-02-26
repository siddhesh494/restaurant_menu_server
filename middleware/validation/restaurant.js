const joi = require("joi")
const { safePromise } = require("../../utils/required-helper")
const MESSAGE_CODE = require("../../config/message-code")
const { response } = require("../../utils/response-helper")
const createLogger = require("../../utils/create-logger")
const log = createLogger("Restaurant-validation")

class RestaurantRequestValidator {
  update = async (req, res, next) => {
    const functionName = "update"
    const schema = joi.object({
      name: joi.string().optional(),
      address: joi.string().allow("", null).optional()
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

module.exports = RestaurantRequestValidator