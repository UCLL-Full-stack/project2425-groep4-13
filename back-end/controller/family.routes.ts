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
 */

import express, { NextFunction, Request, Response } from 'express';
import familyService from '../service/family.service';

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

export { familyRouter };