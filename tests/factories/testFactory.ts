import { faker } from "@faker-js/faker";
import connection from "../../src/config/prisma";
import { ITestData } from "../../src/repositories/testRepository";

type TOption = "invalid-category" | "valid";

export function createInsertTestData(option: TOption = "valid"){
    return {
        name: faker.lorem.sentence(5),
        pdfUrl: faker.internet.url(),
        categoryId: option === "invalid-category" ? 10000 : 1,
        teacherId: 1,
        disciplineId: 1,
    };
}

export function createTest() {
    return {
        name: faker.lorem.sentence(5),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        teacherDisciplineId: 1,
    };
}

export async function insertTest(test: ITestData) {
    const insertedTest = await connection.test.create({ data: test });

    return insertedTest;
}