import "./style.css";
// function exploreButton(){
//   const button = document.querySelector("#explore-btn");

// let buttonX = 0;
// let buttonY = 0;

// let targetX = 0;
// let targetY = 0;

// const repelDistance = 180;
// const repelStrength = 1005;

// document.addEventListener("mousemove", (e) => {
//   const rect = button.getBoundingClientRect();

//   const buttonCenterX = rect.left + rect.width / 2;
//   const buttonCenterY = rect.top + rect.height / 2;

//   const dx = buttonCenterX - e.clientX;
//   const dy = buttonCenterY - e.clientY;

//   const distance = Math.sqrt(dx * dx + dy * dy);

//   if (distance < repelDistance) {

//     // Normalize direction
//     const angle = Math.atan2(dy, dx);

//     // Stronger effect when cursor gets closer
//     const force =
//       (1 - distance / repelDistance) * repelStrength;

//     targetX = Math.cos(angle) * force;
//     targetY = Math.sin(angle) * force;

//   } else {
//     targetX = 0;
//     targetY = 0;
//   }
// });
// function animate() {

//   buttonX += (targetX - buttonX) * 0.12;
//   buttonY += (targetY - buttonY) * 0.12;

//   button.style.transform =
//     `translate3d(${buttonX}px, ${buttonY}px, 0)`;

//   requestAnimationFrame(animate);
// }

// animate();
// }
// exploreButton()

function exploreButton(){
  const button = document.querySelector("#explore-btn");
const shape = document.querySelector("#button-shape");


// --------------------------------------------------
// BUTTON SETTINGS
// --------------------------------------------------

const settings = {
  detectionRadius: 200,
  repelStrength: 350,

  // How much the shape stretches
  deformation: 100,

  // Smoothing
  smoothing: 0.12
};


// --------------------------------------------------
// ORIGINAL BUTTON GEOMETRY
// --------------------------------------------------

const original = {
  left: 10,
  right: 210,

  top: 10,
  bottom: 70,

  radius: 30
};


// --------------------------------------------------
// CURRENT POSITION
// --------------------------------------------------

let current = {
  x: 0,
  y: 0
};

let target = {
  x: 0,
  y: 0
};


// --------------------------------------------------
// CURRENT DEFORMATION
// --------------------------------------------------

let currentDeformation = {
  x: 0,
  y: 0
};

let targetDeformation = {
  x: 0,
  y: 0
};


// --------------------------------------------------
// MOUSE
// --------------------------------------------------

let mouse = {
  x: 0,
  y: 0
};


document.addEventListener("mousemove", (event) => {

  mouse.x = event.clientX;
  mouse.y = event.clientY;

});


// --------------------------------------------------
// CALCULATE BUTTON EFFECT
// --------------------------------------------------

function calculateEffect() {

  const rect = button.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;


  // Distance between cursor and button center

  const dx = mouse.x - centerX;
  const dy = mouse.y - centerY;

  const distance = Math.sqrt(
    dx * dx +
    dy * dy
  );


  // ----------------------------------------------
  // CURSOR INSIDE EFFECT AREA
  // ----------------------------------------------

  if (distance < settings.detectionRadius) {

    // Prevent division by zero

    const safeDistance = Math.max(distance, 1);


    // Direction from button → cursor

    const directionX = dx / safeDistance;
    const directionY = dy / safeDistance;


    // ------------------------------------------
    // FORCE
    // ------------------------------------------

    const force =
      1 - distance / settings.detectionRadius;


    // ------------------------------------------
    // REPEL BUTTON
    // ------------------------------------------

    target.x =
      -directionX *
      force *
      settings.repelStrength;

    target.y =
      -directionY *
      force *
      settings.repelStrength;


    // ------------------------------------------
    // DEFORM BUTTON
    // ------------------------------------------

    targetDeformation.x =
      directionX *
      force *
      settings.deformation;

    targetDeformation.y =
      directionY *
      force *
      settings.deformation;

  }

  else {

    // Return to normal

    target.x = 0;
    target.y = 0;

    targetDeformation.x = 0;
    targetDeformation.y = 0;

  }

}


// --------------------------------------------------
// CREATE SVG PATH
// --------------------------------------------------

function createButtonPath(deformX, deformY) {

  const left = original.left;
  const right = original.right;

  const top = original.top;
  const bottom = original.bottom;

  const centerY = 40;


  // ----------------------------------------------
  // Deformation
  // ----------------------------------------------

  const leftDeform =
    -deformX;

  const rightDeform =
    deformX;

  const topDeform =
    -deformY;

  const bottomDeform =
    deformY;


  return `

    M ${left + leftDeform}
      ${centerY + topDeform}

    C
      ${left - 2 + leftDeform}
      ${top + topDeform},

      ${left - 5 + leftDeform}
      ${top + topDeform},

      ${left + 30 + leftDeform}
      ${top + topDeform}


    L ${right - 30 + rightDeform}
      ${top + topDeform}


    C
      ${right + rightDeform}
      ${top + topDeform},

      ${right + rightDeform}
      ${top + 5 + topDeform},

      ${right + rightDeform}
      ${centerY + topDeform}


    C
      ${right + rightDeform}
      ${bottom - 5 + bottomDeform},

      ${right + rightDeform}
      ${bottom + bottomDeform},

      ${right - 30 + rightDeform}
      ${bottom + bottomDeform}


    L ${left + 30 + leftDeform}
      ${bottom + bottomDeform}


    C
      ${left + leftDeform}
      ${bottom + bottomDeform},

      ${left + leftDeform}
      ${bottom - 5 + bottomDeform},

      ${left + leftDeform}
      ${centerY + topDeform}


    Z

  `;
}


// --------------------------------------------------
// ANIMATION
// --------------------------------------------------

function animate() {

  // Calculate where the button should move

  calculateEffect();


  // ----------------------------------------------
  // SMOOTH POSITION
  // ----------------------------------------------

  current.x +=
    (target.x - current.x) *
    settings.smoothing;

  current.y +=
    (target.y - current.y) *
    settings.smoothing;


  // ----------------------------------------------
  // SMOOTH DEFORMATION
  // ----------------------------------------------

  currentDeformation.x +=
    (targetDeformation.x -
      currentDeformation.x) *
    settings.smoothing;

  currentDeformation.y +=
    (targetDeformation.y -
      currentDeformation.y) *
    settings.smoothing;


  // ----------------------------------------------
  // MOVE BUTTON
  // ----------------------------------------------

  button.style.transform =
    `translate3d(
      ${current.x}px,
      ${current.y}px,
      0
    )`;


  // ----------------------------------------------
  // DEFORM SVG
  // ----------------------------------------------

  shape.setAttribute(
    "d",
    createButtonPath(
      currentDeformation.x,
      currentDeformation.y
    )
  );


  requestAnimationFrame(animate);

}


// --------------------------------------------------
// START
// --------------------------------------------------

animate();


}


exploreButton()


import "./style.css";


// =========================================================
// ELEMENTS
// =========================================================

const navToggle =
  document.querySelector("#nav-toggle");

const menuPanel =
  document.querySelector("#menu-panel");

const menuLinks =
  document.querySelectorAll(".menu-item");


// =========================================================
// STATE
// =========================================================

let menuOpen = false;


// =========================================================
// OPEN MENU
// =========================================================

function openMenu() {

  menuOpen = true;

  navToggle.classList.add("active");

  menuPanel.classList.add("open");

  navToggle.setAttribute(
    "aria-label",
    "Close menu"
  );

}


// =========================================================
// CLOSE MENU
// =========================================================

function closeMenu() {

  menuOpen = false;

  navToggle.classList.remove("active");

  menuPanel.classList.remove("open");

  navToggle.setAttribute(
    "aria-label",
    "Open menu"
  );

}


// =========================================================
// TOGGLE
// =========================================================

navToggle.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    if (menuOpen) {

      closeMenu();

    } else {

      openMenu();

    }

  }
);


// =========================================================
// CLICK NAV LINK
// =========================================================

menuLinks.forEach((link) => {

  link.addEventListener(
    "click",
    () => {

      closeMenu();

    }
  );

});


// =========================================================
// ESCAPE KEY
// =========================================================

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      menuOpen
    ) {

      closeMenu();

    }

  }
);





