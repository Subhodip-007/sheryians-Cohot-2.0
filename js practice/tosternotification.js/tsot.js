// ek function (createtoster) jo return karta ek function with parameters (message, type)
//createtoster function ka use karke hum alag alag types ke tosters bana sakte hain

let createToaster= function(){
    return function(notification){
        let div=document.createElement("div");
        div.className="fixed bottom-5 right-5 bg-gray-800 text-white px-6 py-3 rounded shadow-lg";
        div.innerText=notification;
        document.querySelector(".toast").appendChild(div);
         setTimeout(() => {
      div.remove();
    }, 2000);


    }
}
let tosters= createToaster();
setTimeout(()=>{
    tosters("This is an info message");
},5000)

tosters("This is a success message");
// with a normal function 
function toaster(notification) {
    let div = document.createElement("div");

    div.className =
        "fixed bottom-5 right-5 bg-gray-800 text-white px-6 py-3 rounded shadow-lg";

    div.innerText = notification;

    document.querySelector(".toast").appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 2000);
}

setTimeout(() => {
    toaster("last toster");
}, 10000);

toaster("This is a success message");