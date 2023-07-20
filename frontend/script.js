/***************************USER SIGN-UP ROUTE CALL****************************/

function userSignUp(event) {
    event.preventDefault();
    const signupForm = document.getElementById('signup-form');
    let signupFormData = new FormData(signupForm);
    for (let [key, value] of signupFormData.entries()) {
        if (key === 'password') var mainPassword = value;
        if (key === 'conf-password') var confPassword = value;
        if (!value) {
            alert('ERROR : Please Fill all the fields!');
            return false;
        } else if (key === 'email' && (value.indexOf('@') === -1)) {
            alert('ERROR : Please Enter a valid Email Address!');
            return false;
        } else if (key === 'phone' && (value.length > 10)) {
            alert('ERROR : Please Enter a valid Phone number!');
            return false;
        }
    }
    if (mainPassword != confPassword) {
        alert('ERROR : Password doesn\'t match!!');
        return false;
    }

    async function user_signup() {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            const stringifiedData = new URLSearchParams(signupFormData).toString();
            const response = await axios.post('http://localhost:4000/user/signup/', stringifiedData, config);
            console.log(response);
            if (response.data.status === true) {
                alert(response.data.messages);
            }
            signupForm.reset();
        } catch (error) {
            alert(error.response.data.messages);
            console.log(error);
            return false;
        }
    }
    user_signup();
}
/***************************USER LOGIN ROUTE CALL****************************/

function userLogin(event) {
    event.preventDefault();
    const loginForm = document.getElementById('login-form');
    let loginFormData = new FormData(loginForm);
    for (let [key, value] of loginFormData.entries()) {
        if (!value) {
            alert('ERROR : Please Fill all the fields!');
            return false;
        } else if (key === 'email' && (value.indexOf('@') === -1)) {
            alert('ERROR : Please Enter a valid Email Address!');
            return false;
        }
    }

    async function user_login() {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            const stringifiedData = new URLSearchParams(loginFormData).toString();
            const response = await axios.post('http://localhost:4000/user/login/', stringifiedData, config);
            console.log(response);
            if (response.data.status === true) {
                alert(response.data.messages);
            }
            loginForm.reset();
        } catch (error) {
            alert(error.response.data.messages);
            console.log(error);
            return false;
        }
    }
    user_login();
}