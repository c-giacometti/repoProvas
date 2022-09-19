import * as disciplineRepository from "../repositories/disciplineRepository";

export async function verifyIfDisciplineExists(disciplineId: number){

    const discipline = await disciplineRepository.findDisciplineById(disciplineId);

    if(!discipline){
        throw {
            type: "error_not_found",
            message: "discipline not found"
        }
    }

    return discipline;

}