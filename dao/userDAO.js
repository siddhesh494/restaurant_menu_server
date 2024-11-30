const { addDoc, getDoc, doc, setDoc, collection, getDocs, query, orderBy, limit } = require("firebase/firestore");
const { db } = require("../config/firebase-admin-setup");

class UserDAO {
  createUserDocument = async (userID, data) => {
    await setDoc(doc(db, "users", userID), data);
    return {success: true}
  }

  addRecentlyViewProduct = async (userID, productID, productData) => {
    try {
      await setDoc(doc(db, `users/${userID}/productViewed`, productID), productData); // Add the post data
      console.log('Subcollection document created successfully!');

      return {success: true}
    } catch (error) {
      console.error('Error creating subcollection document:', error);
      throw error
    }
  }

  getUserRecentlyViewProduct = async (userID) => {
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
      throw error
    }
  }
}

module.exports = UserDAO