import connection from "../config/prisma.js";

export async function findCategoryById(id: number){

    const result = await connection.category.findUnique({
        where: { id }
    });

    return result;

}
