
import Document from "../models/document.model.js";
import { uploadToImageKit } from "../services/imagekit.service.js";
import { processPDF } from "../services/document-processing.service.js";
import { extractDocumentInfo } from "../services/ai.service.js";
export const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF"
            });
        }

        const uploadedFile = await uploadToImageKit(req.file);

        return res.status(200).json({
            success: true,
            message: "Document uploaded to ImageKit",
            file: uploadedFile
        });

    } catch (error) {
        console.error("Document upload error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to upload document"
        });
    }
};



export const extractDocumentText = async (req, res) => {
    try {
        const { fileUrl } = req.body;

        if (!fileUrl) {
            return res.status(400).json({
                success: false,
                message: "PDF URL is required"
            });
        }

        const extractedText = await processPDF(fileUrl);

        return res.status(200).json({
            success: true,
            message: "PDF text extracted successfully",
            extractedText
        });

    } catch (error) {
        console.error("PDF extraction error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to extract PDF text"
        });
    }
};

export const processDocument = async (req, res) => {
    try {
        const { fileUrl } = req.body;

        if (!fileUrl) {
            return res.status(400).json({
                success: false,
                message: "PDF URL is required"
            });
        }

        // Step 1: Extract text from PDF
        const extractedText = await processPDF(fileUrl);
        console.log(extractedText);
        

        // Step 2: Extract structured information using AI
        const extractedData = await extractDocumentInfo(extractedText);


        // Step 3: Return result
        return res.status(200).json({
            success: true,
            message: "Document processed successfully",
            data: extractedData
        });

    } catch (error) {
        console.error("Document processing error:", error);

        return res.status(500).json({
            success: false,
            message: "Document processing failed"
        });
    }
};



export const createDocument = async (req, res) => {
    let uploadedFile;

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF"
            });
        }

        // Step 1: Upload PDF to ImageKit
        uploadedFile = await uploadToImageKit(req.file);

        // Step 2: Create database record
        const document = await Document.create({
            originalName: req.file.originalname,
            fileUrl: uploadedFile.fileUrl,
            fileId: uploadedFile.fileId,
            status: "PROCESSING"
        });

        // Step 3: Extract PDF text
        const extractedText = await processPDF(
            uploadedFile.fileUrl
        );

        // Step 4: Extract information using AI
        const extractedData = await extractDocumentInfo(
            extractedText
        );

        // Step 5: Save extracted information
        document.extractedData = extractedData;
        document.status = "COMPLETED";

        await document.save();

        return res.status(201).json({
            success: true,
            message: "Document processed successfully",
            data: document
        });

    } catch (error) {
    console.error("Document processing failed:", error);

    if (document) {
        document.status = "FAILED";
        await document.save();
    }

    return res.status(500).json({
        success: false,
        message: "Document processing failed"
    });
}
};
