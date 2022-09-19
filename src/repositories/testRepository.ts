import { Test } from "@prisma/client";
import connection from "../config/prisma";

export type ITestData = Omit<Test, "id">

export async function insertTest(testData: ITestData){
    await connection.test.create({
        data: testData
    });
}

export async function testsGroupedByDiscipline(){

    const result = await connection.term.findMany({
        select: {
            id: true,
            number: true,
            disciplines: { 
                select: {
                    id: true,
                    name: true,
                    teachersDisciplines: {
                        select: {
                            teacher: true,
                            
                            tests: {
                                orderBy: {
                                    categoryId: "asc"
                                },
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    category: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return result;
}

export async function testsGroupedByTeacher(){

    const result = await connection.teacher.findMany({
        select: {
            id: true,
            name: true,
            teachersDisciplines: {
                select: {
                    discipline: true,
                    tests: {
                        orderBy: {
                            categoryId: "asc"
                        },
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            category: true
                        }
                    },
                }
            }
        }
    })

    return result;
}