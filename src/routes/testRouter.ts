import { Router } from "express";

import validateToken from "../middlewares/tokenMidlleware.js";
import * as testController from "../controllers/testController.js";

const router = Router();

router.post("/addtest", validateToken, testController.postTest);

export default router;