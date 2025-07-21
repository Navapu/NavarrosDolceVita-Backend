import express from 'express';
const router = express.Router();
import { createOrder, getOrder, getUserAllOrders, getAllOrders, getPendingOrders, statusOrders } from '../controllers/orders.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

router.post("/",authMiddleware, createOrder);
router.get("/", authMiddleware, getAllOrders);
router.get("/pending", authMiddleware, getPendingOrders);
router.get("/me", authMiddleware, getUserAllOrders);
router.get("/me/:id", authMiddleware, getOrder);
router.put("/status/:id", authMiddleware, statusOrders )

export default router;