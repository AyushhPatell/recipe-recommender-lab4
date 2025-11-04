let validUsers;
if (localStorage.getItem('validUsers'))
{
    validUsers = JSON.parse(localStorage.getItem('validUsers'));
}
else
{
    validUsers = {
        "ayushpatel": "MyPass123@",
        "krishpatel": "MyPass123#",
        "kavanpatel": "MyPass123$"
    };
    localStorage.setItem('validUsers', JSON.stringify(validUsers));
}

const usernameSet = new Set(Object.keys(validUsers));

const validationErrors = new Map([
    ['email', 'Please enter a valid email'],
    ['username', 'Username must not begin with a number or contain spaces or special characters'],
    ['password', 'Password must use at least a number, uppercase letter, lowercase letter, and\n' +
    ' special character'],
    ['confirmPassword', 'Passwords do not match'],
]);

const displayFieldStatus = (fieldId, errorId, errorMsg = '') => {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(errorId);

    if (errorMsg)
    {
        errorElement.textContent = errorMsg;
        field.classList.add('invalid');
        field.classList.remove('valid');
        return false;
    }
    else
    {
        errorElement.textContent = '';
        field.classList.remove('invalid');
        field.classList.add('valid');
        return true;
    }
};

const checkEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;
    return emailPattern.test(email);
};
const checkUsername = (username) => {
    const usernamePattern = /^[a-zA-Z][a-zA-Z0-9]*$/;
    return usernamePattern.test(username);
};
const checkPassword = (pwd) => {

    if (pwd.length < 12) return false;
    if (!/[a-z]/.test(pwd)) return false;
    if (!/[A-Z]/.test(pwd)) return false;
    if (!/[0-9]/.test(pwd)) return false;
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) return false;
    return true;
};

const displayValidation = (fieldId, errorId, message) => {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    if (message)
    {
        error.textContent = message;
        field.classList.add('invalid');
        field.classList.remove('valid');
        return false;
    }
    else
    {
        error.textContent = '';
        field.classList.remove('invalid');
        field.classList.add('valid');
        return true;
    }
};

if (document.getElementById('registrationForm'))
{
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        try
        {
            const { email, username, password, confirmPassword } = {
                email: document.getElementById('email').value.trim(),
                username: document.getElementById('username').value.trim(),
                password: document.getElementById('password').value,
                confirmPassword: document.getElementById('confirmPassword').value
            };
            let formIsValid = true;

            if (!email)
            {
                formIsValid = displayValidation('email', 'emailError', 'Email is required') && formIsValid;
            }
            else if (!checkEmail(email))
            {
                formIsValid = displayValidation('email', 'emailError', validationErrors.get('email')) && formIsValid;
            }
            else
            {
                displayValidation('email', 'emailError', '');
            }

            if (!username)
            {
                formIsValid = displayValidation('username', 'usernameError', 'Username is required') && formIsValid;
            }
            else if (!checkUsername(username))
            {
                formIsValid = displayValidation('username', 'usernameError', validationErrors.get('username')) && formIsValid;
            }
            else if (usernameSet.has(username))
            {
                formIsValid = displayValidation('username', 'usernameError', validationErrors.get('userExists')) && formIsValid;
            }
            else
            {
                displayValidation('username', 'usernameError', '');
            }

            if (!password)
            {
                formIsValid = displayValidation('password', 'passwordError', 'Password is required') && formIsValid;
            }
            else if (!checkPassword(password))
            {
                formIsValid = displayValidation('password', 'passwordError', validationErrors.get('password')) && formIsValid;
            }
            else
            {
                displayValidation('password', 'passwordError', '');
            }

            if (!confirmPassword)
            {
                formIsValid = displayValidation('confirmPassword', 'confirmPasswordError', 'Please confirm your password') && formIsValid;
            }
            else if (password !== confirmPassword)
            {
                formIsValid = displayValidation('confirmPassword', 'confirmPasswordError', validationErrors.get('confirmPassword')) && formIsValid;
            }
            else
            {
                displayValidation('confirmPassword', 'confirmPasswordError', '');
            }

            if (formIsValid)
            {
                validUsers[username] = password;
                localStorage.setItem('validUsers', JSON.stringify(validUsers));
                usernameSet.add(username);

                console.log('Registration successful!');
                console.log('New user:', username);
                console.log('All users:', validUsers);

                alert('Registration successful! You can now login with your credentials.');
                registrationForm.reset();
                window.location.href = 'login.html';
            }

        }
        catch (error)
        {
            console.error('Error during registration:', error);
            alert('Something went wrong. Please try again.');
        }
    });
}

if (document.getElementById('loginForm'))
{
    const myLoginForm = document.getElementById('loginForm');
    myLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        try
        {
            const credentials = {
                username: document.getElementById('loginUsername').value.trim(),
                password: document.getElementById('loginPassword').value
            };
            const { username, password } = credentials;
            let canProceed = true;

            if (!username)
            {
                document.getElementById('loginUsernameError').textContent = 'Username is required';
                document.getElementById('loginUsername').classList.add('invalid');
                canProceed = false;
            }
            else
            {
                document.getElementById('loginUsernameError').textContent = '';
                document.getElementById('loginUsername').classList.remove('invalid');
            }

            if (!password)
            {
                document.getElementById('loginPasswordError').textContent = 'Password is required';
                document.getElementById('loginPassword').classList.add('invalid');
                canProceed = false;
            }
            else
            {
                document.getElementById('loginPasswordError').textContent = '';
                document.getElementById('loginPassword').classList.remove('invalid');
            }

            if (canProceed)
            {
                if (validUsers[username] && validUsers[username] === password)
                {
                    console.log('Login successful for user:', username);
                    alert(`Welcome back, ${username}! Login successful.`);
                    myLoginForm.reset();
                }
                else
                {
                    console.log('Login failed for user:', username);
                    const errorDiv = document.getElementById('loginErrorMessage');
                    errorDiv.textContent = 'Invalid username or password';
                    errorDiv.style.display = 'block';
                }
            }

        }
        catch (error)
        {
            console.error('Error during login:', error);
            alert('Something went wrong. Please try again.');
        }
    });
}