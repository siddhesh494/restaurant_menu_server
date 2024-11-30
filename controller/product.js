
const ProductServices = require("./../services/product")
const { safePromise } = require('../utils/required-helper')

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
      return res.status(200).json({
        success: true,
        data: result
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        msg: "Catch error"
      })
    }
  }
}

module.exports = ProductController