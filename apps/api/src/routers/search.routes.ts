import express from "express";
import { searchProperties } from "@/controllers/search.controller";
import { searchAlternate } from "@/controllers/search.alternate";

const router = express.Router();

// Endpoint untuk mencari properti berdasarkan form input
router.get("/search", searchAlternate);


export default router;