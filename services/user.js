const { getAllUser } = require("../dal/mongo/user/find")
const { safePromise } = require("../utils/required-helper")


class UserServices {
  getUser = async (data) => {

    const [err, result] = await safePromise(getAllUser())
    if(err) {
      return Promise.reject({
        error: err.message
      })
    }
    return Promise.resolve({
      data: result
    })
  }
}

module.exports = UserServices