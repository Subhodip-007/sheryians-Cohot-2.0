Day -30
 today we will frontend intregration of authentication with mudify 
 and api to upload songs 
 we will follow four layer architecture
 UI --> {used for UI and navigation (pages , component)folder }
 Hooks -->{state and api layer manage krrna}[hooks]folder
 state -->{frontend mai data store krrna {auth.context.jsx , post.context.jsx}file}
 API --> {backend se communicate krrne ke liya servises folder(auth.api.js)}

 so now auth ----> pages ---> login.jsx --> register.jsx  only file
 -- > now we will create app.router.js 
 ---> create all routes 
 ----> export 
 and in appjsx using router provider routes
 now we will setup scss sass package 
 feature --> shared -> styles -> global.scss
 link using Link tap register and login 
 we have completerd one layer UI layer 

 API layer => now we have handled four api  in frontend 
 register 
 login 
 getMe
 logout 
 state layer => import createcontext
 crate a auth provider function 
 inside use state on data u need 
 reture auntcontext.provier valuer

 and then in app.js user authprovider

 now HOOKS layer 
 = handle functions 

 now will will add functions to our pages 