import express from "express";
const router = express.Router();

import { signin, signup, activateAccount } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/email-activate/:token", activateAccount);
export default router;