import { faker } from "@faker-js/faker";
import connection from '../../src/config/prisma';
import { IUserData } from "../../src/repositories/userRepository";
import { encryptPasswords } from "../../src/utils/encryptUtil";

type TOption = 'invalid-email' | 'invalid-password' | 'valid';

export function createUser(option: TOption = 'valid') {
    return {
        email: option === 'invalid-email' ? 'wrongemail@com.br' : faker.internet.email(),
        password: option === 'invalid-password' ? 'wrongpwd' : 'rightpwd',
    };
}

export async function insertUser(user: IUserData) {
    const hashedPassword = await encryptPasswords(user.password);
    const insertedUser = await connection.user.create({ data: { email: user.email, password: hashedPassword } });

    return insertedUser;
}