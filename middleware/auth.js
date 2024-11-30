const { OPEN_API } = require("../config/constant");
const { admin } = require("../config/firebase-admin-setup");
const MESSAGE_CODE = require("../config/message-code");
const { response } = require("../utils/response-helper");



async function auth(req, res, next) {
  console.log("in middleware")
  try {
    if(OPEN_API.indexOf(req.path) > -1) {
      // for open route
      next()
    } else {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json(response({
          messageCode: MESSAGE_CODE.UNAUTHORIZED_ERROR
        }))
      }

      const idToken = authorizationHeader.split(' ')[1]; // Extract the token

      // Verify the token using Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      // Attach user info to the request object
      req.user = decodedToken;
      next();
    }
    
  } catch (error) {
    return res.status(401).json(response({
      messageCode: MESSAGE_CODE.UNAUTHORIZED_ERROR
    }));
  }
}

module.exports = auth