import express from 'express';
const router = express.Router();
import { createOrder, getOrder } from '../controllers/orders.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

router.post("/",authMiddleware, createOrder);
router.get("/:id", authMiddleware, getOrder)

export default router;