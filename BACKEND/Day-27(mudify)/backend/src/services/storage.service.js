const imgKit = require("@imagekit/nodejs").default;

const client = new imgKit({
    privateKey: process.env.IMGKIT_PVT_KEY
});

async function uplaodFile({ buffer, fileName, folder = "" }) {
    const file = await client.files.upload({
        file: await imgKit.toFile(buffer),
        fileName: fileName,
        folder
    });

    return file;
}

module.exports = { uplaodFile };