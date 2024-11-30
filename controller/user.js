
const UserServices = require("./../services/user")
const { safePromise } = require('../utils/required-helper')
const { response } = require("../utils/response-helper")
const MESSAGE_CODE = require("../config/message-code")
const createLogger = require("../utils/create-logger")
const log = createLogger("user-controller")
const userServices = new UserServices()

class UserController {

  updateRecentlyViewProduct = async (req, res) => {
    const functionName = "updateRecentlyViewProduct"
    try {
      const [err, result] = await safePromise(userServices.updateRecentlyViewProduct(req.body, req.user))
      if(err) {
        log.error(functionName, "Error while adding recently view product", err)
        return res.status(500).json(response(err))
      }
      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS
      }))
    } catch (error) {
      log.error(functionName, "Error while adding recently view product: CATCH ERROR", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }

  recentlyViewed = async (req, res) => {
    const functionName = "recentlyViewed"
    try {
      const { userID } = req.params
      const [err, result] = await safePromise(userServices.recentlyViewed(userID))
      if(err) {
        log.error(functionName, "Error while getting recently view product", error)
        return res.status(500).json(response(err))
      }
      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))
    } catch (error) {
      console.log(error)
      log.error(functionName, "Error while getting recently view product: CATCH ERROR", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }
}

module.exports = UserController