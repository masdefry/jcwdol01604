import express from "express";
import { searchProperties } from "@/controllers/filter.controller";

const router = express.Router();

// Endpoint untuk mencari properti berdasarkan form input
router.get("/search", searchProperties);

export default router;