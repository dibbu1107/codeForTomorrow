import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../Config/db';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).send('Unauthorized');
    }

    try{
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).send('Unauthorized');
    }
};