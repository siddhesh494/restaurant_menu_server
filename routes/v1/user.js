var express = require('express');
const UserController = require('../../controller/user');
const UserRequestValidator = require('../../middleware/validation/user');
var router = express.Router();

const userController = new UserController()
const userRequestValidator = new UserRequestValidator()

/**
 * @swagger
 * /user/updateRecentlyViewProduct:
 *   post:
 *     summary: Update recently viewed product for a user
 *     description: This endpoint allows a user to update their recently viewed product list by providing a productID and a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productID
 *             properties:
 *               productID:
 *                 type: string
 *                 description: The ID of the product being viewed.
 *     responses:
 *       200:
 *         description: Successfully updated the recently viewed product list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully updated recently viewed product."
 *       401:
 *         description: Unauthorized, invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing JWT token."
 *       400:
 *         description: Bad request, invalid product ID or missing parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Product ID is required."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */
router.post(
  '/updateRecentlyViewProduct', 
  userRequestValidator.updateRecentlyViewProduct, 
  userController.updateRecentlyViewProduct
);

/**
 * @swagger
 * /user/{userID}/recentlyViewed:
 *   get:
 *     summary: Get recently viewed products for a user
 *     description: This endpoint allows a user to get their recently viewed product list by providing a valid JWT token and the userID in the URL.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         description: The ID of the user whose recently viewed products are being requested.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the recently viewed products list.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productID:
 *                     type: string
 *                     description: The ID of the product.
 *                   name:
 *                     type: string
 *                     description: The name of the product.
 *                   timestamp:
 *                     type: string
 *                     description: The time when the product was viewed.
 *                   example:
 *                     - productID: "12345"
 *                       name: "Product 1"
 *                       timestamp: "2024-12-01T10:00:00Z"
 *                     - productID: "67890"
 *                       name: "Product 2"
 *                       timestamp: "2024-12-01T10:05:00Z"
 *       401:
 *         description: Unauthorized, invalid or missing JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or missing JWT token."
 *       403:
 *         description: Forbidden, user does not have access to the requested userID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission to access this user’s data."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error, please try again later."
 */
router.get(
  '/:userID/recentlyViewed', 
  userController.recentlyViewed
);



module.exports = router;
