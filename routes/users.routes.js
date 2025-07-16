import express from 'express';
const router = express.Router();
import { loginUser, registerUser, getCurrentUser } from '../controllers/users.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", authMiddleware, getCurrentUser);


export default router;