const form = document.querySelector("form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const eyeIcon = document.querySelector(".eye-icon");
const checkbox = document.querySelector('input[type="checkbox"]');
const submitBtn = document.querySelector("#submitBtn");

// Style for invalid fields
const invalidStyle = "2px solid #90363fff";
const validStyle = "2px solid #227e2aff";

// Function to validate name (min 3 chars, English letters only)
function validateName(input) {
    const name = input.value.trim();
    const englishLettersOnly = /^[A-Za-z-]+$/;

    if (name.length < 3) {
        input.style.outline = invalidStyle;
        input.setCustomValidity("Name must be at least 3 characters long");
        return false;
    } else if (!englishLettersOnly.test(name)) {
        input.style.outline = invalidStyle;
        input.setCustomValidity("Only English letters are allowed");
        return false;
    } else {
        input.style.outline = "";
        input.setCustomValidity("");
        return true;
    }
}

// Function to validate email (must be Gmail)
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

// Function to validate checkbox
function validateCheckbox(input) {
    if (!input.checked) {
        input.style.outline = invalidStyle;
        input.setCustomValidity("You must agree to the terms & conditions");
        return false;
    } else {
        input.style.outline = "";
        input.setCustomValidity("");
        return true;
    }
}

// Function to validate password (min 8 chars)
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

// Add input event listeners for real-time validation
firstName.addEventListener("input", () => validateName(firstName));
lastName.addEventListener("input", () => validateName(lastName));
email.addEventListener("input", () => validateEmail(email));
password.addEventListener("input", () => validatePassword(password));
checkbox.addEventListener("change", () => validateCheckbox(checkbox));

// Form submission handler
form.addEventListener("submit", e => {
    e.preventDefault();

    // Validate all fields
    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isCheckboxValid = validateCheckbox(checkbox);

    // If all validations pass
    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isCheckboxValid) {
        // Create form data object
        const formData = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            password: password.value,
            termsAndConditions: isCheckboxValid,
        };
        // Log the form data object
        postDataToServer(formData);
    } else {
        // Show the first invalid input's error message
        if (!isFirstNameValid) firstName.reportValidity();
        else if (!isLastNameValid) lastName.reportValidity();
        else if (!isEmailValid) email.reportValidity();
        else if (!isPasswordValid) password.reportValidity();
        else if (!isCheckboxValid) checkbox.reportValidity();
    }
});

async function postDataToServer(data) {
    try {
        const response = await fetch("/api/users/signup", {
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
            // if res not json
            parsedData = { message: "Invalid server response format" };
        }

        if (!response.ok) {
            if (parsedData?.field === "email") {
                email.style.outline = invalidStyle;
                email.setCustomValidity("Email already registered try to log in");
                email.reportValidity();
            }
            throw new Error(parsedData.message || `Server error: ${response.status}`);
        }

        [email, password, firstName, lastName, checkbox].forEach(input => {
            email.style.outline = validStyle;
            input.setCustomValidity("");
            input.style.outline = "";
        });

        console.log("✅ Success:", parsedData);
        Swal.fire({
            title: "Registered successfully",
            icon: "success",
            draggable: true,
            confirmButtonText: "active now",
        }).then(r => {
            if (r.isConfirmed) {
                window.location.href = "/signup/activation";
            }
        });
        return parsedData;
    } catch (e) {
        console.error("Cannot send data:", e.message);
    }
}
