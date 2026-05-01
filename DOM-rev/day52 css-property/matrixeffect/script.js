// select p tag DQS add event listner mouseenter -> create a strint os Aa to Zz select para innertext ->setinterval 100 inside creater copt str of p innethtml fom outside
// and str=text.split('') this will split all char 'w','e','l','c','o','m','e'; this will form a array of char
// now apply map on it str=text.split('').map((char,idx)=>{
    // return srting which contain A-Z.split("")[floor(matt.rnd()*53)]
    //}).join("") // now console.log(str); // you will get rnd char string on same lenght of p tag wrap it in time intervle and inside it para.innerhtml=str

    let text = document.querySelector("p");
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let gen=setInterval(()=>{
        let copyletter = text.innerText.split("").map(() => letters[Math.floor(Math.random() * letters.length)]).join("");
        text.innerText=copyletter;
    },100)
    setTimeout(()=>{
        text.innerHTML=`i ammmm subhodip`;
        clearInterval(gen);
    },1000)
    
 // select p-tag name it as text 
 // save the text of p-tag as variable p-text
 // create a string A-Z and a-z ;
 // convert p-text into array and map it to letters[rnd*letters.length]).acain convert it into string .join()
 // run it inside setintervel
