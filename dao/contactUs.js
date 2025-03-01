const { doc, setDoc, getDoc } = require("firebase/firestore");
const { db } = require("../config/firebase-admin-setup");
const createLogger = require("../utils/create-logger");
const log = createLogger("ContactUs-dao")

class ContactUsDAO {
  createContactUsDocument = async (id, data) => {
    const functionName = "createContactUsDocument"
    try {
      await setDoc(doc(db, "ContactUs", id), data);
      return {success: true}
    } catch (error) {
      log.error(functionName, "Error while setting contact us document", error)
      throw error
    }
  }

}

module.exports = ContactUsDAO