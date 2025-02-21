const { admin, authClient} = require("./../config/firebase-admin-setup")
const { signInWithEmailAndPassword } = require('firebase/auth');

const { safePromise } = require("./../utils/required-helper");
const UserDAO = require("../dao/userDAO");
const MESSAGE_CODE = require("../config/message-code");
const userDAO = new UserDAO()
const createLogger = require("../utils/create-logger");
const RestaurantDAO = require("../dao/restaurantDAO");
const restaurantDAO = new RestaurantDAO()
const log = createLogger("auth-Service")

class AuthService {
  signUpNewUser = async (data) => {
    const functionName = "signUpNewUser"

    // create user in auth table
    const [userError, userResponse] = await safePromise(admin.auth().createUser({
      email: data.email,
      password: data.password,
      emailVerified: false,
      disabled: false
    }))
    if(userError) {
      log.error(functionName, "Error while creating user", userError)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR,
        message: userError.message
      })
    }

    // add created user details in firebase database
    const [docErr, docRes] = await safePromise(restaurantDAO.createRestaurantDocument(
      userResponse.uid, 
      {
        restaurantID: userResponse.uid,
        email: userResponse.email,
        name: data.name
      }
    ))
    if(docErr) {
      log.error(functionName, "Error while creating user document", docErr)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    return userResponse
  }

  loginUser = async (data) => {
    const functionName = "loginUser"
    const [userError, userResult] = await safePromise(signInWithEmailAndPassword(authClient, data.email, data.password))
    if(userError) {
      if(userError.code === 'auth/invalid-credential') {
        log.error(functionName, "Invalid username or password", userError)
        return Promise.reject({
          messageCode: MESSAGE_CODE.INVALID_EMAIL_OR_PASSWORD
        })
      }

      log.error(functionName, "Error while login user", userError)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    const userCredential = userResult.user
    
    return {
      email: userCredential.email,
      restaurantID: userCredential.uid,
      accessToken: userCredential.stsTokenManager.accessToken,
      // refreshToken: userCredential.stsTokenManager.refreshToken
    }
  }
}

module.exports = AuthService

