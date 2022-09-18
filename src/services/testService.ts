import * as testRepository from "../repositories/testRepository.js";
import { verifyIfCategoryExists } from "./categoryService.js";
import { verifyIfDisciplineExists } from "./disciplineService.js";
import { verifyIfTeacherTeachsDiscipline } from "./teacherDisciplineService.js";
import { verifyIfTeacherExists } from "./teacherService.js";

export type ITestResquest = {
    name: string,
    pdfUrl: string,
    categoryId: number,
    disciplineId: number,
    teacherId: number
}

export async function addNewTest(testData: ITestResquest){

    const { name, pdfUrl, categoryId, disciplineId, teacherId } = testData;

    await verifyIfCategoryExists(categoryId);
    await verifyIfDisciplineExists(disciplineId);
    await verifyIfTeacherExists(teacherId);
    const teacherDisciplineId = await verifyIfTeacherTeachsDiscipline(teacherId, disciplineId);

    const newTestData = {
        name,
        pdfUrl,
        categoryId,
        teacherDisciplineId
    }

    await testRepository.insertTest(newTestData);

}