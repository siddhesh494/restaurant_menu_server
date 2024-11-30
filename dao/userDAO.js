const { addDoc, getDoc, doc, setDoc, collection, getDocs, query, orderBy, limit } = require("firebase/firestore");
const { db } = require("../config/firebase-admin-setup");
const createLogger = require("../utils/create-logger")
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

  addRecentlyViewProduct = async (userID, productID, productData) => {
    const functionName = "addRecentlyViewProduct"
    try {
      await setDoc(doc(db, `users/${userID}/productViewed`, productID), productData); // Add the post data

      return {success: true}
    } catch (error) {
      log.error(functionName, "Error while setting subcollection document", error)
      throw error
    }
  }

  getUserRecentlyViewProduct = async (userID) => {
    const functionName = "getUserRecentlyViewProduct"
    try {
      const userRef = doc(db, 'users', userID);
      const productRef = collection(userRef, 'productViewed');
      const reviewsQuery = query(
        productRef,
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      const querySnapshot = await getDocs(reviewsQuery);

      // Extract the data from the query snapshot
      const reviews = [];
      querySnapshot.forEach((doc) => {
        reviews.push({
          ...doc.data(),
        });
      });

      return reviews;
    } catch (error) {
      log.error(functionName, "Error while getUserRecentlyViewProduct", error)
      throw error
    }
  }
}

module.exports = UserDAO