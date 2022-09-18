import { Test } from "@prisma/client";
import connection from "../config/prisma";

export type ITestData = Omit<Test, "id">

export async function insertTest(testData: ITestData){

}

export async function findTestsByDisciplineId(){

}

export async function findTestsByTeacherId(){

}