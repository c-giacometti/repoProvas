import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

import authRouter from "./routes/authRouter";
import testRouter from "./routes/testRouter";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(testRouter);
app.use(errorHandler);

export default app;