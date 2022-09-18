import { Request, Response } from "express";

import * as testService from "../services/testService.js";
import { testSchema } from "../schemas/testSchema.js";

export async function postTest(req: Request, res: Response){

    const testData: testService.ITestResquest = req.body;

    const validRequest = testSchema.validate(testData);

    if(validRequest.error){
        throw {
            type: "error_unprocessable_entity",
            message: "incorrect data format"
        }
    }

    await testService.addNewTest(testData);

   return res.status(201).send("new test added successfully");
}

export async function getTestsByDiscipline(req: Request, res: Response){

    const tests = await testService.getTests("discipline");

    return res.status(200).send(tests);
}

export async function getTestsByTeacher(req: Request, res: Response){

    const tests = await testService.getTests("teacher");

    return res.status(200).send(tests);
}