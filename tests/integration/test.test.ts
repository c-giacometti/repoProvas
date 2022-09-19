import supertest from "supertest";
import jwt from "jsonwebtoken";
import connection from "../../src/config/prisma";
import app from "../../src/app";

import { createInsertTestData, createTest, insertTest } from "../factories/testFactory";
import { createUser, insertUser } from "../factories/userFactory";

const agent = supertest(app);

describe("/tests", () => {
    beforeEach(async () => {
        await connection.$executeRaw`TRUNCATE TABLE "users"`;
        await connection.$executeRaw`TRUNCATE TABLE "tests"`;
    });

    afterAll(async () => {
        await connection.$disconnect();
    });

    describe("POST /addtest", () => {
        describe("user is authenticated and input fields are valid", () => {
            it("should return status code 201 and create test", async () => {
                const newUser = createUser();
                const insertedUser = await insertUser(newUser);
                const token = jwt.sign({ id: insertedUser.id }, process.env.JWT_SECRET as string);

                const newTest = createInsertTestData();

                const result = await agent
                    .post("/addtest")
                    .set({ Authorization: `Bearer ${token}` })
                    .send(newTest);
                expect(result.status).toBe(201);
            });
        });

        describe("invalid token", () => {
            it("should return status code 401", async () => {
                const newUser = createUser();
                const insertedUser = await insertUser(newUser);
                const token = jwt.sign({ id: insertedUser.id }, process.env.JWT_SECRET as string);

                const newTest = createInsertTestData();

                const result = await agent
                    .post("/addtest")
                    .set({ Authorization: `Bearer ` })
                    .send(newTest);
                expect(result.status).toBe(401);
            });
        });

        describe("no req body", () => {
            it("should return status code 422", async () => {
                const newUser = createUser();
                const insertedUser = await insertUser(newUser);
                const token = jwt.sign({ id: insertedUser.id }, process.env.JWT_SECRET as string);

                const newTest = {};

                const result = await agent
                    .post("/addtest")
                    .set({ Authorization: `Bearer ${token}` })
                    .send(newTest);
                expect(result.status).toBe(422);
            });
        });

        describe("category does not exist", () => {
            it("should return status code 404", async () => {
                const newUser = createUser();
                const insertedUser = await insertUser(newUser);
                const token = jwt.sign({ id: insertedUser.id }, process.env.JWT_SECRET as string);

                const newTest = createInsertTestData("invalid-category");

                const result = await agent
                    .post("/addtest")
                    .set({ Authorization: `Bearer ${token}` })
                    .send(newTest);
                expect(result.status).toBe(404);
            });
        });

    });

    describe("GET /testsbydiscipline", () => {
        describe("user is authenticated", () => {
            it("should return status code 200 and list of tests grouped by disciplines", async () => {
                const newUser = createUser();
                const insertedUser = await insertUser(newUser);
                const token = jwt.sign({ id: insertedUser.id }, process.env.JWT_SECRET as string);

                const result = await agent.get("/testsbydiscipline").set({ Authorization: `Bearer ${token}` });
                expect(result.status).toBe(200);
                expect(Array.isArray(result.body)).toBe(true);
            });
        });
    });

    describe("GET /tests?groupedBy=teachers", () => {
        describe("user is authenticated", () => {
            it("should return status code 200 and list of tests grouped by teachers", async () => {
                const newUser = createUser();
                const insertedUser = await insertUser(newUser);
                const token = jwt.sign({ id: insertedUser.id }, process.env.JWT_SECRET as string);

                const result = await agent.get("/testsbyteacher").set({ Authorization: `Bearer ${token}` });
                expect(result.status).toBe(200);
                expect(Array.isArray(result.body)).toBe(true);
            });
        });
    });
});