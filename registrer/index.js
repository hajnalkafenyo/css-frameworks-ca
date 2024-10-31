document.getElementById("logIn").addEventListener("click", function () {
    window.location.href = "/index.html"
});

function validateNoroffEmail(email) {
    // Define the regex pattern for the two domain formats
    const noroffEmailPattern = /^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/;
    const emailError = document.getElementById('email-error');
    if (noroffEmailPattern.test(email) == false) {
        emailError.innerText = 'Invalid email. Please use @noroff.no or @stud.noroff.no.';
        return false;
    } else {
        emailError.innerText = '';
        return true;
    }
}

document.getElementById("emailForm").addEventListener("submit", async function (event) {
    // Prevent the form from submitting automatically
    event.preventDefault();
    const email = document.getElementById('email').value;
    const isEmailValid = validateNoroffEmail(email);
    if (!isEmailValid) {
        return false
    }
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const password2HelpText = document.getElementById('password2-help-text');

    if (password === password2) {
        password2HelpText.style.color = 'green';
        password2HelpText.textContent = 'Passwords match!';
    } else {
        password2HelpText.style.color = 'red';
        password2HelpText.textContent = 'Passwords do not match!';
        return false;
    }

    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const requestData = {
        "email": email,
        "password": password,
        "password2": password2,
        "name": name,
        "bio": bio
    }
    try {
        const response = await fetch("https://v2.api.noroff.dev/auth/register", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "X-Noroff-API-Key": "c3f5b8a6-3a13-441f-bf49-53bf03f73477"
            },
            body: JSON.stringify(requestData)  // Send the data as JSON
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  // Parse the JSON response
        const user = {
            name: data.data.name,
            email: data.data.email,
            accessToken: data.data.accessToken
        }
        if (localStorage.getItem("user")) {
            throw Error(`${user}already exist`)
        }
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/feed/index.html"
        console.log('Response from API:', data);  // Do something with the response
    } catch (error) {
        console.error('Error sending data:', error);
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').innerHTML = error.message;

    }

});


const emailField = document.getElementById('email');
if (emailField) {
    emailField.addEventListener('input', (event) => { validateNoroffEmail(event.target.value) });
} else {
    console.log('nincs');
}
