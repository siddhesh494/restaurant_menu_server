
const ProductServices = require("./../services/product")
const { safePromise } = require('../utils/required-helper')
const { response } = require("../utils/response-helper")
const MESSAGE_CODE = require("./../config/message-code")
const createLogger = require("../utils/create-logger")
const log = createLogger("product-controller")

const productServices = new ProductServices()

class ProductController {
  getAllProduct = async (req, res) => {
    const functionName = "getAllProduct"
    try {
      const [err, result] = await safePromise(productServices.getAllProduct())
      if(err) {
        log.error(functionName, "Error while getting product", err)
        return res.status(500).json({
          success: false,
          msg: err.msg || err
        })
      }
      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result,
        message: "Product List"
      }))
    } catch (error) {
      log.error(functionName, "Error while getting product: CATCH", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }
}

module.exports = ProductController