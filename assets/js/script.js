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

var userArray = [];
// temporary hold for user score
var score;
// The timer
var countdown = 75;

// Pointers to different parts of the site
var quizContainer = document.getElementById("quiz-container");
var timer = document.getElementById("timer");
var highScoresContainer = document.getElementById("high-scores");

// Save current user object to local storage
function updateLocalStorage(userArray) {
    localStorage.setItem("scores", JSON.stringify(userArray));
}

// Render landing page
function landingPage() {
    // Empty quiz container
    quizContainer.innerHTML = "";

    // Change the id of quizContainer to state the styling for this screen
    quizContainer.setAttribute("id", "quiz-container");

    // Landing page container
    var div = document.createElement("div");
    div.setAttribute("id", "landing-page");

    // Heading 1
    var header1 = document.createElement("h1");
    header1.textContent = "Coding Assessment";
    div.appendChild(header1);

    // Heading 2
    var header2 = document.createElement("h2");
    header2.textContent = "A Practice Guide";
    div.appendChild(header2);

    // Heading 3
    var header3 = document.createElement("h3");
    header3.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    div.appendChild(header3);

    // Button to start quiz
    var quizBtn = document.createElement("button");
    quizBtn.setAttribute("id", "start-btn");
    quizBtn.textContent = "Start Quiz";
    // When the user clicks the "Start" button in the landing page, the quiz and the timer start
    quizBtn.addEventListener("click", startQuiz);
    div.appendChild(quizBtn);

    // Append landing page container to the site's main container
    quizContainer.append(div);
}

// Render high scores page
function renderHighScores() {
    // Clear page
    quizContainer.innerHTML = "";
    // Show link to view high scores board when user is taking the quiz
    highScoresContainer.style.visibility = "visible";
    // Reset countdown
    countdown = 75;

    // Change the id of quizContainer to state the styling for this screen
    quizContainer.setAttribute("id", "high-scores-pg");

    var title = document.createElement("h1");
    title.textContent = "High Scores";
    quizContainer.appendChild(title);

    // Check if localStorage is empty or not to determine what to render
    if (localStorage.getItem("scores") !== null) {
        // Store user info in localStorage
        var arr = JSON.parse(localStorage.getItem("scores"));

        // Order from highest to lowest score by first saving each userScore in an array, sort the array in descending order, and get corresponding userInitials
        var scoreArr = arr.map(userObj => userObj.userScore);
        scoreArr.sort((a, b) => b - a);
        
        // Append localStorage results to the screen in descending order
        for (var i = 0; i < scoreArr.length; i++) {
            var j = 0;
            while (j < arr.length) {
                if (scoreArr[i] === arr[j].userScore) {
                    var result = document.createElement("p");
                    result.setAttribute("class", "score-text");
                    result.textContent = (i + 1) + ". " + arr[j].userInitials + "   -   " + arr[j].userScore;
                    quizContainer.appendChild(result);
                }
                j++;
            }
        }
    } else {
        // If localStorage is empty, announce user they haven't played yet
        var result = document.createElement("p");
        result.setAttribute("class", "score-text");
        result.textContent = "No scores have been registered yet.";
        quizContainer.appendChild(result);
    }

    // Container for the next three buttons
    var div = document.createElement("div");
    div.setAttribute("class", "btn-container");
    quizContainer.appendChild(div);

    // Button that allows user to retake the quiz
    var backBtn = document.createElement("button");
    backBtn.setAttribute("class", "high-scores-btn");
    backBtn.textContent = "Take quiz";
    div.appendChild(backBtn);

    backBtn.addEventListener("click", () => {
        // Reset countdown
        countdown = 75;
        startQuiz();
    });

    // Button that allows user to clear scores board
    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.setAttribute("class", "high-scores-btn");
    clearScoresBtn.textContent = "Clear high scores";
    div.appendChild(clearScoresBtn);

    clearScoresBtn.addEventListener("click" , () => {
        localStorage.clear();
        userArray = [];
        renderHighScores();
    })
 
    // Button that takes user to landing page
    var mainBtn = document.createElement("button");
    mainBtn.setAttribute("class", "high-scores-btn");
    mainBtn.textContent = "Go back to landing page";
    div.appendChild(mainBtn);

    // Reloading without resetting cache
    mainBtn.addEventListener("click", landingPage);
}

// When the highScoresContainer link is clicked, take them to the high scores board
highScoresContainer.addEventListener("click", renderHighScores);

// Once the user ends the quiz, display their score and ask for their initials for the scoreboard
function postQuiz() {
    quizContainer.innerHTML = "";
    timer.innerHTML = "Timer: 0";

    // Change id of quizContainer to state the styling for this screen
    quizContainer.setAttribute("id", "post-quiz");
    
    // Container to style label and input for initials
    var div = document.createElement("div");
    div.setAttribute("class", "initials-container")

    // NOTE TO SELF: convert into a function? looks more organized.
    // Populate post quiz screen with user's score and ask for their initials
    var finalMessage = document.createElement("h1");
    finalMessage.textContent = "Good work!";

    var scoreMessage = document.createElement("h2");
    scoreMessage.textContent = "Your final score is " + score + " out of 15.";

    var nameLabel = document.createElement("label");
    nameLabel.textContent = "Your initials: ";
    nameLabel.setAttribute("for", "initials")

    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "initials");

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "input-submit");
    submitBtn.textContent = "Submit";

    // Append everything to the page
    quizContainer.appendChild(finalMessage);
    quizContainer.appendChild(scoreMessage);
    quizContainer.appendChild(div);
    div.appendChild(nameLabel);
    div.appendChild(nameInput);
    quizContainer.appendChild(submitBtn);

    // When button is pressed, save user's info and take them to the high scores board
    submitBtn.addEventListener("click", () => {
        if (nameInput.value == "") {
            alert("Please write your initials");
        } else {
            userArray.push({ userScore: score, userInitials: nameInput.value });
            updateLocalStorage(userArray);
            renderHighScores();
        }
    })
}


// Function to update user's score and timer
function checkAnswer(questionObj, answer) {
    if (questionObj.correctAnswer === questionObj.answers.indexOf(answer)) {
        score++;
    } else {
        countdown -= 10;
    }
}

// Function that displays each question
// The 'i' variable determines the question displayed
var i = 0;
// The 'endQuiz' variable indicates all questions have been answered and the timer must stop
var endQuiz = false;
function displayQuiz(i) {
    // Exit and stop timer if we are past the last question
    if (i === 15) {
        endQuiz = true;
        return;
    }
    // Empty main container
    quizContainer.innerHTML = "";
    // Change the id of quizContainer to state the styling for this screen
    quizContainer.setAttribute("id", "quiz-screen");
    // Hide link to view high scores board when user is taking the quiz
    highScoresContainer.style.visibility = "hidden";

    // Displays question
    var quizQuestion = document.createElement("h1");
    quizQuestion.setAttribute("class", "title");
    quizQuestion.textContent = questionnaire[i].question;
    quizContainer.appendChild(quizQuestion);

    // Container used to place answer choices vertically
    var div = document.createElement("div");
    div.setAttribute("class", "choice-container")
    quizContainer.appendChild(div);

    // Displays answer choices
    questionnaire[i].answers.forEach(answer => {
        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("class", "choice-btn")
        answerBtn.textContent = answer;
        div.appendChild(answerBtn);

        // When an answer is clicked, the question changes
        answerBtn.addEventListener("click", () => {
            // Update user's score and timer depending on answer selection
            checkAnswer(questionnaire[i], answer);
            i++;
            displayQuiz(i);
        })
    })
}

// Function that runs when the user clicks the "Start" button in the landing page
function startQuiz() {
    displayQuiz(i);

    // Set score to 0 every time the quiz is taken
    score = 0;

    // In here, the timer begins
    var quizTimer = setInterval(function () {
        countdown--;
        timer.innerHTML = "Timer: " + countdown;

        // If the user finishes quiz or runs out of time, take them to the post quiz screen
        if (endQuiz || countdown <= 0) {
            clearInterval(quizTimer);
            postQuiz();
        }
    }, 1000)
}

// Load landing page
landingPage();