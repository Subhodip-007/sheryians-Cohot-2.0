const users = [
  {
    id: 1,
    name: "Aarav Sharma",
    username: "aarav01",
    email: "aarav.sharma@example.com",
    age: 21,
    isActive: true,
    role: "student",
    skills: ["HTML", "CSS", "JavaScript"],
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "Diya Verma",
    username: "diya.codes",
    email: "diya.verma@example.com",
    age: 23,
    isActive: true,
    role: "frontend developer",
    skills: ["React", "CSS", "GSAP"],
    profileImg: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 3,
    name: "Rohan Gupta",
    username: "rohan_dev",
    email: "rohan.gupta@example.com",
    age: 24,
    isActive: false,
    role: "backend developer",
    skills: ["Node.js", "Express", "MongoDB"],
    profileImg: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    username: "sneha.design",
    email: "sneha.kapoor@example.com",
    age: 22,
    isActive: true,
    role: "UI/UX designer",
    skills: ["Figma", "Adobe XD", "CSS"],
    profileImg: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: 5,
    name: "Karan Mehta",
    username: "karan007",
    email: "karan.mehta@example.com",
    age: 25,
    isActive: true,
    role: "full stack developer",
    skills: ["MERN", "Docker", "Git"],
    profileImg: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    id: 6,
    name: "Ananya Singh",
    username: "ananya.dev",
    email: "ananya.singh@example.com",
    age: 20,
    isActive: false,
    role: "student",
    skills: ["JavaScript", "Tailwind", "GitHub"],
    profileImg: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    id: 7,
    name: "Vikram Patel",
    username: "vikram.codes",
    email: "vikram.patel@example.com",
    age: 26,
    isActive: true,
    role: "devops engineer",
    skills: ["AWS", "Docker", "CI/CD"],
    profileImg: "https://randomuser.me/api/portraits/men/7.jpg"
  },
  {
    id: 8,
    name: "Neha Joshi",
    username: "nehaj",
    email: "neha.joshi@example.com",
    age: 23,
    isActive: true,
    role: "frontend developer",
    skills: ["Vue", "CSS", "JavaScript"],
    profileImg: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    id: 9,
    name: "Aditya Rao",
    username: "adi_rao",
    email: "aditya.rao@example.com",
    age: 27,
    isActive: false,
    role: "backend developer",
    skills: ["Python", "Django", "PostgreSQL"],
    profileImg: "https://randomuser.me/api/portraits/men/9.jpg"
  },
  {
    id: 10,
    name: "Pooja Nair",
    username: "pooja.dev",
    email: "pooja.nair@example.com",
    age: 22,
    isActive: true,
    role: "mobile developer",
    skills: ["React Native", "Flutter", "Firebase"],
    profileImg: "https://randomuser.me/api/portraits/women/10.jpg"
  }
];
let main=document.querySelector("#main");
let forge="";
users.forEach(val => {
  forge+=`   <div class="card">
            <img src="${val.profileImg}" alt="no img">
            <div class="text-group">
            <h1 class="name">Name: ${val.name}</h1>
            <div class="role"><h1>Role: ${val.role}</h1></div>
            <div class="age"><h1>Age: ${val.age}</h1></div>
            <div class="isactive">Active: ${val.isActive}</div>
            </div>
            </div>
            `
});
main.innerHTML=forge;