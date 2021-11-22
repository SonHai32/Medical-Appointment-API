import { Router } from "express";
import { _getALl } from "../controllers/Gender.controller";

const router = Router();
router.route("/").get(_getALl);

export default router;
