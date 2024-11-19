
const UserServices = require("./../services/user")
const { safePromise } = require('../utils/required-helper')

const userServices = new UserServices()

class UserController {

  getUser = async (req, res) => {
    try {
      const [err, result] = await safePromise(userServices.getUser(req.body))
      if(err) {
        return res.status(500).json({
          success: false,
          msg: err.msg || err
        })
      }
      return res.status(200).json({
        success: true,
        data: result.data
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        msg: "Catch error"
      })
    }
  }
}

module.exports = UserController