import joi from "joi";

export const testSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    categoryId: joi.number().required(),
    disciplineId: joi.number().required(),
    teacherId: joi.number().required()
});