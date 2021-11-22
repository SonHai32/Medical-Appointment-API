import { Router } from "express";
import { _getAll } from "../controllers/District.controller";

const router = Router();
router.route("/").get(_getAll);

export default router;
