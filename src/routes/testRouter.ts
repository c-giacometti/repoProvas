import { Router } from "express";

import validateToken from "../middlewares/tokenMidlleware.js";
import * as testController from "../controllers/testController.js";

const router = Router();

router.post("/addtest", validateToken, testController.postTest);
router.get("/testsbydiscipline", testController.getTestsByDiscipline);
router.get("/testsbyteacher", testController.getTestsByTeacher);

export default router;