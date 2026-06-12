import { Router } from "express";
import { getJoke } from "../controllers/joke.controller.js";
import { USER_NAME } from "../config/env.js";

const router = Router();
// GET /api/yourname/joke?word=school
router.get(`/${USER_NAME}/joke`, getJoke);

export default router;
