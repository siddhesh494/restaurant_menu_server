const MESSAGE_CODE = require("../config/message-code")
const { safePromise } = require("../utils/required-helper")
const ProductDAO = require("../dao/productDAO")

const productDAO = new ProductDAO()
class ProductServices {
  getAllProduct = async () => {

    const [productErr, productRes] = await safePromise(productDAO.getAllProductDetails())
    if(productErr) {
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    return Promise.resolve(productRes)
  }
}

module.exports = ProductServices