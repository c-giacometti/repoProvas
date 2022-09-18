import { Request, Response } from "express";

import * as testService from "../services/testService.js";
import { testSchema } from "../schemas/testSchema.js";

export async function postTest(req: Request, res: Response){

    const testData: testService.ITestResquest = req.body;

    const validRequest = testSchema.validate(testData);

    if(validRequest.error){
        throw {
            type: "error_bad_request",
            message: "incorrect data format"
        }
    }

    await testService.addNewTest(testData);

    res.status(201).send("new test added successfully");
}