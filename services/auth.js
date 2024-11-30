const { admin, authClient} = require("./../config/firebase-admin-setup")
const { signInWithEmailAndPassword } = require('firebase/auth');

const { safePromise } = require("./../utils/required-helper")

class AuthService {
  signUpNewUser = async (data) => {
    const [userError, userResponse] = await safePromise(admin.auth().createUser({
      email: data.email,
      password: data.password,
      emailVerified: false,
      disabled: false
    }))
    if(userError) {
      return Promise.reject({
        messageCode: MESSAGE_CODE.INTERNAL_ERROR
      })
    }
    return userResponse
  }

  loginUser = async (data) => {
    const [userError, userResult] = await safePromise(signInWithEmailAndPassword(authClient, data.email, data.password))
    if(userError) {
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

