import { Request, Response, NextFunction } from 'express';
import prisma from '../db';
import { z } from 'zod';

const productSchema = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    image: z.string().url(),
    category: z.string().min(1),
    stockQuantity: z.number().int().nonnegative()
});

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category } = req.query;
        const products = await prisma.product.findMany({
            where: category ? { category: String(category) } : undefined
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!product) {
            const error: any = new Error('Product not found');
            error.status = 404;
            throw error;
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = productSchema.parse(req.body);
        const product = await prisma.product.create({
            data: validatedData
        });
        res.status(201).json(product);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const err: any = new Error('Validation failed');
            err.status = 400;
            err.details = error.issues;
            next(err);
        } else {
            next(error);
        }
    }
};

