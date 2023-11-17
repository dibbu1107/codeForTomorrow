import { Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../Entities/User';
import { setCache, getCache } from "../Service/cachingService";
import dotenv from 'dotenv';
const SECRET_KEY = "secret"

dotenv.config();

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ where: { username, password } });

        if (!user) {
            return res.status(401).send("Invalid Credentials");
        }

        // Check and logout other session
        await endingOtherSession(user.id);

        // Creating jwt
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '8h' });

        // Set token in cache if needed
        await setCache(`user_${user.id}_token`, token, 8 * 60 * 60); // 8 hours expiration

        res.cookie('token', token, { httpOnly: true });

        user.sessionId = token;
        await userRepository.save(user);
        res.send('Login Successful');
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Function to end the user's active session or log them out
const endingOtherSession = async (userId: number) => {
    try {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { id: userId } });

        if (user && user.sessionId) {
            // Remove token from cache if needed
            await setCache(`user_${user.id}_token`, '', 0);

            user.sessionId = null as any;
            await userRepository.save(user);
        }
    } catch (error) {
        console.error("Error during ending other session:", error);
    }
};
