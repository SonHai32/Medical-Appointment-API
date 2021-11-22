import { Router } from "express";
import { _getAll } from "../controllers/Ward.controller";

const router = Router();

router.route("/").get(_getAll);

export default router;
