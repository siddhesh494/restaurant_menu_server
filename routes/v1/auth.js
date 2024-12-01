var express = require('express');
const Auth = require('../../controller/auth');
const AuthRequestValidator = require('../../middleware/validation/auth');
var router = express.Router();

const auth = new Auth()
const authRequestValidator = new AuthRequestValidator()

/* GET users listing. */
router.post('/signUp', authRequestValidator.signUp, auth.signUp);
router.post('/login', authRequestValidator.signUp, auth.login);
router.get(
  '/verifyJWTToken', 
  auth.verifyToken
);
module.exports = router;
