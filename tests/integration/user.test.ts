import supertest from "supertest";
import connection from "../../src/config/prisma";
import app from "../../src/app";

import { createUser, insertUser } from "../factories/userFactory";

const agent = supertest(app);

describe("/auth", () => {
    beforeEach(async () => {
        await connection.$executeRaw`TRUNCATE TABLE "users"`;
    });

    afterAll(async () => {
        await connection.$disconnect();
    });

    describe("POST /register", () => {
        describe("valid email and password", () => {
            it("should return status code 201 and create user account", async () => {
                const newUser = createUser();

                const result = await agent.post("/register").send({ ...newUser, confirmPassword: newUser.password });
                expect(result.status).toBe(201);

                const createdUser = await connection.user.findUnique({ where: { email: newUser.email } });
                expect(createdUser).not.toBeNull();
            });
        });

        describe("no req body", () => {
            it("should return status code 422", async () => {
                const newUser = {};

                const result = await agent.post("/register").send(newUser);
                expect(result.status).toBe(422);
            });
        });

        describe("email already registered", () => {
            it("should return status code 400", async () => {
                const newUser = createUser();
                await insertUser(newUser);

                const result = await agent.post("/register").send({ ...newUser, confirmPassword: newUser.password });
                expect(result.status).toBe(400);
            });
        });
    });


    describe("POST /login", () => {
        describe("valid email and password", () => {
            it("should return status code 200 and token", async () => {
                const newUser = createUser();
                await insertUser(newUser);

                const result = await agent.post("/login").send(newUser);
                expect(result.status).toBe(200);
                expect(typeof result.body.token).toBe("string");
            });
        });

        describe("no req body", () => {
            it("should return status code 422", async () => {
                const wrongUser = {};

                const result = await agent.post("/login").send(wrongUser);
                expect(result.status).toBe(422);
            });
        });

        describe("email not registered/wrong", () => {
            it("should return status code 401", async () => {
                const newUser = createUser();
                await insertUser(newUser);

                const wrongUser = createUser("invalid-email");

                const result = await agent.post("/login").send(wrongUser);
                expect(result.status).toBe(401);
            });
        });

        describe("wrong password", () => {
            it("should return status code 401", async () => {
                const newUser = createUser();
                await insertUser(newUser);

                const wrongUser = createUser("invalid-password");

                const result = await agent.post("/login").send(wrongUser);
                expect(result.status).toBe(401);
            });
        });
    });

});