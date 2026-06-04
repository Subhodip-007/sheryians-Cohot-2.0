const passwordInput = document.querySelector("#password");
const strengthBar = document.querySelector("#strength-bar");
const strengthText = document.querySelector("#strength-text");


passwordInput.addEventListener("input", (dets) => {
    const password = dets.target.value;
    function evaluatePasswordStrength(pass) {
        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[a-z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        if (/[\W]/.test(pass)) strength++;
        return strength;
    }

    const strength = evaluatePasswordStrength(password);
   
    strengthText.innerHTML=`strength: ${strength}/5`;
    strengthBar.style.width = `${(strength / 5) * 100}%`;

    if (strength <= 2) {
        strengthBar.style.backgroundColor = "red";
    } else if (strength === 3) {
        strengthBar.style.backgroundColor = "orange";
    } else if (strength === 4) {
        strengthBar.style.backgroundColor = "yellow";
    } else {
        strengthBar.style.backgroundColor = "green";
    }



    
});