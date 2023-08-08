import { get_recognitions } from "controllers/recognition";
import { Router } from "express";

export const recognition_router = Router();

recognition_router.get("/", get_recognitions);
