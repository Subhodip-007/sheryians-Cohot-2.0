How to run sccript ontside the browser 
- till now every output was in browser
- u need Node.js
- file index.js
-- run index.js  {using Node.js } node filename this is outside browse run
- what are packages ?
-- ek aaise code which someone else has writen but pubcily avilable to use 
-- {npmjs.com}
- how to instrall and how to use 
- go and search  cat me to understan how a package can be used outside browser
so to bring this package code to our system we instrall npm i package name
 -- now before instrall npm init
 -- to use a functionalities of thi package we requir the package
 -- now lets understand 
 -- package.json -- it tell the your code in index.js depends on which whick packages are mentioned
 -- node-module -- now the code the u have instralled to use comes inside this folder
  now inside node-module a cat-me folder inside it a package.json -- dependencies yags --- yags folder --- packagejson ---- dependencies camelcase-- in independent 
  Project
 └── depends on cat-me
       └── cat-me depends on yargs
             └── yargs depends on camelcase
 -- package-lock-- so to manage all dependencies
 - packagejson ONLY the package depend on 


--what SERVER ?
- ek machine that have own OS RAM PROcesson storege
- so how diff from our machine (it is programed in such way ek it handles only req and res)

- now create server using express
- we start with npm init -y creates a package.json that say that this folder will be use to create a nodejs application / server 
// now we will create a server for that me need a package 
// express --- helps in making server easily 
//  now create a file app.js 
// require express