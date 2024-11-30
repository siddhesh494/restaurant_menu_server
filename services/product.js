const PRODUCT_DETAILS = require("./../mock/productDetails.json")

class ProductServices {
  getAllProduct = async (data) => {
    
    return Promise.resolve(PRODUCT_DETAILS)
  }
}

module.exports = ProductServices