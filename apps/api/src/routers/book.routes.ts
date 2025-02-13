import express from "express";
import { bookRoom } from "@/controllers/book.controller";

const router = express.Router();
router.post("/controller", bookRoom);

export default router;