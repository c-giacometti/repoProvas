import bcrypt from "bcrypt";

export async function encryptPasswords(password: string){

    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
    
}

export function decryptPasswords(password: string, hashPassword: string){

    return bcrypt.compareSync(password, hashPassword);

}