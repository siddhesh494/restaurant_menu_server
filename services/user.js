const MESSAGE_CODE = require("../config/message-code")
const ProductDAO = require("../dao/productDAO")
const { safePromise } = require("../utils/required-helper")

const productDAO = new ProductDAO()
class UserServices {
  updateRecentlyViewProduct = async (data, userDetails) => {
    const [saveErr, saveRes] = await safePromise(
      productDAO.addRecentlyViewProduct(
        userDetails.user_id, 
        data.productID,
        {
          productID: data.productID,
          timestamp: new Date()
        }
      )
    )

    if(saveErr) {
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    return Promise.resolve({
      data: []
    })
  }
}

module.exports = UserServices