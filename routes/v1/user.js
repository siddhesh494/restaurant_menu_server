var express = require('express');
const UserController = require('../../controller/user');
const UserRequestValidator = require('../../middleware/validation/user');
var router = express.Router();

const userController = new UserController()
const userRequestValidator = new UserRequestValidator()

router.post(
  '/updateRecentlyViewProduct', 
  userRequestValidator.updateRecentlyViewProduct, 
  userController.updateRecentlyViewProduct
);

router.get(
  '/:userID/recentlyViewed', 
  userController.recentlyViewed
);



module.exports = router;
