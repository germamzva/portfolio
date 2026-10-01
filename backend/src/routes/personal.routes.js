import { Router } from "express";

import PersonalInfos from "../controllers/personal.controller.js";

import { profile_storage } from "../utils/uploadPrimary.js";

const router = Router();

router.get("/", PersonalInfos.getPersonalInfo);
router.get("/primary", PersonalInfos.getPrimaryImage);
router.post(
  "/upload",
  profile_storage.single("file"),
  PersonalInfos.uploadProfilePic,
);
router.post("/create", PersonalInfos.createUpdatePersonalInfo);

export default router;
