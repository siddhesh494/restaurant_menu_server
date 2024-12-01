const MESSAGE_CODE = require("../config/message-code")
const UserDAO = require("../dao/userDAO")
const { safePromise } = require("../utils/required-helper")
const createLogger = require("../utils/create-logger")
const { serverTimestamp } = require("firebase/firestore")
const log = createLogger("user-service")
const userDAO = new UserDAO()


class UserServices {
  updateRecentlyViewProduct = async (data, userDetails) => {
    const functionName = "updateRecentlyViewProduct"
    const [saveErr, saveRes] = await safePromise(
      userDAO.addRecentlyViewProduct(
        userDetails.user_id, 
        data.productID,
        {
          productID: data.productID,
          timestamp: serverTimestamp()
        }
      )
    )

    if(saveErr) {
      log.error(functionName, "Error in updateRecentlyViewProduct", saveErr)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    return Promise.resolve({})
  }

  recentlyViewed = async (userID) => {
    const functionName = "recentlyViewed"

    const [getErr, result] = await safePromise(userDAO.getUserRecentlyViewProduct(userID))

    
    if(getErr) {
      log.error(functionName, "Error in recentlyViewed", getErr)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    return result
  }
}

module.exports = UserServices