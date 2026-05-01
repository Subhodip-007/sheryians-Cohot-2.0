
// const audioCache = {
//   c: new Audio("basicnodes/C3.mp3"),
//   d: new Audio("basicnodes/D3.mp3"),
//   e: new Audio("basicnodes/E3.mp3"),
//   f: new Audio("basicnodes/F3.mp3"),
//   g: new Audio("basicnodes/G3.mp3"),
//   a: new Audio("basicnodes/A3.mp3"),
//   b: new Audio("basicnodes/B3.mp3")
// };

document.addEventListener("keydown", (e) => {
 if(e.key=="a"){
  let aud = new Audio("basicnodes/A3.mp3")
  aud.play();
 }else if(e.key=="b"){
  let aud = new Audio("basicnodes/B3.mp3")
  aud.play();

 } else if(e.key=="c"){
  let aud = new Audio("basicnodes/C3.mp3")
  aud.play();

 }  else if(e.key=="d"){
  let aud = new Audio("basicnodes/D3.mp3")
  aud.play();

 }  else if(e.key=="e"){
  let aud = new Audio("basicnodes/E3.mp3")
  aud.play();

 } 
 else if(e.key=="f"){
  let aud = new Audio("basicnodes/F3.mp3")
  aud.play();

 } else if(e.key=="g"){
  let aud = new Audio("basicnodes/G3.mp3")
  aud.play();

 } 
});