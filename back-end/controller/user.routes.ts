/**
 * @swagger
 *   components:
 *    securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              description: The user's email.
 *            firstName:
 *              type: string
 *              description: The user's first name.
 *            lastName:
 *              type: string
 *              description: The user's last name.
 *            password:
 *              type: string
 *              items:
 *                  $ref: '#/components/schemas/User'
 *      UserInput:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              description: The user's email.
 *            firstName:
 *              type: string
 *              description: The user's first name.
 *            lastName:
 *              type: string
 *              description: The user's last name.
 *            password:
 *              type: string
 *              description: The user's password.
*      AuthenticationRequest:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              description: User email.
 *            password:
 *              type: string
 *              description: User password.
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              description: JWT token.
 *            email:
 *              type: string
 *              description: User email.
 *            fullname:
 *              type: string
 *              description: User name.
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();



/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Get a user by email.
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *           required: true
 *           description: The user's email.
 *     responses:
 *       200:
 *         description: The user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
userRouter.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const user = await userService.getUserByEmail({email});
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request.
 *       409:
 *         description: Conflict. User with email already exists.
 */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput: UserInput = req.body;
        const user = await userService.createUser(userInput);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *      summary: Create a new user.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *       200:
 *         description: Authentication successful.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.body as UserInput;
            const newUser = await userService.createUser(user);
            res.status(200).json(newUser);
        } catch (error) {
            next(error);
        }
    }
);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: Authentication successful.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post(
    '/login',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userInput = <UserInput>req.body;
            const response = await userService.authenticate(userInput);
            res.status(200).json({ message: 'Authentication successful', ...response });
        } catch (error) {
            next(error);
        }
    }
);

export { userRouter };
