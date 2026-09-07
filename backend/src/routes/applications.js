import { Router } from "express";
import { submitApplication, listApplications } from "../controllers/applicationsController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/", submitApplication);
router.get("/", requireAdmin, listApplications);

export default router;
