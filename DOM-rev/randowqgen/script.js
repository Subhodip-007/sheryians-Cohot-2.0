const johnWickQuotes = [
  "People keep asking if I'm back... yeah, I'm thinking I'm back.",
  "Yeah, I'm thinking I'm back!",
  "You stabbed the devil in the back... and forced him back into the life he just left.",
  "John is a man of focus, commitment, sheer will.",
  "They call him Baba Yaga.",
  "It's not what you did, son, that angers me so. It's who you did it to.",
  "That 'f***ing nobody'... is John Wick.",
  "I once saw him kill three men in a bar... with a pencil.",
  "No one escapes from The Continental.",
  "You working again, John?",
  "I'm not that guy anymore.",
  "You can either hand over your son... or you can die screaming alongside him!",
  "Consequences.",
  "The Boogeyman?",
  "We are not like you, John. We are professionals.",
  "Guns. Lots of guns.",
  "Tell them... tell them all... whoever comes, whoever it is... I'll kill them. I'll kill them all.",
  "This life... it follows you. It clings to you.",
  "You want a war? Or do you want to just give me a gun?",
  "Every action has consequences."
];

let text= document.querySelector("h1");
let main=document.querySelector("#main")
text.addEventListener("click",()=>{
  let T=Math.floor(Math.random()*80);
  let L=Math.floor(Math.random()*80);
//   let rect = main.getBoundingClientRect();

// let x = Math.random() * (rect.width - 100); // 100 ≈ element width buffer
// let y = Math.random() * (rect.height - 50);

// div.style.left = `${x}px`;
// div.style.top = `${y}px`;
  let rfont=Math.floor(Math.random()*5);
  let arrgen=Math.floor(Math.random()*johnWickQuotes.length);
  let div=document.createElement("p");
 div.style.cssText = `
  position: absolute;
  top: ${T}%;
  left: ${L}%;

`;
div.style.fontSize=  `${rfont}rem`;
  console.log(div)
    div.innerHTML=johnWickQuotes[arrgen]
  div.classList.add("qu")
  main.appendChild(div)

})
