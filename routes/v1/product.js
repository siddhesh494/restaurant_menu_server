var express = require('express');
const ProductController = require('../../controller/product');
var router = express.Router();

const productController = new ProductController()

/**
 * @swagger
 * /product/getAll:
 *   get:
 *     summary: Get all products
 *     description: Fetch all available products with their details (name, id, image, etc.).
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The ID of the product.
 *                   name:
 *                     type: string
 *                     description: The name of the product.
 *                   image:
 *                     type: string
 *                     description: The URL of the product image.
 *                   description:
 *                     type: string
 *                     description: A description of the product.
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: The price of the product.
 *                   example:
 *                     - id: "12345"
 *                       name: "Product 1"
 *                       image: "http://example.com/product1.jpg"
 *                       description: "This is a description of Product 1"
 *                       price: 29.99
 *                     - id: "67890"
 *                       name: "Product 2"
 *                       image: "http://example.com/product2.jpg"
 *                       description: "This is a description of Product 2"
 *                       price: 49.99
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
router.get('/getAll', productController.getAllProduct);

module.exports = router;
