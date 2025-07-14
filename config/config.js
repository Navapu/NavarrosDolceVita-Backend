import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const BACKEND_URL = process.env.BACKEND_URL;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const CLUSTER = process.env.CLUSTER;
export const DATABASE = process.env.DATABASE;
export const JWT_SECRET = process.env.JWT_SECRET;