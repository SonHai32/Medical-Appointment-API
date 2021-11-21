import { Router } from "express";
import { _getAll } from "../controllers/Country.controller";

const router = Router();
router.route("/").get(_getAll);
