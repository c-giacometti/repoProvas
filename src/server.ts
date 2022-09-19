import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 4000;

app.listen(process.env.PORT, () =>
    console.log("servidor rodando na porta " + process.env.PORT)
);