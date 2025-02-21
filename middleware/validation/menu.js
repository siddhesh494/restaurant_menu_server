const joi = require("joi")
const { safePromise } = require("../../utils/required-helper")
const MESSAGE_CODE = require("../../config/message-code")
const { response } = require("../../utils/response-helper")
const createLogger = require("../../utils/create-logger")
const log = createLogger("menu-validation")

class MenuRequestValidator {
  update = async (req, res, next) => {
    const functionName = "update"
    const schema = joi.object({
      menuDetails: joi.array().items({
        menuName: joi.string().required(),
        menuItems: joi.array().items({
          categoryName: joi.string().required(),
          categoryItems: joi.array().items({
            dishName: joi.string().required(),
            dishDescription: joi.string().allow("", null),
            isVeg: joi.boolean().required(),
            price: joi.string().required()
          }).required()
        }).required()
      }).required(),
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

  get = async (req, res, next) => {
    const functionName = "get"
    const schema = joi.object({
      restaurantID: joi.string().required()
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

module.exports = MenuRequestValidator