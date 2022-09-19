import { User } from "@prisma/client";
import connection from "../config/prisma";

export type IUserData = Omit<User, "id">

export async function insertUser(user: IUserData){

    const { email, password } = user;

    await connection.user.create({
        data: { email, password }
    });

}

export async function findByEmail(email: string){

    const result = await connection.user.findUnique({
        where: { email }
    });

    return result;

}

export async function getById(id: number) {

    const result = await connection.user.findUnique({
        where: { id },
    });

    return result;
    
}