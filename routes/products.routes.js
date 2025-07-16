import express from 'express';
const router = express.Router();
import { getProducts, addProduct, editProduct } from '../controllers/products.controller.js'

router.get("/", getProducts);
router.post("/", addProduct)
router.put("/:id", editProduct )
export default router;