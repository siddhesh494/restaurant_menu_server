const { doc, collection, addDoc, setDoc } = require('firebase/firestore');
const PRODUCT_DETAILS = require("./../mock/productDetails.json");
const UserDAO = require("./userDAO");
const { db } = require('../config/firebase-admin-setup');

const userDAO = new UserDAO

class ProductDAO {

  getAllProductDetails = async (data) => {
    // assume and database query (for now i am returing from mock data)
    return PRODUCT_DETAILS
  }
  
}

module.exports = ProductDAO