
import imagekit from "../config/imagekit.js";
import fs from "fs/promises";

export const uploadToImageKit = async (file) => {
    try {
        const result = await imagekit.upload({
            file: await fs.readFile(file.path),
            fileName: file.originalname,
            folder: "/docuflow"
        });

        return {
            fileId: result.fileId,
            fileUrl: result.url,
            name: result.name
        };

    } finally {
        await fs.unlink(file.path).catch(() => {});
    }
};
