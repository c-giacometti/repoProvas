import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";

export async function verifyIfTeacherTeachsDiscipline(teacherId: number, disciplineId: number){

    const teacherDiscipline = await teacherDisciplineRepository.findTeacherDiscipline(teacherId, disciplineId);

    if(!teacherDiscipline){
        throw {
            type: "error_not_found",
            message: "teacher and discipline don't match"
        }
    }

    return teacherDiscipline.id;

}