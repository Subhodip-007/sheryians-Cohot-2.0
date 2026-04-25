const users = [
  { id: 1, name: "Aman", age: 21, skill: "HTML" },
  { id: 2, name: "Riya", age: 22, skill: "CSS" },
  { id: 3, name: "Karan", age: 20, skill: "JavaScript" },
  { id: 4, name: "Neha", age: 23, skill: "React" },
  { id: 5, name: "Arjun", age: 24, skill: "Node.js" },
  { id: 6, name: "Simran", age: 21, skill: "MongoDB" },
  { id: 7, name: "Rohit", age: 25, skill: "Express" },
  { id: 8, name: "Priya", age: 22, skill: "GSAP" },
  { id: 9, name: "Vikram", age: 26, skill: "Three.js" },
  { id: 10, name: "Anjali", age: 23, skill: "Git" },

  { id: 11, name: "Rahul", age: 24, skill: "GitHub" },
  { id: 12, name: "Sneha", age: 20, skill: "Bootstrap" },
  { id: 13, name: "Yash", age: 21, skill: "Tailwind" },
  { id: 14, name: "Pooja", age: 22, skill: "Redux" },
  { id: 15, name: "Dev", age: 23, skill: "Next.js" },
  { id: 16, name: "Isha", age: 24, skill: "TypeScript" },
  { id: 17, name: "Kabir", age: 25, skill: "Docker" },
  { id: 18, name: "Meera", age: 21, skill: "AWS" },
  { id: 19, name: "Varun", age: 26, skill: "Firebase" },
  { id: 20, name: "Tina", age: 22, skill: "GraphQL" },

  { id: 21, name: "Nikhil", age: 23, skill: "Python" },
  { id: 22, name: "Aditi", age: 24, skill: "Django" },
  { id: 23, name: "Sahil", age: 25, skill: "Flask" },
  { id: 24, name: "Ritu", age: 21, skill: "C++" },
  { id: 25, name: "Harsh", age: 22, skill: "Java" },
  { id: 26, name: "Kavya", age: 23, skill: "Spring" },
  { id: 27, name: "Manish", age: 24, skill: "SQL" },
  { id: 28, name: "Payal", age: 20, skill: "NoSQL" },
  { id: 29, name: "Deepak", age: 26, skill: "DevOps" },
  { id: 30, name: "Naina", age: 22, skill: "System Design" }
];
let bt6n=document.querySelector("#btn");
let display=document.querySelector("#user");
btn.addEventListener("click",function(){
  let rn=Math.floor(Math.random()*users.length);
  display.textContent=`name:${users[rn]?.name}`;
  console.log(users[rn]);
})
