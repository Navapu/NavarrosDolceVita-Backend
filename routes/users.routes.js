import express from 'express';
const router = express.Router();
import { loginUser, registerUser } from '../controllers/users.controller.js';

router.post("/login", loginUser);
router.post("/register", registerUser)

export default router;