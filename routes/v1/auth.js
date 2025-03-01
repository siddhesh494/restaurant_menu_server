var express = require('express');
const Auth = require('../../controller/auth');
const AuthRequestValidator = require('../../middleware/validation/auth');
var router = express.Router();

const auth = new Auth()
const authRequestValidator = new AuthRequestValidator()


router.post('/signUp', authRequestValidator.signUp, auth.signUp);

router.post('/login', authRequestValidator.login, auth.login);

router.post('/forgotPassword', authRequestValidator.forgotPassword, auth.forgotPassword)
router.post('/verifyEmail', auth.emailVerification)
router.post('/contactUs', authRequestValidator.contactUs,  auth.contactUs)

router.get(
  '/verifyJWTToken', 
  auth.verifyToken
);
module.exports = router;
