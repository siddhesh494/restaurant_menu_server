const MESSAGE_CODE = require("../config/message-code")
const UserDAO = require("../dao/userDAO")
const { safePromise } = require("../utils/required-helper")

const userDAO = new UserDAO()
class UserServices {
  updateRecentlyViewProduct = async (data, userDetails) => {
    const [saveErr, saveRes] = await safePromise(
      userDAO.addRecentlyViewProduct(
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
    return Promise.resolve({})
  }

  recentlyViewed = async (userID) => {
    const [saveErr, saveRes] = await safePromise(userDAO.getUserRecentlyViewProduct(userID))

    if(saveErr) {
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    return saveRes
  }
}

module.exports = UserServices