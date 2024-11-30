const MESSAGE_CODE = require("../config/message-code")
const { safePromise } = require("../utils/required-helper")
const ProductDAO = require("../dao/productDAO")
const createLogger = require("../utils/create-logger")
const log = createLogger("product-service")

const productDAO = new ProductDAO()
class ProductServices {
  getAllProduct = async () => {
    const functionName = "getAllProduct"
    const [productErr, productRes] = await safePromise(productDAO.getAllProductDetails())
    if(productErr) {
      log.error(functionName, "error while getting product list",productErr)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    return Promise.resolve(productRes)
  }
}

module.exports = ProductServices