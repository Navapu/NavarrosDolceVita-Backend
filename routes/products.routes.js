import express from 'express';
const router = express.Router();
import { getProducts, addProduct, editProduct, delProduct } from '../controllers/products.controller.js'

router.get("/", getProducts);
router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", delProduct);
export default router;