import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

// Create a traditional vector index.
// dimension and metric automatically configure the reserved _values field.

await pc.indexes.create({
    name: "resume-mistral-vectors",
    dimension: 1024,
    metric: "cosine",
    spec: {
        serverless: {
            cloud: "aws",
            region: "us-east-1"
        }
    },
    waitUntilReady: true
});

console.log("Traditional vector index created successfully!");