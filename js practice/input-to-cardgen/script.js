let form = document.querySelector("#userForm");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let age = document.querySelector("#age");

form.addEventListener("submit", (e) => {
  e.preventDefault();


  let card = document.createElement("div");
  card.classList.add("card");
  let cancelBtn = document.createElement("button");
cancelBtn.id = "cancel-btn"; 
let icon = document.createElement("i");
icon.classList.add("ri-close-circle-line");
cancelBtn.appendChild(icon);

 
  let nameEl = document.createElement("h3");
  nameEl.textContent = `Name: ${name.value}`;

  let emailEl = document.createElement("h3");
  emailEl.textContent = `Email: ${email.value}`;

  let ageEl = document.createElement("h3");
  ageEl.textContent = `Age: ${age.value}`;


  card.append(nameEl, emailEl, ageEl);


  document.body.append(card);


  form.reset();
});

