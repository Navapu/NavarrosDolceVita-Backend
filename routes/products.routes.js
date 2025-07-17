import express from 'express';
const router = express.Router();
import { getProducts, addProduct, editProduct, delProduct } from '../controllers/products.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


router.get("/", getProducts);
router.post("/", authMiddleware, addProduct);
router.put("/:id", authMiddleware, editProduct);
router.delete("/:id", authMiddleware, delProduct);
export default router;