var express = require('express');
const Auth = require('../../controller/auth');
const MenuController = require('../../controller/menu');
const RestaurantRequestValidator = require('../../middleware/validation/restaurant');
const RestaurantController = require('../../controller/restaurant');
var router = express.Router();

const restaurantRequestValidator = new RestaurantRequestValidator()
const restaurantController = new RestaurantController()

router.post('/update', restaurantRequestValidator.update, restaurantController.update);
router.post('/get', restaurantController.get);

module.exports = router;
