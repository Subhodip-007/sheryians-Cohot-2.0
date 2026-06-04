

const users = [
  {
    name: "andreu",
    pic: "https://i.pinimg.com/736x/47/59/fc/4759fca116fc05d1af6cc39276a2786a.jpg",
    bio: "silent chaos in a loud world 🖤🌌 | not for everyone"
  },
  {
    name: "max verstappen",
    pic: "https://i.pinimg.com/736x/ce/3b/3e/ce3b3e47e98f4a218a872008b23df6e8.jpg",
    bio: "main character energy ☕ | coffee > everything ✨🌸"
  },
  {
    name: "krix",
    pic: "https://i.pinimg.com/1200x/8c/ce/18/8cce182b71c5d65d45922f5cf36a694b.jpg",
    bio: "walking through dreams ☁️✨ | late night thinker"
  },
  {
    name: "andrau",
    pic: "https://i.pinimg.com/736x/5a/8c/3b/5a8c3b6f4dfc68a2b2e021d0d56a50d3.jpg",
    bio: "exploring life one adventure at a time 🌍 | photography lover 📸"
  },
  {
    name: "artuse",
    pic: "https://i.pinimg.com/736x/1a/f8/d0/1af8d0641c37867d166b235922d93874.jpg",
    bio: "music on, world off 🎧 | chasing sunsets 🌅"
  }
];
// sare user show karna hai
// filter karna hai har baar input pe 
// filtered uer show karna hai
// for create fnc(arr)
function showuser(arr){
  arr.forEach(users => {
   // Create main card container
const card = document.createElement("div");
card.classList.add("card");

// Create image
const img = document.createElement("img");
img.src = users.pic;
img.classList.add("bg-img");

// Create blurred layer
const blurredLayer = document.createElement("div");
blurredLayer.classList.add("blurred-layer");

// Create content container
const content = document.createElement("div");
content.classList.add("content");

// Create heading
const heading = document.createElement("h3");
heading.textContent = users.name;

// Create paragraph
const para = document.createElement("p");
para.textContent = users.bio;

// Append heading and paragraph to content
content.appendChild(heading);
content.appendChild(para);

// Append children to card
card.appendChild(img);
card.appendChild(blurredLayer);
card.appendChild(content);

// Finally append card to body (or any container)
document.querySelector(".card").appendChild(card);

    
  });
}
let input=document.querySelector(".index");
input.addEventListener("input",()=>{
let filterd=users.filter((users)=>{
return users.name.toLowerCase().startsWith(input.value.toLowerCase())
});
document.querySelector(".card").innerHTML = "";
showuser(filterd);
})