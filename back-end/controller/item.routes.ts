/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The ID of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         amount:
 *           type: number
 *           description: Amount of this item in stock
 *         expirationDate:
 *           type: string
 *           format: date-time
 *     ItemInput:
 *       type: object
 *       properties:
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         amount:
 *           type: number
 *           description: Amount of the item to be created
 *         expirationDate:
 *           type: string
 *           format: date-time
 */


import express, { NextFunction, Request, Response } from 'express';
import itemService from '../service/item.service';
import { ItemInput } from '../types';

const itemRouter = express.Router();


/**
 * @swagger
 * /item:
 *  get:
 *      summary: Get a list of all items.
 *      responses:
 *          200:
 *              description: A list of items.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Item'
 *                      
 */
itemRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await itemService.getAllItems();
        res.status(200).json(items);
        
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /item:
 *  get:
 *      summary: Get a list of all items, ordered by ascending expiration date
 *      responses:
 *          200:
 *              description: A list of items.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Item'
 *                      
 */
itemRouter.get('/order/date', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await itemService.getAllItemsOrderByDate();
        res.status(200).json(items);
        
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /item:
 *  post:
 *      summary: Create a new item.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ItemInput'
 *      responses:
 *          201:
 *              description: The created item.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Item'
 *          400:
 *              description: Bad request.
 */
itemRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const itemInput = <ItemInput>req.body
        const item = await itemService.createItem(itemInput);
        res.status(200).json(item);
        
    } catch (error) {
        next(error);
    }
});

export { itemRouter };