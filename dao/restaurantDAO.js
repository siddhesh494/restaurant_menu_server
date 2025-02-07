const { doc, setDoc } = require("firebase/firestore");
const { db } = require("../config/firebase-admin-setup");
const createLogger = require("../utils/create-logger");
const log = createLogger("restaurant-dao")

class RestaurantDAO {
  createRestaurantDocument = async (userID, data) => {
    const functionName = "createRestaurantDocument"
    try {
      await setDoc(doc(db, "restaurants", userID), data);
      return {success: true}
    } catch (error) {
      log.error(functionName, "Error while setting Restaurant document", error)
      throw error
    }
    
  }

}

module.exports = RestaurantDAO