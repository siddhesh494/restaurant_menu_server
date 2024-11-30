const { addDoc, getDoc, doc, setDoc, collection } = require("firebase/firestore");
const { db } = require("../config/firebase-admin-setup");

class UserDAO {
  createUserDocument = async (userID, data) => {
    await setDoc(doc(db, "users", userID), data);
    return {success: true}
  }
}

module.exports = UserDAO