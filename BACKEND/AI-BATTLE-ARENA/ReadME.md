# install packeges 
npm inti -y
npm i -D typescript tsx
npx tsc --init
 npm i express
npm i -D@types/express
# setup tsconfig
- rootdir "."
# setup package.json
- type module
- script dev - tsx server.ts

# setup src 
app.ts and server.ts like u do (in import we use .js file)

- health check api 

-  now we will work on nodes that we thought of in diagram 

- instrall LL of google langchain 
- . env google api key 
- mistral API key 
- cohere API key 

# setup config 
type config = {
    readonly NAME : string;
}

export const cofig:CONFIG = {
    NAME : process.env.
}

# services 
model.service.ts

setup all three model 


# something new to learn 
- grap.ai.service.ts