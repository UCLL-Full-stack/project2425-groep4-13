/**
 * @swagger
 *   components:
 *    schemas:
 *      Family:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: The family's name.
 *            members:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/User'
 *      FamilyInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: The family's name.
 *            members:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/UserInput'
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
 *      JoinFamilyInput:
 *          type: object
 *          properties:
 *              family:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          description: The family name.
 *              user:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: The user's email.
 */

import express, { NextFunction, Request, Response } from 'express';
import familyService from '../service/family.service';
import { FamilyInput, UserInput } from '../types';
import userService from '../service/user.service';

const familyRouter = express.Router();

/**
 * @swagger
 * /family:
 *   get:
 *     summary: Get a list of all families.
 *     responses:
 *       200:
 *         description: A list of families.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Family'
 */
familyRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(familyService.getAllFamilies());
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /family/{name}:
 *   get:
 *     summary: Get a family by name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The family's name.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A family.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Family'
 */
familyRouter.get('/:name', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(familyService.getFamilyByName(req.params.name));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /family/member/{memberEmail}:
 *   get:
 *     summary: Get families by member email.
 *     parameters:
 *       - in: path
 *         name: memberEmail
 *         required: true
 *         description: The member's email.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of families.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Family'
 */
familyRouter.get('/member/:memberEmail', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(familyService.getFamiliesByMember(req.params.memberEmail));
    } catch (error) {
        next(error);
    }
});

familyRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const familyInput: FamilyInput = req.body;
        const family = await familyService.createFamily(familyInput);
        res.status(201).json(family);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /family/member:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Add an existing member to an existing family.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/JoinFamilyInput'
 *      responses:
 *          200:
 *              description: The user got added to the family as a pending member.
 *              content:
 *                  application.json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *              
 */
familyRouter.post('/member', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {family, user} = req.body as {family: FamilyInput; user: UserInput} // de parameters ophalen en naar juiste DTO type casten

        // TODO de user moet nog zijn role op "pending" gezet krijgen ook!
        // want default is null en front-end geeft dat gwn zo door en kan dat niet zelf wijzigen

        const result = await familyService.addMemberToFamily({family: family, user: user}); // die nieuwe user wordt gewoon als member toegevoegd, maar de "role" van de user is nog "pending"
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { familyRouter };