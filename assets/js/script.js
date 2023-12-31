const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlinks and Text Markup Language", correct: false},
            { text: "Home Tool Markup Language", correct: false},
            { text: "Hyper Text Markup Language", correct: true},
            { text: "Hyper Tool Markup Language", correct: false},
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true},
            { text: "Colourful Style Sheets", correct: false},
            { text: "Creative Style Sheets", correct: false},
            { text: "Computer Style Sheets", correct: false},
        ]
    },
    {
        question: "Inside which HTML element do we put the JavaScript link inside?",
        answers: [
            { text: "javascript", correct: false},
            { text: "js", correct: false},
            { text: "scripting", correct: false},
            { text: "script", correct: true},
        ]
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        answers: [
            { text: "head", correct: false},
            { text: "h1", correct: true},
            { text: "h6", correct: false},
            { text: "heading", correct: false},
        ]
    },
    {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        answers: [
            { text: "In the body section", correct: false},
            { text: "Within a script tag", correct: false},
            { text: "At the end of the document", correct: false},
            { text: "In the head section", correct: true},
        ]
    },
    {
        question: "How can you add a comment in a JavaScript?",
        answers: [
            { text: "'This is a comment", correct: false},
            { text: "<-This is a comment", correct: false},
            { text: "//This is a comment", correct: true},
            { text: "#This is a comment", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.querySelector(".start-btn");
const timerEl = document.querySelector(".timer-count");
const highScores= document.querySelector("#highscores-list");

let currentQuestionIndex = 0;
let score = 0;
let timer = 70;
let timerCount;
let finalScore;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    startTimer()
}

function startTimer() {
    timerEl.textContent = timer;
    let timerInterval = setInterval(
        () => {
            timer--;
            timerEl.textContent = timer;
            if (timer <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
};

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'Your Score is ' + score;
    nextButton.innerHTML = "Play again?";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

function handleSubmit() {
    let initials = initialsEl.value;
    
    let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
   
    highScoresList.push({ initials: initials, score: finalScore });
    
    highScoresList = highScoresList.sort((curr, next) => {
        if (curr.score < next.score) {
            return 1
        } else if (curr.score > next.score) {
            return -1
        } else {
            return 0
        }
    });
    
    localStorage.setItem('highScores', JSON.stringify(highScoresList))
    
    window.location.href = './highscores.html';
}

function populateHighScores() {
    
    let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
    
    let list = '';
    highScoresList.forEach(score => {
        list = list + '<p>' + score.initials + '  :  ' + score.score + '</p>';
    });
}

function resetScores() {
    localStorage.clear();
    populateHighScores();
}

populateHighScores();

startQuiz();