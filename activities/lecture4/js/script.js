// Create an array of possible answers


// Create a function to fetch the question the user has asked
// Our function should also check from an empty value


// Select a random answer from your array



// Display the question and answer back to the user
// And, log the question and answer to the console


const answers = [
    "Yes, definitely!",
    "It is certain.",
    "Without a doubt.",
    "My sources say no.",
    "Very doubtful.",
    "Ask again later.",
    "Cannot predict now.",
    "Outlook not so good."
];

let personName = "Ayush Patel";
let age = 21;
let isStudent = true;

if (isStudent) {
    console.log(personName + " is a student");
} else {
    console.log(personName + " is not a student");
}

let futureAge = age + 8;
let message = personName + " is " + age + " years old, in 8 years he will be " + futureAge + ".";

window.onload = function() {
    let p = document.createElement('p');
    p.textContent = message;
    p.style.textAlign = 'center';
    p.style.fontSize = '1.3em';
    p.style.fontWeight = 'bold';
    p.style.margin = '3em 0';

    let section = document.querySelector('section');
    let h1 = section.querySelector('h1');
    h1.after(p);

    console.log(message);
};

function askQuestion() {
    let userQuestion = document.getElementById('userQuestion').value;

    if (userQuestion.trim() == '') {
        document.getElementById('answer').textContent = 'Please ask a question!';
        return;
    }

    let randomIndex = Math.floor(Math.random() * answers.length);
    let answer = answers[randomIndex];

    document.getElementById('answer').textContent = answer;

    console.log('Question: ' + userQuestion);
    console.log('Answer: ' + answer);
}
