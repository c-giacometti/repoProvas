import connection from "../config/prisma.js";

export async function findCategoryById(id: number){

    const result = await connection.category.findUnique({
        where: { id }
    });

    return result;

}

export async function findCategoryByName(name: string){

    const result = await connection.category.findUnique({
        where: { name }
    });

    return result;

}