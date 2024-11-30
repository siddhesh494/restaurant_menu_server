
const ProductServices = require("./../services/product")
const { safePromise } = require('../utils/required-helper')
const { response } = require("../utils/response-helper")
const MESSAGE_CODE = require("./../config/message-code")

const productServices = new ProductServices()

class ProductController {
  getAllProduct = async (req, res) => {
    try {
      const [err, result] = await safePromise(productServices.getAllProduct())
      if(err) {
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
      console.log(error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }
}

module.exports = ProductController