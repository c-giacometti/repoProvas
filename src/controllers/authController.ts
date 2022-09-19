import { Request, Response } from "express";

import * as authSchema from "../schemas/authSchema";
import * as userService from "../services/userService";

export async function login(req: Request, res: Response){
    const { email, password } = req.body;

    const validRequest = authSchema.loginSchema.validate(req.body);

    if(validRequest.error){
        throw {
            type: "error_unprocessable_entity",
            message: "incorrect data format"
        }
    }

    const { token } = await userService.login(email, password);

    return res.status(200).send({ token });
}

export async function register(req: Request, res: Response){
    const { email, password, confirmPassword } = req.body;

    const validRequest = authSchema.registerSchema.validate(req.body);

    if(validRequest.error){
        throw {
            type: "error_unprocessable_entity",
            message: "incorrect data format"
        }
    }

    if(password !== confirmPassword){
        throw {
            type: "error_unprocessable_entity",
            message: "incorrect data"
        }
    }

    await userService.newUser(email, password);

    return res.status(201).send("user created successfully");
}