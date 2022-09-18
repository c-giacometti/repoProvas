import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as userService from "../services/userService.js";

interface IToken {
    id: number;
}

export default async function validateToken(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;

    if (!authorization?.startsWith('Bearer ')) {
        throw {
            type: "error_unauthorized",
            message: "missing token"
        }
    }

    const token = authorization.replace('Bearer ', '');

    if (!token) {
        throw {
            type: "error_bad_request",
            message: "invalid header"
        }
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await userService.getUserById((payload as IToken).id);

    if (!user) {
        throw {
            type: "error_unauthorized",
            message: "invalid token"
        }
    }

    res.locals.userId = user.id; 

    return next();

}