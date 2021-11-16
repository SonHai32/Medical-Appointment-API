import { _Insert } from './user.router';
import { Router } from "express";

const router = Router();
router.route('/user').post(_Insert)
export default router