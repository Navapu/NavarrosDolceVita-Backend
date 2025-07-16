/**
 * Authentication Middleware
 * Middleware de autenticación
 * 
 * Verifica el token JWT enviado en el encabezado 'Authorization'.
 * Si el token es válido, añade el userId al objeto `req` y permite continuar.
 * Si el token falta o es inválido, responde con estado 401.
 * 
 * Verifies the JWT token from the 'Authorization' header.
 * If the token is valid, adds `userId` to `req` and continues.
 * If missing or invalid, responds with 401 Unauthorized.
 */

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/config.js";

export const authMiddleware = (req, res, next) => {
    try {

        const token = req.header('Authorization')?.replace("Bearer ","");

        if(!token){
            return res.status(401).json({msg: 'Required token'})
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        req.userId = decoded.userId;
        next();

    } catch (error) {
        res.status(401).json({msg: 'Invalid token'})
    }

}