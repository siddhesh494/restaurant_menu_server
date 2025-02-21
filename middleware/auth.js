const { OPEN_API } = require("../config/constant");
const { admin } = require("../config/firebase-admin-setup");
const MESSAGE_CODE = require("../config/message-code");
const { response } = require("../utils/response-helper");
const createLogger = require("../utils/create-logger")
const log = createLogger("user-validation")


async function auth(req, res, next) {
  const functionName = "auth"
  try {
    if(OPEN_API.indexOf(req.path) > -1) {
      // for open route
      next()
    } else {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        log.error(functionName, "No authorization")
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
    log.error(functionName, "authorization: catch error", error)
    if (error.code === "auth/id-token-expired") {
      return res.status(401).json(response({
        messageCode: MESSAGE_CODE.UNAUTHORIZED_ERROR,
        message: "Token expired. Please refresh and retry."
      }));
    } else {
      return res.status(401).json(response({
        messageCode: MESSAGE_CODE.UNAUTHORIZED_ERROR,
        message: "Invalid token"
      }));
    }
  }
}

module.exports = auth