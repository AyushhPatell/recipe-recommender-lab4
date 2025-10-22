console.log('Script loaded successfully!');

window.addEventListener('load', function()
{
    console.log('Page loaded, adding event listeners...');

    let firstNameInput = document.getElementById('firstName');
    let lastNameInput = document.getElementById('lastName');
    let emailInput = document.getElementById('email');
    let inputFields = [firstNameInput, lastNameInput, emailInput];

    for (let i = 0; i < inputFields.length; i++)
    {
        inputFields[i].addEventListener('focus', function()
        {
            this.classList.add('active');
            console.log('FOCUS on: ' + this.id);
        });

        inputFields[i].addEventListener('blur', function()
        {
            this.classList.remove('active');
            console.log('BLUR on: ' + this.id);
        });
    }

    console.log('Event listeners added!');

    let form = document.getElementById('registrationForm');

    form.addEventListener('submit', function(event)
    {
        event.preventDefault();

        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let email = document.getElementById('email').value;
        let hobbies = [];
        let hobbyCheckboxes = document.querySelectorAll('input[name="hobbies"]:checked');

        for (let i = 0; i < hobbyCheckboxes.length; i++)
        {
            hobbies.push(hobbyCheckboxes[i].value);
        }

        let successMessage = document.createElement('div');
        successMessage.className = 'success';
        successMessage.innerHTML = '<strong>Registration Successful!</strong><br>' +
            'Name: ' + firstName + ' ' + lastName + '<br>' +
            'Email: ' + email + '<br>' +
            'Hobbies: ' + (hobbies.length > 0 ? hobbies.join(', ') : 'None selected');

        let container = document.querySelector('.container');
        container.appendChild(successMessage);

        form.reset();
    });
});