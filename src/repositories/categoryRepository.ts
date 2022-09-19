import connection from "../config/prisma";

export async function findCategoryById(id: number){

    const result = await connection.category.findUnique({
        where: { id }
    });

    return result;

}
