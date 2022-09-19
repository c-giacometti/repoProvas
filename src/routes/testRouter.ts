import { Router } from "express";

import validateToken from "../middlewares/tokenMidlleware";
import * as testController from "../controllers/testController";

const router = Router();

router.post("/addtest", validateToken, testController.postTest);
router.get("/testsbydiscipline", testController.getTestsByDiscipline);
router.get("/testsbyteacher", testController.getTestsByTeacher);

export default router;