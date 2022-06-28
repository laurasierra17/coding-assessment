// The quiz array stores in each index: the question, an array of each choice, the index of the right answer
var questionnaire = [
    { // html
        question: "What is the correct HTML for creating a hyperlink?",
        answers: ["<a>http://www.w3schools.com</a>", "<a url=\"http://www.w3schools.com\">W3Schools.com</a>", "<a name=\"http://www.w3schools.com\">W3Schools.com</a>", "<a href=\"http://www.w3schools.com\">W3Schools</a>"],
        correctAnswer: 3
    },
    { 
        question: "Which of these statements are all <table> elements?",
        answers: ["<table><tr><tt>", "<thead><body><tr>", "<table><tr><td>", "<table><head><tfoot>"],
        correctAnswer: 2
    },
    { 
        question: "Inline elements are normally displayed without starting a new line.",
        answers: ["True", "False"],
        correctAnswer: 0
    },
    { 
        question: "What is the correct HTML for making a checkbox?",
        answers: ["<input type=\"checkbox\">", "<input type=\"check\">", "<check>", "<checkbox>"],
        correctAnswer: 0
    },
    {
        question: "The HTML global attribute, \"contenteditable\" is used to:",
        answers: ["Return the position of the first found occurrence of content inside a string", "Update content from the server", "Specify whether the content of an element should be editable or not", "Specifies a context menu for an element. The menu appears when a user right-clicks on the element"],
        correctAnswer: 2
    },
    { // css
        question: "What is the correct CSS syntax for making all the <p> elements bold?",
        answers: ["p {text-size:bold;}", "p {font-weight:bold;}", "<p style=\"text-size:bold;\">", "<p style=\"font-size:bold;\">"],
        correctAnswer: 1
    },
    {
        question: "How do you make each word in a text start with a capital letter?",
        answers: ["You can't do that with CSS", "text-style:capitalize", "text-transform:capitalize", "transform:capitalize"],
        correctAnswer: 2
    },
    { 
        question: "How do you display a border like this:\n\nThe top border = 10 pixels\nThe bottom border = 5 pixels\nThe left border = 20 pixels\nThe right border = 1pixel?",
        answers: ["border-width:10px 1px 5px 20px;", "border-width:10px 5px 20px 1px;", "border-width:10px 20px 5px 1px;", "border-width:5px 20px 10px 1px;"],
        correctAnswer: 0
    },
    { 
        question: "Which property is used to change the left margin of an element?",
        answers: ["padding-left", "margin-left", "indent"],
        correctAnswer: 1
    },
    { 
        question: "How do you select an element with id 'demo'?",
        answers: ["*demo", "#demo", ".demo", "demo"],
        correctAnswer: 1
    },
    { // js
        question: "What is the correct JavaScript syntax to change the content of the HTML element below?\n<p id=\"demo\">This is a demonstration.</p>",
        answers: ["#demo.innerHTML = \"Hello World!\";", "document.getElementByName(\"p\").innerHTML = \"Hello World!\";", "document.getElement(\"p\").innerHTML = \"Hello World!\";", "document.getElementById(\"demo\").innerHTML = \"Hello World!\";"],
        correctAnswer: 3
    },
    { 
        question: "How do you create a function in JavaScript?",
        answers: ["function myFunction()", "function:myFunction()", "function = myFunction()"],
        correctAnswer: 0
    },
    { 
        question: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
        answers: ["if (i!== 5)", "if (i <> 5)", "if i !=5 then", "if i <> 5"],
        correctAnswer: 0
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: ["var colors = (1:\"red\", 2:\"green\", 3:\"blue\")", "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")", "var colors = \"red\", \"green\", \"blue\"", "var colors = [\"red\", \"green\", \"blue\"]"],
        correctAnswer: 3
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: ["onmouseover", "onchange", "onclick", "onmouseclick"],
        correctAnswer: 2
    },
]

// The user's score
var userScore = 0
var numQuestions = questionnaire.length;

// The timer
var countdown = 75;

// Pointers to different parts of the site
var quizContainer = document.getElementById("quiz-container");
var timer = document.getElementById("timer");

// Once the user ends the quiz, display their score and ask for their initials for the scoreboard
function postQuiz() {
    quizContainer.innerHTML = "";
    timer.innerHTML = "Timer: 0";

    // populate post quiz screen with user's score and ask for their initials
    var finalMessage = document.createElement("h1");
    finalMessage.textContent = "Good work!";
    var scoreMessage = document.createElement("h2");
    scoreMessage.textContent = "Your final score is " + userScore + " out of 15.";
    var nameLabel = document.createElement("label");
    nameLabel.textContent = "Your initials: ";
    nameLabel.setAttribute("for", "initials")
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "initials");
    var submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("value", "Submit");

    // append everything to the page
    quizContainer.appendChild(finalMessage);
    quizContainer.appendChild(scoreMessage);
    quizContainer.appendChild(nameLabel);
    quizContainer.appendChild(nameInput);
    quizContainer.appendChild(submitBtn);
}


// Function to update user's score and timer
function checkAnswer(questionObj, answer) {
    if (questionObj.correctAnswer === questionObj.answers.indexOf(answer)) {
        userScore++;
        console.log("userscore: ", userScore);
    } else {
        countdown -= 10;
    }
}

// Function that displays each question
// the 'i' variable determines the question displayed
var i = 0;
// the 'endQuiz' variable indicates all questions have been answered and the timer must stop
var endQuiz = false;
function displayQuiz(i) {
    // exit and stop timer if we are past the last question
    if (i === 15) {
        endQuiz = true;
        return;
    }
    // empty main container
    quizContainer.innerHTML = "";

    // Displays question
    var quizQuestion = document.createElement("h1");
    quizQuestion.textContent = questionnaire[i].question;
    quizContainer.appendChild(quizQuestion);

    // Displays answer choices
    questionnaire[i].answers.forEach(answer => {
        var answerBtn = document.createElement("button");
        answerBtn.textContent = answer;
        quizContainer.appendChild(answerBtn);

        // when an answer is clicked, the question changes
        answerBtn.addEventListener("click", () => {
            // update user's score depending on answer selection and timer
            checkAnswer(questionnaire[i], answer);
            i++;
            displayQuiz(i);
        })
    })
}

// Function that runs when the user clicks the "Start" button in the landing page
function startQuiz() {
    displayQuiz(i);

    // In here, the timer begins
    var quizTimer = setInterval(function () {
        countdown--;
        timer.innerHTML = "Timer: " + countdown;

        // If the user finishes quiz or runs out of time
        if (endQuiz || countdown <= 0) {
            clearInterval(quizTimer);
            postQuiz();
        }
    }, 1000)
}


// Points to the "Start" button in the landing page
var startBtn = document.getElementById("start-btn");
// When the user clicks the "Start" button in the landing page, the quiz and the timer start
startBtn.addEventListener("click", startQuiz);