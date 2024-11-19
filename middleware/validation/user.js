const joi = require("joi")
const { safePromise } = require("../../utils/required-helper")



class UserRequestValidator {
  get = async (req, res, next) => {
    const schema = joi.object({
      name: joi.string().required()
    })

    try {
      const [error, result] = await safePromise(schema.validateAsync(req.body))
      if(error) {
        return res.status(422).json({
          success: false,
          msg: "invalid request body",
          data: error.message
        })
      }
      next()
    } catch (error) {
      return res.status(422).json({
        success: false,
        msg: "invalid request body"
      })
    }
  }
}

module.exports = UserRequestValidator