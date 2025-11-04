# Lab 3: User Login and Registration System

This lab creates a simple user registration and login system using JavaScript ES6 features, JSON for data storage, and DOM manipulation for user feedback.

- Date Created*: 28 October 2025
- Last Modification Date*: 30 October 2025
- Timberlea URL*: https://web.cs.dal.ca/~aspatel/csci3172/labs/lab3/
- GitLab URL: https://git.cs.dal.ca/aspatel/csci3172/-/tree/main/Labs/lab3


## Files Included
- index.html - Registration page
- login.html - Login page
- css/styles.css
- js/script.js

## Features Implemented

# Registration Page (index.html).
- Form with email, username, password, and confirm password fields.
- Error messages displayed below each field.
- Success message when registration is complete.
- Console logging for debugging.
- Automatic redirect to login page after successful registration.

# Login Page (login.html)
- Simple login form with username and password fields.
- Validates credentials against the validUsers JSON object.
- Shows success message for valid login.
- Shows error message for invalid credentials.
- Console logging for debugging.


## Testing Instructions

### To Test Registration:
1. Open index.html in a browser
2. Try registration:
   - Email: yourname@example.com
   - Username: yourname
   - Password: ...
   - Confirm Password: ...
   - Should show success message and redirect to login.

### To Test Login:
1. Open login.html in a browser
2. Try pre-existing user:
   - Username: ayushpatel
   - Password: MyPass123@
4. Try the user you just registered.



## Sources Used

Mozilla. (2019, March 18). Window.localStorage. MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

Set - JavaScript | MDN. (n.d.). Developer.mozilla.org. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

Map. (n.d.). MDN Web Docs. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

Arrow function expressions - JavaScript | MDN. (n.d.). Developer.mozilla.org. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
