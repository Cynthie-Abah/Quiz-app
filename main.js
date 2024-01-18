const questions = [
    {
        question: "What does 'DOM' stand for?",
        choices: ["Document Object Model", "Data Object Model", "Dynamic Object Model", "Document Oriented Model"],
        correctAnswerIndex: 0
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        choices: ["var", "let", "const", "both var and let"],
        correctAnswerIndex: 3
    },
    {
        question: "What is the result of '5' + 3 in JavaScript?",
        choices: ["53", "8", "Error", "35"],
        correctAnswerIndex: 0
    },
    {
        question: "Which method is used to add a new element at the end of an array?",
        choices: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswerIndex: 0
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        choices: ["Refers to the current function", "Refers to the global object", "Refers to the current object", "Refers to a specific variable"],
        correctAnswerIndex: 2
    },
    {
        question: "What is the correct way to write a comment in JavaScript?",
        choices: ["// This is a comment", "/* This is a comment */", "# This is a comment", "comment: This is a comment"],
        correctAnswerIndex: 1
    },
    {
        question: "What is the purpose of 'JSON.parse()' in JavaScript?",
        choices: ["Converts a JavaScript object to a JSON string", "Parses a JSON string and returns a JavaScript object", "Encodes a JSON string", "Decodes a JSON string"],
        correctAnswerIndex: 1
    },
    {
        question: "Which event is triggered when a user clicks on an HTML element?",
        choices: ["onmouseover", "onchange", "onclick", "onsubmit"],
        correctAnswerIndex: 2
    },
    {
        question: "How do you declare a function in JavaScript?",
        choices: ["function myFunction()", "var myFunction = function()", "def myFunction()", "myFunction: function()"],
        correctAnswerIndex: 0
    },
    {
        question: "What is the purpose of 'localStorage' in JavaScript?",
        choices: ["To store session-specific data", "To store data for the current session only", "To store data permanently on the user's device", "To store cookies"],
        correctAnswerIndex: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

function startQuiz() {
    showQuestion();
    startTimer();
}

function showQuestion() {
    const questionText = document.getElementById("question-text");
    const choicesSelect = document.getElementById("choices-select");
    const nextButton = document.getElementById("nextButton");

    const currentQuestion = questions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;

    choicesSelect.innerHTML = "<option >select correct option</option>";
    currentQuestion.choices.forEach((choice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = choice;
        choicesSelect.add(option);
    });

    nextButton.disabled = false; // Enable the next button for the next question
    choicesSelect.disabled = false; // Enable the choices for the new question
}

function checkAnswer() {
    const choicesSelect = document.getElementById("choices-select");
    const selectedAnswerIndex = parseInt(choicesSelect.value, 10);
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
        score++;
    }

    choicesSelect.disabled = true; // Disable choices after answering
    nextButton.disabled = true; // Disable next button until feedback is shown
    showFeedback(selectedAnswerIndex === currentQuestion.correctAnswerIndex);
}

function showFeedback(isCorrect) {
    const feedbackContainer = document.getElementById("feedback-container");
    const message = isCorrect ? "Correct!" : "Incorrect!";
    const color = isCorrect ? "green" : "red";

    feedbackContainer.textContent = message;
    feedbackContainer.style.color = color;

    setTimeout(() => {
        feedbackContainer.textContent = "";
        feedbackContainer.style.color = "inherit";
        nextQuestion();
    }, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function startTimer() {
    let timeLeft = 60; // 60 seconds

    timer = setInterval(() => {
        document.getElementById("timer").textContent = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            finishQuiz();
        }
    }, 1000);
}

function finishQuiz() {
    clearInterval(timer);

    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.innerHTML = `<h2>Quiz Completed!</h2>
                               <p>Your Score: ${score}/${questions.length}</p>`;
}

// Start the quiz when the page loads
startQuiz();
