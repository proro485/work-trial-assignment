import { Router } from "express";
import { recognition_router } from "routes";

export const router = Router();

router.use("/recognition", recognition_router);
