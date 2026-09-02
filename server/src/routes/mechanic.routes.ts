import express from "express";
import { getMechanicById, getMechanics } from "../controllers/mechanic.controller";

const router = express.Router();

router.get("/", getMechanics);
router.get("/:id", getMechanicById);

export default router;
