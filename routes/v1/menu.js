var express = require('express');
const Auth = require('../../controller/auth');
const MenuRequestValidator = require('../../middleware/validation/menu');
const MenuController = require('../../controller/menu');
var router = express.Router();

const menuRequestValidator = new MenuRequestValidator()
const menuController = new MenuController()

router.post('/update', menuRequestValidator.update, menuController.update);
router.post('/get', menuController.get);

module.exports = router;
