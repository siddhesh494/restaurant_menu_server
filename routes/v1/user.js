var express = require('express');
var router = express.Router();

// const userController = new UserController()
// const userRequestValidator = new UserRequestValidator()


/* GET users listing. */
router.get('/g', function(req, res, next) {
  return res.status(200).json({
    success: true,
    data: {}
  })
});
// router.post('/get', userRequestValidator.get, userController.getUser);


module.exports = router;
