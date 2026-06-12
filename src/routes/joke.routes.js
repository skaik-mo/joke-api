import { Router } from "express";
import { getJoke } from "../controllers/joke.controller.js";

const router = Router();
const userName = "mohammed-skaik";
// GET /api/yourname/joke?word=school
router.get(`/${userName}/joke`, getJoke);

export default router;
