import connection from "../src/config/prisma.js";

async function main() {
    await connection.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
    await connection.$executeRaw`TRUNCATE TABLE categories RESTART IDENTITY CASCADE`;
    await connection.$executeRaw`TRUNCATE TABLE disciplines RESTART IDENTITY CASCADE`;
    await connection.$executeRaw`TRUNCATE TABLE teachers RESTART IDENTITY CASCADE`;
    await connection.$executeRaw`TRUNCATE TABLE terms RESTART IDENTITY CASCADE`;
    await connection.$executeRaw`TRUNCATE TABLE "teachersDisciplines" RESTART IDENTITY CASCADE`;
    await connection.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY CASCADE;`;
  
    await connection.$executeRaw`INSERT INTO terms ("number") VALUES (1);`;
    await connection.$executeRaw`INSERT INTO terms ("number") VALUES (2);`;
    await connection.$executeRaw`INSERT INTO terms ("number") VALUES (3);`;
    await connection.$executeRaw`INSERT INTO terms ("number") VALUES (4);`;
    await connection.$executeRaw`INSERT INTO terms ("number") VALUES (5);`;
    await connection.$executeRaw`INSERT INTO terms ("number") VALUES (6);`;
  
    await connection.$executeRaw`INSERT INTO categories ("name") VALUES ('Projeto');`;
    await connection.$executeRaw`INSERT INTO categories ("name") VALUES ('Prática');`;
    await connection.$executeRaw`INSERT INTO categories ("name") VALUES ('Recuperação');`;
  
    await connection.$executeRaw`INSERT INTO teachers ("name") VALUES ('Diego Pinho');`;
    await connection.$executeRaw`INSERT INTO teachers ("name") VALUES ('Bruna Hamori');`;
  
    await connection.$executeRaw`INSERT INTO disciplines ("name", "termId") VALUES ('HTML e CSS', 1);`;
    await connection.$executeRaw`INSERT INTO disciplines ("name", "termId") VALUES ('JavaScript', 2);`;
    await connection.$executeRaw`INSERT INTO disciplines ("name", "termId") VALUES ('React', 3);`;
    await connection.$executeRaw`INSERT INTO disciplines ("name", "termId") VALUES ('Humildade', 1);`;
    await connection.$executeRaw`INSERT INTO disciplines ("name", "termId") VALUES ('Planejamento', 2);`;
    await connection.$executeRaw`INSERT INTO disciplines ("name", "termId") VALUES ('Autoconfiança', 3);`;
  
    await connection.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 1);`;
    await connection.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 2);`;
    await connection.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (1, 3);`;
    await connection.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 4);`;
    await connection.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 5);`;
    await connection.$executeRaw`INSERT INTO "teachersDisciplines" ("teacherId", "disciplineId") VALUES (2, 6);`;
}
  
main()
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
    .finally(() => connection.$disconnect());