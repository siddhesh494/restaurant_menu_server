
const UserServices = require("./../services/user")
const { safePromise } = require('../utils/required-helper')
const { response } = require("../utils/response-helper")
const MESSAGE_CODE = require("../config/message-code")

const userServices = new UserServices()

class UserController {

  updateRecentlyViewProduct = async (req, res) => {
    try {
      const [err, result] = await safePromise(userServices.updateRecentlyViewProduct(req.body, req.user))
      if(err) {
        return res.status(500).json(response(err))
      }
      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS
      }))
    } catch (error) {
      console.log(error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }

  recentlyViewed = async (req, res) => {
    try {
      const { userID } = req.params
      const [err, result] = await safePromise(userServices.recentlyViewed(userID))
      if(err) {
        return res.status(500).json(response(err))
      }
      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))
    } catch (error) {
      console.log(error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }
}

module.exports = UserController