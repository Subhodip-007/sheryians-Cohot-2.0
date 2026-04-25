const transformers = [
  {
    name: "Optimus Prime",
    type: "Autobot",
    color: "red",
    bgColor: "#1f2937",
    vehicleMode: "truck",
    powerLevel: 95
  },
  {
    name: "Bumblebee",
    type: "Autobot",
    color: "yellow",
    bgColor: "#facc15",
    vehicleMode: "car",
    powerLevel: 85
  },
  {
    name: "Megatron",
    type: "Decepticon",
    color: "gray",
    bgColor: "#6b7280",
    vehicleMode: "jet",
    powerLevel: 98
  },
  {
    name: "Starscream",
    type: "Decepticon",
    color: "red",
    bgColor: "#ef4444",
    vehicleMode: "jet",
    powerLevel: 88
  },
  {
    name: "Ironhide",
    type: "Autobot",
    color: "black",
    bgColor: "#111827",
    vehicleMode: "truck",
    powerLevel: 90
  },
  {
    name: "Ratchet",
    type: "Autobot",
    color: "white",
    bgColor: "#e5e7eb",
    vehicleMode: "ambulance",
    powerLevel: 80
  },
  {
    name: "Soundwave",
    type: "Decepticon",
    color: "blue",
    bgColor: "#2563eb",
    vehicleMode: "communication van",
    powerLevel: 87
  },
  {
    name: "Shockwave",
    type: "Decepticon",
    color: "purple",
    bgColor: "#7c3aed",
    vehicleMode: "tank",
    powerLevel: 92
  },
  {
    name: "Grimlock",
    type: "Autobot",
    color: "gold",
    bgColor: "#ca8a04",
    vehicleMode: "dinosaur",
    powerLevel: 93
  },
  {
    name: "Arcee",
    type: "Autobot",
    color: "pink",
    bgColor: "#f472b6",
    vehicleMode: "bike",
    powerLevel: 82
  }
];
let main=document.querySelector("#main");
let card=document.querySelector(".card");
let text=document.querySelector(".name");
let btn=document.querySelector(".btn");
btn.addEventListener("click",()=>{
    let rn=Math.floor(Math.random()*transformers.length);
    text.textContent=transformers[rn].name;
    card.style.backgroundColor=`${transformers[rn].color}`;
    main.style.backgroundColor=`${transformers[rn].bgColor}`
})