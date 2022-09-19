import connection from "../config/prisma";

export async function findTeacherById(id: number){

    const result = await connection.teacher.findUnique({
        where: { id }
    });

    return result;

}

export async function findTeacherByName(name: string){

    const result = await connection.teacher.findUnique({
        where: { name }
    });

    return result;

}