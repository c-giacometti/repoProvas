import connection from "../config/prisma";

export async function findTeacherDiscipline(teacherId: number, disciplineId: number){

    const result = await connection.teacherDiscipline.findUnique({
        where: { teacherId_disciplineId: { teacherId, disciplineId } }
    });

    return result;
    
}