// select p tag DQS add event listner mouseenter -> create a strint os Aa to Zz select para innertext ->setinterval 100 inside creater copt str of p innethtml fom outside
// and str=text.split('') this will split all char 'w','e','l','c','o','m','e'; this will form a array of char
// now apply map on it str=text.split('').map((char,idx)=>{
    // return srting which contain A-Z.split("")[floor(matt.rnd()*53)]
    //}).join("") // now console.log(str); // you will get rnd char string on same lenght of p tag wrap it in time intervle and inside it para.innerhtml=str

    let tex = document.querySelector("p");
     let savetext=tex.innerText;
    function randomtextgen(){
        let iteration=0;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let gen=setInterval(()=>{
        let copyletter = savetext.split("").map((cha,idx) => {return idx < iteration
      ? cha
      : letters[Math.floor(Math.random() * letters.length)];}).join("");
        tex.innerText=copyletter;
        iteration+=.5;
    },100)
    setTimeout(()=>{
        clearInterval(gen);
    },10000)

 }
 tex.addEventListener("mouseenter",()=>{
    randomtextgen(tex);
 })

    
 // select p-tag name it as text 
 // save the text of p-tag as variable p-text
 // create a string A-Z and a-z ;
 // convert p-text into array and map it to letters[rnd*letters.length]).acain convert it into string .join()
 // run it inside setintervel
 // now logic in we need to rnd it from left to right and the org text return 
 //  create a variable name iteration as 0 outside function
 // and inside fuinction iteration increases with every time intervle to +=.2 
 // now in map char,idx -> befor it return th rendom str it sets the org char in every intervle with the help of iteration
