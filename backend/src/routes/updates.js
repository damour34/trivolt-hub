import { Router } from "express";
import { listUpdates, createUpdate, deleteUpdate } from "../controllers/updatesController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", listUpdates);
router.post("/", requireAdmin, createUpdate);
router.delete("/:id", requireAdmin, deleteUpdate);

export default router;
