import express from "express";
import reverse from "../controllers/reverse.js";
import { validateMessage } from "../middlewares/index.js";
var router = express.Router();

router.post("/", validateMessage, reverse);

export default router;
