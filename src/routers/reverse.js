import express from "express";
import reverse from "../controllers/reverse.js";
var router = express.Router();

router.post("/", reverse);

export default router;
