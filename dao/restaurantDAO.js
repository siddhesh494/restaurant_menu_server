const { doc, setDoc, getDoc } = require("firebase/firestore");
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

  getRestaurantDocument = async (userID) => {
    const functionName = "createRestaurantDocument"
    try {
      const docRef = doc(db, "restaurants", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data(); // Returns restaurant details
      } else {
        return null;
      }

    } catch (error) {
      log.error(functionName, "Error while setting Restaurant document", error)
      throw error
    }
  }

  updateRestaurantDocument = async (userID, data) => {
    const functionName = "createRestaurantDocument"
    try {
      await setDoc(doc(db, "restaurants", userID), data, { merge: true });
      return {success: true}
    } catch (error) {
      log.error(functionName, "Error while setting Restaurant document", error)
      throw error
    }
  }

}

module.exports = RestaurantDAO