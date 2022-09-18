import * as teacherRepository from "../repositories/teacherRepository.js";

export async function verifyIfTeacherExists(teacherId: number){

    const teacher = await teacherRepository.findTeacherById(teacherId);

    if(!teacher){
        throw {
            type: "error_not_found",
            message: "teacher not found"
        }
    }

    return teacher;
}