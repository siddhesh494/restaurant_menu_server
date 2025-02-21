
const { safePromise } = require("./../utils/required-helper");
const createLogger = require("../utils/create-logger");
const RestaurantDAO = require("../dao/restaurantDAO");
const MESSAGE_CODE = require("../config/message-code");
const log = createLogger("menu-Service")
const restaurantDAO = new RestaurantDAO()

class MenuService {
  update = async (data, user) => {
    const functionName = "update"

    // verify if restaurant is valid or not
    const [getErr, getRes] = await safePromise(restaurantDAO.getRestaurantDocument(
      user.user_id
    ))
    if(getErr) {
      log.error(functionName, "Error while getting restaurant details", getErr)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }

    if(!getRes) {
      log.error(functionName, "No restaurant found")
      return Promise.reject({
        messageCode: MESSAGE_CODE.NOT_FOUND,
        message: "No restaurant found"
      })
    }

    // update the object in restuarant object
    const [updateErr, ] = await safePromise(restaurantDAO.updateRestaurantDocument(
      user.user_id, 
      { menuDetails: data.menuDetails}
    ))
    if(updateErr) {
      log.error(functionName, "Error while updating menu", updateErr)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    return {}
  }

  get = async (data) => {
    const functionName = "get"

    // verify if restaurant is valid or not
    const [getErr, getRes] = await safePromise(restaurantDAO.getRestaurantDocument(
      data.restaurantID
    ))
    if(getErr) {
      log.error(functionName, "Error while getting restaurant details", getErr)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }

    if(!getRes) {
      log.error(functionName, "No restaurant found")
      return Promise.reject({
        messageCode: MESSAGE_CODE.NOT_FOUND,
        message: "No restaurant found"
      })
    }

    return getRes.menuDetails || []
  }
}

module.exports = MenuService

