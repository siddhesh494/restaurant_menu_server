var express = require('express');
const Auth = require('../../controller/auth');
const AuthRequestValidator = require('../../middleware/validation/auth');
var router = express.Router();

const auth = new Auth()
const authRequestValidator = new AuthRequestValidator()

/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     summary: Sign up a new user
 *     description: This endpoint allows a new user to sign up by providing their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the new user (should be at least 6 characters long).
 *     responses:
 *       200:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully."
 *                 userId:
 *                   type: integer
 *                   description: The ID of the newly created user.
 *       400:
 *         description: Invalid input or missing parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email format."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database error, please try again later."
 */
router.post('/signUp', authRequestValidator.signUp, auth.signUp);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     description: This endpoint allows a user to log in by providing their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: The email of the logged-in user.
 *                 id:
 *                   type: integer
 *                   description: The ID of the logged-in user.
 *                 token:
 *                   type: string
 *                   description: The authentication token for the user.
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email or password"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error, please try again later."
 */
router.post('/login', authRequestValidator.signUp, auth.login);

/**
 * @swagger
 * /auth/verifyJWTToken:
 *   get:
 *     summary: Verify JWT Token
 *     description: This endpoint verifies the JWT token from the Authorization header and returns the user details if valid.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully verified the token and retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The ID of the user.
 *                 email:
 *                   type: string
 *                   description: The email of the user.
 *                   example: "user@example.com"
 *                 emailVerified:
 *                   type: boolean
 *                   description: Whether the user's email is verified.
 *                   example: false
 *                 uid:
 *                   type: string
 *                   description: The Firebase user ID.
 *                   example: "732wuXtEVqUKvuW3iBZKtvg7hZw1"
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
  '/verifyJWTToken', 
  auth.verifyToken
);
module.exports = router;
