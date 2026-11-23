
import express from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { createDocument, extractDocumentText, processDocument, uploadDocument } from "../controllers/document.controller.js";

export const documentRouter = express.Router();

documentRouter.post(
    "/upload",
    upload.single("document"),
    uploadDocument
);


documentRouter.post("/extract-text", extractDocumentText);
documentRouter.post("/process", processDocument);
documentRouter.post(
    "/",
    upload.single("document"),
    createDocument
);