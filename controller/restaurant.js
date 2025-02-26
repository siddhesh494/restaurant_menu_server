const MESSAGE_CODE = require("../config/message-code")
const { safePromise } = require("../utils/required-helper")
const { response } = require("../utils/response-helper")
const createLogger = require("../utils/create-logger")
const MenuService = require("../services/menu")
const RestaurantService = require("../services/restaurant")
const log = createLogger("restaurant-controller")
const restaurantService = new RestaurantService()

class RestaurantController {
  update = async (req, res) => {
    const functionName = "updateController"
    try {
      const [error, result] = await safePromise(restaurantService.update(req.body, req.user))
      if(error) {
        log.error(functionName, "Error in update restaurant details", error)
        return res.status(500).json(response(error))
      }
      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))
    } catch (error) {
      log.error(functionName, "Error in update restaurant details: Catch Error", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }

  get = async (req, res) => {
    const functionName = "getController"
    try {
      const [error, result] = await safePromise(restaurantService.get(req.user))
      if(error) {
        log.error(functionName, "Error in update restaurant details", error)
        return res.status(500).json(response(error))
      }
      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))
    } catch (error) {
      log.error(functionName, "Error in update restaurant details: Catch Error", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }
}

module.exports = RestaurantController