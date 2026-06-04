const form = document.querySelector('form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const conpassword = document.querySelector('#confirmPassword');

// Get error message elements
const usernameError = document.querySelector('#usernameerror');
const emailError = document.querySelector('#emailerror');
const passwordError = document.querySelector('#passworderror');
const conpasswordError = document.querySelector('#conpassworderror');

form.addEventListener("submit", (dets) => {
    dets.preventDefault();

    let isValid = true;

    // Regex patterns
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const username_regex = /^[a-zA-Z0-9._-]{3,16}$/;
    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // --- Username Validation ---
    if (username.value.trim() === "") {
        usernameError.textContent = "Username is required";
        usernameError.style.display = "initial";
        isValid = false;
    } else if (!username_regex.test(username.value)) {
        usernameError.textContent = "Invalid username (3-16 chars, letters, numbers, . _ -)";
        usernameError.style.display = "initial";
        isValid = false;
    } else {
        usernameError.style.display = "none";
    }

    // --- Email Validation ---
    if (email.value.trim() === "") {
        emailError.textContent = "Email is required";
        emailError.style.display = "initial";
        isValid = false;
    } else if (!email_regex.test(email.value)) {
        emailError.textContent = "Invalid email address";
        emailError.style.display = "initial";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // --- Password Validation ---
    if (password.value.trim() === "") {
        passwordError.textContent = "Password is required";
        passwordError.style.display = "initial";
        isValid = false;
    } else if (!password_regex.test(password.value)) {
        passwordError.textContent = "Password must be 8+ chars with uppercase, lowercase, number, and special character.";
        passwordError.style.display = "initial";
        isValid = false;
    } else {
        passwordError.style.display = "none";
    }

    // --- Confirm Password Validation ---
    if (conpassword.value.trim() === "") {
        conpasswordError.textContent = "Please confirm your password";
        conpasswordError.style.display = "initial";
        isValid = false;
    } else if (password.value !== conpassword.value) {
        conpasswordError.textContent = "Passwords do not match";
        conpasswordError.style.display = "initial";
        isValid = false;
    } else {
        conpasswordError.style.display = "none";
    }

    if (isValid) {
        alert("Form submitted successfully!");
        // You can submit the form here if needed, e.g., form.submit();
        // Or use fetch() to send the data to a server.
        form.reset();
    }
});