// Global variables and consts
const questionList = [
    {
        question: "Commonly used data types DO Not include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        correctAnsIndex: 2
    },
    {
        question: "The condition in an if / else statement is enclosed with _________:",
        options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnsIndex: 2
    },
    {
        question: "Arrays in Javascript can be used to store __________:",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnsIndex: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["Javascript", "terminal/bash", "for loops", "console.log"],
        correctAnsIndex: 3
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnsIndex: 2
    },
    // {
    //     question: "Inside which HTML element do we put the JavaScript?",
    //     options: ["&#60; script &#62;", "&#60; html &#62;", "&#60; link &#62;", "&#60; js &#62;"],
    //     correctAnsIndex: 0
    // },
    // {
    //     question: "What is the correct syntax for referring to an external script called 'abcd.js'?",
    //     options: ["&#60;script href='abcd.js'&#62;", "&#60;script id='abcd.js'&#62;", "&#60;script src='abcd.js'&#62;", "Both 2 and 3 are correct"],
    //     correctAnsIndex: 2
    // },
    // {
    //     question: "How do you call a function named 'myFunc'?",
    //     options: ["myFunc()", "call myFunc()", "function myFunc", "console.log(myFunc)"],
    //     correctAnsIndex: 0
    // },
    // {
    //     question: "How do you write 'Hello World' in an alert box?",
    //     options: ["alertBox('Hello World')", "msgBox('Hello World')", "msg('Hello World')", "alert('Hello World')"],
    //     correctAnsIndex: 3
    // },
    // {
    //     question: "Which are primitive data types in Javascript?",
    //     options: ["string", "boolean", "undefined", "all of the above"],
    //     correctAnsIndex: 3
    // }
];

const LOCAL_STORAGE_ITEM_SCORE_LIST = "scoreList";
const INITIAL_TIME = 40;
const storedScores = {
    initials: 'SC',
    score: 0
};

var timeLeft = INITIAL_TIME;
var quesIndex = 0;

// Element selectors
let headerEl = document.querySelector("header");
let showScoreButtonEl = document.getElementById("show-score");
let timerSpanEl = document.getElementById("timer");
let introWrapperDivEl = document.getElementById("intro-wrapper");
let startQuizButtonEl = document.getElementById('start-quiz');
let questionWrapperDivEl = document.getElementById("question-wrapper");
let questionParagraphEl = document.getElementById("question");
let optionsListEl = document.getElementById("options");
let messageWrapperDivEl = document.getElementById("message-wrapper");
let messageSpanEl = document.getElementById("message");
let resultWrapperDivEl = document.getElementById("result-wrapper");
let scoreSpanEl = document.getElementById("score");
// let initialInputEl = document.getElementById("input-initial");
let submitFormButtonEl = document.getElementById("submit-form");
let scoreWrapperDivEl = document.getElementById("score-wrapper");
let scoreListUlEl = document.getElementById("score-list");
let goBackButtonEl = document.getElementById("go-back");
let clearScoreButtonEl = document.getElementById("clear-scores");

// let storeQuesListToLocalStorage = function() {
//     // check to see if the list is already stored in localStorage
//     // if the list is already stored, then return, otherwise store the question list
//     let storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_QUES_LIST));
//     if (!storedList) {
//         localStorage.setItem(LOCAL_STORAGE_ITEM_QUES_LIST, JSON.stringify(questionList));
//     }
// }

let startTimer = function(){
    let timer = setInterval( function() {
        if (timeLeft < 1) {
            clearInterval(timer);
            timeLeft == 0
            timerSpanEl.textContent = timeLeft;
            showResult();
        } else if (quesIndex == questionList.length) {
            clearInterval(timer);
            showResult();
        } else {
            timeLeft -= 1;
            timerSpanEl.textContent = timeLeft;
        }
    } , 1000);
}

var showResult = function(){
    console.log("score: ", timeLeft < 0 ? 0 : timeLeft);
    scoreSpanEl.textContent = timeLeft;
    questionWrapperDivEl.style.display = "none";
    resultWrapperDivEl.style.display = "block";
}

let clickAnswer = function(event){
    var answerId = parseInt(this.name.replace("btn-",""));

    if ( answerId === questionList[quesIndex].correctAnsIndex ) {
        renderMessage('success');
    } else {
        renderMessage('failure');
        timeLeft -= 10; // Deduct 10s (points) from the score
    }

    quesIndex++; // increase index value by one (go to next question)
    if (quesIndex < questionList.length) {    
        renderQuesItem(); // render next question on the screen
    }
}

let renderQuesItem = function(){
    var quesItem = questionList[quesIndex];
    questionParagraphEl.textContent = quesItem.question;
    optionsListEl.innerHTML = ""; // reset inner html
    quesItem.options.map((option, index) => {
        var listItemEl = document.createElement("div");
        listItemEl.className = "btn-container";
        listItemEl.setAttribute("id", index);
        listItemEl.innerHTML = `<button class="btn btn-sm" name="btn-${index}"> ${index + 1}. ${option} </button>`
        optionsListEl.appendChild(listItemEl);
    });
    let btnEl = document.querySelectorAll('button[name^="btn-"]');
    btnEl.forEach(btn => {
        btn.addEventListener("click", clickAnswer); // add click event listener to each option buttons
    });
}

var clearMessage = function(){
    setTimeout(function(){
        messageWrapperDivEl.style.display = "none";
    }, 1000);
}

let renderMessage = function(type) {
    if (type === "success") {
        messageSpanEl.textContent = "Correct!";
    } else if (type === "failure") {
        messageSpanEl.textContent = "Wrong!";
    }
    messageWrapperDivEl.style.display = "block";
    clearMessage();
}


let startQuiz = function(event){
    console.log("Quiz Started!");
    // Hide Intro Wrapper
    introWrapperDivEl.style.display = "none";
    timerSpanEl.textContent = timeLeft;
    startTimer(); 
    renderQuesItem();
};

let loadScores = function() {
    headerEl.style.display = "none";
    introWrapperDivEl.style.display = "none";
    questionWrapperDivEl.style.display = "none";
    resultWrapperDivEl.style.display = "none";
    scoreWrapperDivEl.style.display = "block";
    let storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_SCORE_LIST));
    scoreListUlEl.innerHTML = "";
    if (storedList) {
        storedList.map((item, index) => {
            let listItemEl = document.createElement("li");
            listItemEl.setAttribute("id", index);
            listItemEl.textContent = `${index + 1}. ${item.initials} - ${item.score}`;
            scoreListUlEl.appendChild(listItemEl);
        });
    } else {
        let listItemEl = document.createElement("li");
        listItemEl.textContent = "No item is saved!";
        scoreListUlEl.appendChild(listItemEl);
    }
};

let addScoreToLocalStorage = function(scoreItem) {
    let storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_SCORE_LIST));
    if (!storedList) {
        localStorage.setItem(LOCAL_STORAGE_ITEM_SCORE_LIST, JSON.stringify([scoreItem]));
    } else {
        storedList.push(scoreItem);
        localStorage.setItem(LOCAL_STORAGE_ITEM_SCORE_LIST, JSON.stringify(storedList));
    } 
};

let submitForm = function(event) {
    event.preventDefault();
    
    let initialsInput = document.querySelector("#input-initial").value;

    // check if input is empty
    if (!initialsInput) {
        alert("Please enter valid initials.");
        return false;
    }

    // add current score to local storage
    addScoreToLocalStorage({
        initials: initialsInput,
        score: timeLeft
    });

    loadScores();
};

let goBackToInitialView = function() {
    // reset all views
    headerEl.style.display = "flex";
    introWrapperDivEl.style.display = "block";
    questionWrapperDivEl.style.display = "none";
    resultWrapperDivEl.style.display = "none";
    scoreWrapperDivEl.style.display = "none";
    timeLeft = INITIAL_TIME;
};

let clearScores = function() {
    localStorage.removeItem(LOCAL_STORAGE_ITEM_SCORE_LIST);
    alert("scroes have been cleared from localStorage!");
    loadScores();
};

showScoreButtonEl.addEventListener("click", loadScores);
startQuizButtonEl.addEventListener("click", startQuiz);
submitFormButtonEl.addEventListener("click", submitForm);
goBackButtonEl.addEventListener("click", goBackToInitialView);
clearScoreButtonEl.addEventListener("click", clearScores);