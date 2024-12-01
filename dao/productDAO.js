const { doc, collection, addDoc, setDoc } = require('firebase/firestore');
const PRODUCT_DETAILS = require("./../mock/productDetails.json");
const { db } = require('../config/firebase-admin-setup');
const { filter } = require('lodash');


class ProductDAO {

  getAllProductDetails = async (data) => {
    // assume and database query (for now i am returing from mock data)
    return PRODUCT_DETAILS
  }

  getProductDetailsByID = async (data) => {
    return filter(PRODUCT_DETAILS, (item) => (data.indexOf(item.id) > -1))
  }
  
}

module.exports = ProductDAO