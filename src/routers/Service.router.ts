import { Router } from "express";
import { _add } from "../controllers/Service.controller";

const router = Router();

router.route("/").post(_add);

export default router;
