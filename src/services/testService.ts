import * as testRepository from "../repositories/testRepository";
import { verifyIfCategoryExists } from "./categoryService";
import { verifyIfDisciplineExists } from "./disciplineService";
import { verifyIfTeacherTeachsDiscipline } from "./teacherDisciplineService";
import { verifyIfTeacherExists } from "./teacherService";

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

export async function getTests(sortBy: string){

    if(sortBy === "discipline"){
        const tests = await testRepository.testsGroupedByDiscipline();
        return tests;
    }

    if(sortBy === "teacher"){
        const tests = await testRepository.testsGroupedByTeacher();
        return tests;
    }

    throw {
        type: "error_bad_request",
        message: "couldn't sort by this selection"
    }
}