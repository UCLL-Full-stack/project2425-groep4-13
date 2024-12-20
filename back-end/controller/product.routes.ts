/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The product's name.
 *      ProductInput:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The product's name.
 */

import express, { NextFunction, Request, Response } from 'express';
import productService from '../service/product.service';
import { ProductInput } from '../types';


const productRouter = express.Router();


/**
 * @swagger
 * /product/check/{name}:
 *   get:
 *     summary: Check if product exists and return it if yes, if no return null.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The product's name.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A product or null.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRouter.get('/check/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(await productService.checkAndGetProductByName(req.params.name));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /product:
 *  post:
 *      summary: Create a new product.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductInput'
 *      responses:
 *          201:
 *              description: The created product.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request.
 */
productRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productInput = <ProductInput>req.body;
        const product = await productService.createProduct(productInput);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
})

export { productRouter  };