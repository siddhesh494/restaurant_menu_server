const { admin, authClient} = require("./../config/firebase-admin-setup")
const { signInWithEmailAndPassword } = require('firebase/auth');

const { safePromise } = require("./../utils/required-helper");
const UserDAO = require("../dao/userDAO");
const MESSAGE_CODE = require("../config/message-code");
const userDAO = new UserDAO()
const createLogger = require("../utils/create-logger")
const log = createLogger("auth-Service")

class AuthService {
  signUpNewUser = async (data) => {
    const functionName = "signUpNewUser"
    const [userError, userResponse] = await safePromise(admin.auth().createUser({
      email: data.email,
      password: data.password,
      emailVerified: false,
      disabled: false
    }))
    if(userError) {
      log.error(functionName, "Error while creating user", userError)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }

    const [docErr, docRes] = await safePromise(userDAO.createUserDocument(
      userResponse.uid, 
      {
        userID: userResponse.uid,
        email: userResponse.email
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
      log.error(functionName, "Error while login user", userError)
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    const userCredential = userResult.user
    
    return {
      email: userCredential.email,
      accessToken: userCredential.stsTokenManager.accessToken,
      refreshToken: userCredential.stsTokenManager.refreshToken
    }
  }
}

module.exports = AuthService

