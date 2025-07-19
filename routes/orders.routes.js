import express from 'express';
const router = express.Router();
import { createOrder } from '../controllers/orders.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

router.post("/",authMiddleware, createOrder);

export default router;