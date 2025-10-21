const form = document.querySelector(".login-form");
const email = document.querySelector("#loginEmail");
const password = document.querySelector("#loginPassword");
const eyeIcon = document.querySelector(".login-eye-icon");
const loginBtn = document.querySelector("#loginBtn");

// Style for invalid & valid fields
const invalidStyle = "2px solid #90363fff";
const validStyle = "2px solid #227e2aff";

// Validate email (must be Gmail)
function validateEmail(input) {
    const emailValue = input.value.trim().toLowerCase();

    if (!emailValue.endsWith("@gmail.com")) {
        input.style.outline = invalidStyle;
        input.setCustomValidity("Only Gmail addresses are allowed");
        return false;
    } else {
        input.style.outline = "";
        input.setCustomValidity("");
        return true;
    }
}

// Validate password (min 8 chars)
function validatePassword(input) {
    const passwordValue = input.value;

    if (passwordValue.length < 8) {
        input.style.outline = invalidStyle;
        input.setCustomValidity("Password must be at least 8 characters long");
        return false;
    } else {
        input.style.outline = "";
        input.setCustomValidity("");
        return true;
    }
}

// Toggle password visibility
eyeIcon.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
});

// Real-time validation
email.addEventListener("input", () => validateEmail(email));
password.addEventListener("input", () => validatePassword(password));

// Handle form submission
form.addEventListener("submit", e => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
        const loginData = {
            email: email.value.trim(),
            password: password.value,
        };

        postLoginData(loginData);
    } else {
        if (!isEmailValid) email.reportValidity();
        else if (!isPasswordValid) password.reportValidity();
    }
});

async function postLoginData(data) {
    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        let parsedData;
        try {
            parsedData = await response.json();
        } catch {
            parsedData = { message: "Invalid server response format" };
        }

        if (!response.ok) {
            if (parsedData?.field === "email") {
                email.style.outline = invalidStyle;
                email.setCustomValidity("Email not found");
                email.reportValidity();
            } else if (parsedData?.field === "password") {
                password.style.outline = invalidStyle;
                password.setCustomValidity("Incorrect password");
                password.reportValidity();
            }
            throw new Error(parsedData.message || `Server error: ${response.status}`);
        }

        // Clear styles and show success
        [email, password].forEach(input => {
            input.setCustomValidity("");
            input.style.outline = validStyle;
        });

        console.log("✅ Login success:", parsedData);

        Swal.fire({
            title: "Login successful",
            icon: "success",
            confirmButtonText: "Continue",
            draggable: true,
        }).then(r => {
            if (r.isConfirmed) {
                window.location.href = "/tasks"; // redirect to tasks page
            }
        });
    } catch (e) {
        console.error("Cannot log in:", e.message);
    }
}
