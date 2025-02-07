const { doc, setDoc } = require("firebase/firestore");
const { db } = require("../config/firebase-admin-setup");
const createLogger = require("../utils/create-logger");
const log = createLogger("user-dao")

class UserDAO {
  createUserDocument = async (userID, data) => {
    const functionName = "createUserDocument"
    try {
      await setDoc(doc(db, "users", userID), data);
      return {success: true}
    } catch (error) {
      log.error(functionName, "Error while setting user document", error)
      throw error
    }
    
  }

}

module.exports = UserDAO