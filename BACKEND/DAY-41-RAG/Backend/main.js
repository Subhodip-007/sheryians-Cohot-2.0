

import { PDFLoader } from
    "@langchain/community/document_loaders/fs/pdf";

const loader = new PDFLoader("./Resume.pdf");

const docs = await loader.load();

console.log("PDF loaded successfully!");
console.log("Total pages:", docs.length);

console.log(docs);
