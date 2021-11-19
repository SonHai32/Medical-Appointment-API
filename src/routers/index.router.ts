import { Router } from "express";
import userRouter from "./user.router";
import patientRecordRouter from "./patientRecord.router";

const router = Router();
router.use("/user", userRouter);
router.use("/patient-record", patientRecordRouter);
export default router;
