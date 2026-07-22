now last time we studied the how using authentication routes folder and auth.route file we create a api and use it in app.js 
- like store it in DB and then 
- add token in it using jwt_secret and jwt sign for every data and then 
- storing token  in browser stortage like cookier storage 

-- now we have created a dummy api /protected the logs req.cookie read/access cookie in short

now for login user req a new (y maybe lost expire login from different device) toke from server 
req send email password ----> chack -----> server create a new token and give it to user in consent if token is stored in browser then it can be stolen so in general token dont keet sensative data only user ID 

so out next api is login api 


now what do u understand by data base breach data leak nowfor a backend developer worst dayis data leak
now to protect your pasword we generate hash 
now what is hash 
go to md5 hash 
original string -->subhodip#4950
MD5 Hash
f535e7562586a57ee2b1e3be982b8ddf
SHA1 Hash
5dd9670dfef07ce76097be6bb5072cc3ff135d72

now hashing is a algorithm 
coverts a string into well calculated random string 
properties of hashing is 
- nts i/p give same nth o/p
- this is one way process cant be reversed 

 for this requir crypto  but this is not bcrypt

