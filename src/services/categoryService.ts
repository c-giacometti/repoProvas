import * as categoryRepository from "../repositories/categoryRepository.js";

export async function verifyIfCategoryExists(categoryId: number){

    const category = await categoryRepository.findCategoryById(categoryId);

    if(!category){
        throw {
            type: "error_not_found",
            message: "category not found"
        }
    }

    return category;
    
}