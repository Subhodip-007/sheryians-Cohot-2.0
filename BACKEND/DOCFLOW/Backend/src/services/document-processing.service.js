
import axios from "axios";
import { extractPDFText } from "./pdf.service.js";

export const processPDF = async (fileUrl) => {

    const response = await axios.get(fileUrl, {
        responseType: "arraybuffer",
        timeout: 30000
    });

    const pdfBuffer = Buffer.from(response.data);

    const extractedText = await extractPDFText(pdfBuffer);

    if (!extractedText.trim()) {
        throw new Error("No readable text found in PDF");
    }

    return extractedText;
};
