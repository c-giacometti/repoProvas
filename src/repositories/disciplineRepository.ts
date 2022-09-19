import connection from "../config/prisma";

export async function findDisciplineById(id: number){

    const result = await connection.discipline.findUnique({
        where: { id }
    });

    return result;

}

export async function findDisciplineByName(name: string){

    const result = await connection.discipline.findUnique({
        where: { name }
    });

    return result;

}