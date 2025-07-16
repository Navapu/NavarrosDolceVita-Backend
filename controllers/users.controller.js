import { User } from "../db/models/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config/config.js';
import { ResponseAPI } from "../utils/response.js"


export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json(ResponseAPI({
                msg: 'Invalid email or password',
                error: true
            }));
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json(ResponseAPI({
                msg: 'Invalid email or password',
                error: true
            }));
        }

        const token = jwt.sign({
            userId: user._id,
            name: user.name
        },
            JWT_SECRET,
            {
                expiresIn: '2h'
            }
        );

        return res.status(200).json(ResponseAPI({
            msg: 'Correct login',
            data: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                token
            },
            error: false
        }));
    } catch (error) {
        next(error);
    }
}
export const registerUser = async (req, res, next) => {
    try {
        const { email, password, name, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json(ResponseAPI({
                msg: 'This email is already in use',
                error: true
            }));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name,
            role
        })

        const token = jwt.sign({
            userId: newUser._id,
            name: newUser.name
        },
            JWT_SECRET,
            {
                expiresIn: '2h'
            }
        );
        return res.status(200).json(ResponseAPI({
            msg: 'Registered User',
            data: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                token
            },
            error: false
        }));

    } catch (error) {
        next(error);
    }
}
export const getCurrentUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        const currentUser = await User.findById(userId).select('-password');

        if(!currentUser){
            return res.status(401).json(ResponseAPI({
                msg: "User not found",
                error: true
            }));
        }
        return res.status(200).json(ResponseAPI({
            msg: "User found",
            data: currentUser,
            error: false
        }));

    } catch (error) {
        next(error);
    }
}