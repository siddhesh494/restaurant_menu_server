const MESSAGE_CODE = require("../config/message-code")
const { safePromise } = require("../utils/required-helper")
const { response } = require("../utils/response-helper")
const createLogger = require("../utils/create-logger")
const MenuService = require("../services/menu")
const log = createLogger("menu-controller")
const menuService = new MenuService()

class MenuController {
  update = async (req, res) => {
    const functionName = "updateController"
    try {
      const [error, result] = await safePromise(menuService.update(req.body, req.user))
      if(error) {
        log.error(functionName, "Error in update menu", error)
        return res.status(500).json(response(error))
      }
      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))
    } catch (error) {
      log.error(functionName, "Error in update menu: Catch Error", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }

  get = async (req, res) => {
    const functionName = "getController"
    try {
      const [error, result] = await safePromise(menuService.get(req.body))
      if(error) {
        log.error(functionName, "Error in get menu", error)
        return res.status(500).json(response(error))
      }
      return res.status(200).json(response({
        messageCode: MESSAGE_CODE.SUCCESS,
        data: result
      }))
    } catch (error) {
      log.error(functionName, "Error in get menu: Catch Error", error)
      return res.status(500).json(response({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      }))
    }
  }
}

module.exports = MenuController