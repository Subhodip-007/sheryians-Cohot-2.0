// import "dotenv/config";
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { Pinecone } from "@pinecone-database/pinecone";

// // STEP 1: Initialize Pinecone
// // Connect to Pinecone using the API key stored in the .env file.
// // Pinecone will store our documents and automatically generate embeddings.

// const pc = new Pinecone({
//     apiKey: process.env.PINECONE_API_KEY,
// });

// // STEP 2: Load PDF
// // PDFLoader reads the PDF file and extracts its text.
// // load() returns an array of Document objects.
// // Each Document contains pageContent and metadata.

// const loader = new PDFLoader("./Resume.pdf");

// const docs = await loader.load();

// console.log("PDF loaded successfully!");
// console.log("Total pages:", docs.length);

// // STEP 3: Split documents
// // chunkSize: Target maximum size of each chunk in characters.
// // chunkOverlap: Number of characters shared between consecutive chunks.
// // splitDocuments() divides the PDF into smaller Document objects.
// // Original document metadata is preserved.

// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 300,
//     chunkOverlap: 0
// });

// const chunks = await splitter.splitDocuments(docs);

// console.log(chunks, chunks.length);

// // STEP 4: Connect to Pinecone index
// // Connect to the existing index named cohort-2.
// // This index uses the Documents API and integrated embeddings.

// const index = pc.index("cohort-2");

// // STEP 5: Prepare documents for Pinecone
// // _id: Unique identifier for each document chunk.
// // title: Name of the original document.
// // chunk_text: Actual text extracted from each PDF chunk.
// // pageNumber: Original PDF page number.
// //
// // Pinecone automatically generates embeddings from chunk_text
// // using the configured llama-text-embed-v2 model.
// // We do not need to generate embeddings manually using Mistral.

// const records = chunks.map((chunk, i) => ({
//     _id: `resume-chunk-${i}`,
//     title: "Subhodip Resume",
//     chunk_text: chunk.pageContent,
//     pageNumber: chunk.metadata.loc?.pageNumber ?? null
// }));

// console.log("Total records:", records.length);

// // STEP 6: Store documents in Pinecone
// // documents.upsert() uploads documents to the schema-based index.
// // Pinecone generates embeddings automatically from chunk_text.
// // Each document is stored with its ID, title, text and page number.

// const result = await index.documents.upsert({
//     documents: records
// });

// console.log("Documents successfully stored in Pinecone!");
// console.log("Upserted documents:", result.upsertedCount);


// approch -1 
import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from "@pinecone-database/pinecone";

// STEP 1: Initialize Pinecone
// Connect to Pinecone using the API key stored in the .env file.

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

// STEP 2: Initialize embedding model
// Mistral converts text into numerical vectors.
// These vectors represent the semantic meaning of the text.

const embeddings = new MistralAIEmbeddings({
    model: "mistral-embed",
    apiKey: process.env.MISTRAL_API_KEY,
});

// STEP 3: Load PDF
// PDFLoader reads the PDF file and extracts its text.
// load() returns an array of Document objects.
// Each Document contains pageContent and metadata.

const loader = new PDFLoader("./Resume.pdf");

const docs = await loader.load();

// console.log("PDF loaded successfully!");
// console.log("Total pages:", docs.length);

// STEP 4: Split documents
// chunkSize: Target maximum size of each chunk in characters.
// chunkOverlap: Number of characters shared between consecutive chunks.
// splitDocuments() divides the PDF into smaller Document objects.

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 0
});

const chunks = await splitter.splitDocuments(docs);

// console.log(chunks, chunks.length);

// STEP 5: Extract text from chunks
// Each chunk is a Document object.
// pageContent contains the actual extracted text.
// map() extracts pageContent from every chunk.
// Mistral embeddings expects an array of strings.

const texts = chunks.map((chunk) => chunk.pageContent);

// STEP 6: Generate embeddings
// embedDocuments() converts each text chunk into a numerical vector.
// Each vector represents the semantic meaning of its corresponding text.

const emb = await embeddings.embedDocuments(texts);

// console.log("Total embeddings:", emb.length);
// console.log("First embedding:", emb[0]);
// console.log("Vector dimensions:", emb[0].length);

// STEP 7: Connect to Pinecone index
// Connect to your newly created traditional vector index.
// Index dimension must be 1024 and metric must be cosine.

const index = pc.index("resume-mistral-vectors");

// STEP 8: Prepare vectors for Pinecone
// id: Unique identifier for each chunk.
// values: Numerical embedding generated by Mistral.
// metadata: Original text and page number.

const records = chunks.map((chunk, i) => ({
    id: `resume-chunk-${i}`,
    values: emb[i],
    metadata: {
        text: chunk.pageContent,
        pageNumber: chunk.metadata.loc?.pageNumber ?? null
    }
}));

// STEP 9: Store vectors in Pinecone
// upsert() inserts new vectors or updates existing vectors
// with matching IDs.

// await index.upsert({
//     records
// });

// console.log("Embeddings successfully stored in Pinecone!");
// after data is gon into vector store 
////////////////////////////////////////////
// STEP 7: Connect to Pinecone index
// Connect to the index where embeddings are stored.

// STEP 10: Generate query embedding
// Convert the user's question into a numerical vector.

const queryEmbading = await embeddings.embedQuery(
    "What is the tech stack?"
);

// STEP 11: Retrieve similar vectors
// topK: Retrieve the 2 most similar chunks.
// includeMetadata: Include original text in the results.

const result = await index.query({
    vector: queryEmbading,
    topK: 2,
    includeMetadata: true
});

// STEP 12: Display retrieved results

console.log(result);
result.matches.forEach((match, i) => {
    console.log(`\nResult ${i + 1}`);

    console.log("ID:", match.id);
    console.log("Similarity Score:", match.score);
    console.log("Page Number:", match.metadata.pageNumber);
    console.log("Content:", match.metadata.text);
});