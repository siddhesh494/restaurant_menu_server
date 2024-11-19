var express = require('express');
var router = express.Router();
const UserController = require("./../controller/user")
const UserRequestValidator = require('./../middleware/validation/user')

const userController = new UserController()
const userRequestValidator = new UserRequestValidator()


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/get', userRequestValidator.get, userController.getUser);


module.exports = router;
