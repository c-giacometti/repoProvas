import jwt from 'jsonwebtoken';
import * as userRepository from "../repositories/userRepository";
import { encryptPasswords, decryptPasswords } from '../utils/encryptUtil';

export async function newUser(
    email: string, 
    password: string
){

    const user = await userRepository.findByEmail(email);

    if(user){
        throw {
            type: "error_bad_request",
            message: "you already have an account"
        }
    }

    const hashPassword = await encryptPasswords(password);

    await userRepository.insertUser({ email, password: hashPassword });
    
}

export async function login(
    email: string,
    password: string
){

    const user = await userRepository.findByEmail(email);

    if(!user){
        throw {
            type: "error_unauthorized",
            message: "incorrect data"
        }
    }

    const validatePassword = await decryptPasswords(password, user.password);

    if(!validatePassword){
        throw {
            type: "error_unauthorized",
            message: "incorrect data"
        }
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '60min' });

    return { token };
    
}

export async function getUserById(id: number) {

    const user = await userRepository.getById(id);

    return user;

}