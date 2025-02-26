
const { safePromise } = require("./../utils/required-helper");
const createLogger = require("../utils/create-logger");
const RestaurantDAO = require("../dao/restaurantDAO");
const MESSAGE_CODE = require("../config/message-code");
const { isEmpty } = require("lodash");
const log = createLogger("Restaurant-Service")
const restaurantDAO = new RestaurantDAO()

class RestaurantService {

  get = async (data) => {
    const functionName = "get"

    // verify if restaurant is valid or not
    const [getErr, getRes] = await safePromise(restaurantDAO.getRestaurantDocument(
      data.user_id
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
    delete getRes.menuDetails
    return getRes
  }

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
    const updateObject = {}
    if(data.address) updateObject.address = data.address
    if(data.name) updateObject.name = data.name

    if(!isEmpty(updateObject)) {
      const [updateErr, ] = await safePromise(restaurantDAO.updateRestaurantDocument(
        user.user_id, 
        updateObject
      ))
      if(updateErr) {
        log.error(functionName, "Error while updating menu", updateErr)
        return Promise.reject({
          messageCode: MESSAGE_CODE.INTERNAL_ERROR
        })
      }
    }
    
    return {}
  }
}

module.exports = RestaurantService

