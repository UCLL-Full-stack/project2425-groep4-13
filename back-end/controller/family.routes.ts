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
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: The user's email.
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
import { FamilyInput, JoinFamilyInput, UserInput } from '../types';

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
familyRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await familyService.getAllFamilies());
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
familyRouter.get('/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await familyService.getFamilyByName(req.params.name));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /family/check/{name}:
 *   get:
 *     summary: Check if family exists and return it if yes, if no return null.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The family's name.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A family or null.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Family'
 */
familyRouter.get('/check/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await familyService.checkAndGetFamilyByName(req.params.name));
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
 *               $ref: '#/components/schemas/Family'
 */
familyRouter.get('/member/:memberEmail', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await familyService.getFamilyByMember(req.params.memberEmail));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /family/check/member/{memberEmail}:
 *   get:
 *     summary: Use member email to check if there is a family with this member already, if yes return it, if not return null.
 *     parameters:
 *       - in: path
 *         name: memberEmail
 *         required: true
 *         description: The member's email.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A family, or null if the user is member of no family.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Family'
 */
familyRouter.get('/check/member/:memberEmail', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await familyService.checkAndGetFamilyByMember(req.params.memberEmail));
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /family:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Create a new family.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FamilyInput'
 *      responses:
 *          200:
 *              description: The newly created family.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Family'
 */
familyRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const familyInput = <FamilyInput>req.body;
        const family = await familyService.createFamily(familyInput);
        res.status(200).json(family);
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
        const joinFamilyInput = <JoinFamilyInput>req.body;

        // TODO de user moet nog zijn role op "pending" gezet krijgen ook!
        // want default is null en front-end geeft dat gwn zo door en kan dat niet zelf wijzigen

        const result = await familyService.addMemberToFamily({family: joinFamilyInput.family, user: joinFamilyInput.user}); // die nieuwe user wordt gewoon als member toegevoegd, maar de "role" van de user is nog "pending"
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { familyRouter };