today we have done self study of Bcrypt 
to install npm install bcrypt
Step 2: Import bcrypt

In your file (app.js, auth.js, etc.):

const bcrypt = require("bcrypt");

    const password = "myPassword123";

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
       const match = await bcrypt.compare(password, hash)