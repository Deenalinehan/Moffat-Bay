// gather elements from the html file that we'll work with further down in this js file
let loginBtn = document.getElementById("loginSubmitBtn");
let resultMessageDiv = document.getElementById("loginResult")

// listen for user attempting login, respond with logic
loginBtn.addEventListener("click", async (event) => {

    try {
        // if this is not the first user's attempt to log in, there will be left over messaging, we want to clear the way for new messaging
        // if this is the user's first time attempting to log in , this code does nothing
        resultMessageDiv.innerHTML = ""
        resultMessageDiv.classList.remove("errorMessage")
        resultMessageDiv.classList.remove("successMessage")

        // retrieve the email and password the user has entered for their log in attempt
        let emailLoginValue = document.getElementById("login-email").value.trim()
        let passwordLoginValue = document.getElementById("login-password").value.trim()

        // log these to the broser console for debuggin benefits
        console.log(emailLoginValue)
        console.log(passwordLoginValue)

        // if there are both eamil and password present, we can try to log in the user
        if (emailLoginValue && passwordLoginValue) {
            // call the backend api with the log in information to look for the user in the database
            const response = await fetch('/api/users/loginUser', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailLoginValue,
                    password: passwordLoginValue
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            // if there is not a user email/password match found, respond with error message
            if (!response.ok) {
                // add error styling to the error log-in-attempt-result div
                resultMessageDiv.classList.add("errorMessage")
                // add the failed log in message tot he log-in-attempt-result div
                resultMessageDiv.innerHTML = "incorrect email or password, please try again!"
                const errorData = await response.json();
                throw new Error(errorData.message || 'something went wrong');
            }

            // if the response result is ok, this code will run
            const responseData = await response.json()
            // add the success message to the log-in-attempt-reult-div
            resultMessageDiv.classList.add("successMessage")
            resultMessageDiv.innerHTML = "you are now logged in!"
            console.log(responseData)

            // after user sees "you are now logged in" message, redirect them to the home page
            // the page reload will reveal the reservation option in the nav bar available to users who are logged in
            setTimeout(function() {
                window.location.href = '/';
              }, 1250); 
        }

    } catch (error) {
        console.error('fetch error:', error.message);
    }
});

