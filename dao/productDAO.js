const { doc, collection, addDoc, setDoc } = require('firebase/firestore');
const PRODUCT_DETAILS = require("./../mock/productDetails.json");
const UserDAO = require("./userDAO");
const { db } = require('../config/firebase-admin-setup');

const userDAO = new UserDAO

class ProductDAO {

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

  getAllProductDetails = async (data) => {
    // assume and database query (for now i am returing from mock data)

    return PRODUCT_DETAILS
  }
  
}

module.exports = ProductDAO