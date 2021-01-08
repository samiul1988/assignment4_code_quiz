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

const LOCAL_STORAGE_ITEM_SCORE_LIST = "scoreList"; // declaration of localStorage item key
const INITIAL_TIME = 40; // total time for quiz
let viewScoreFlag = false; // Flag to stop timer if "view high score" button is clicked

// initialize timer and question list
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
let submitFormButtonEl = document.getElementById("submit-form");
let scoreWrapperDivEl = document.getElementById("score-wrapper");
let scoreListUlEl = document.getElementById("score-list");
let goBackButtonEl = document.getElementById("go-back");
let clearScoreButtonEl = document.getElementById("clear-scores");

// A general helper function to display appropriate elements 
let setDisplay = function(elements, displayStyles){ 
    elements.map((element, id) => element.style.display = displayStyles[id]);
}

// Set (and reset) timer
let startTimer = function(){
    let timer = setInterval( function() {
        if (timeLeft < 1 || quesIndex === questionList.length) { // if time is up or all questions are displayed
            clearInterval(timer);  // stop timer
            if (timeLeft < 1) { 
                timeLeft = 0; // set appropriate time value
            }
            quesIndex = 0; // reset question index
            timerSpanEl.textContent = timeLeft; // assign updated timer value to timerSpan
            showResult(); // display result table
        } else if ( viewScoreFlag === true ) {
            clearInterval(timer);  // stop timer
            quesIndex = 0; // reset question index
            viewScoreFlag = false; // reset flag
        } else {
            timeLeft -= 1; // decrease timer value by 1
            timerSpanEl.textContent = timeLeft; // assign updated timer value to timerSpan
        }
    } , 1000);
}

// Display final score and a form to save the score 
var showResult = function(){
    scoreSpanEl.textContent = timeLeft;
    setDisplay([questionWrapperDivEl, resultWrapperDivEl], ["none", "block"]);
}

// This function clears message after 1 s
var clearMessage = function(){
    setTimeout(function(){
        setDisplay([messageWrapperDivEl], ["none"]); // clear message
    }, 1000);
}

// This function renders "Correct!" or "Wrong!" message after an answer option is selected 
let renderMessage = function(type) {
    if (type === "success") {
        messageSpanEl.textContent = "Correct!";
    } else if (type === "failure") {
        messageSpanEl.textContent = "Wrong!";
    }
    setDisplay([messageWrapperDivEl], ["block"]); // show message
    clearMessage(); // clear message
}

// Event handler for quiz option buttons
let clickAnswer = function(event){
    var answerId = parseInt(this.name.replace("btn-","")); // get the index of the selected option

    if ( answerId === questionList[quesIndex].correctAnsIndex ) { // compare the index with correct answer index
        renderMessage('success');
    } else {
        renderMessage('failure');
        timeLeft -= 10; // Deduct 10s (points) from the score for wrond answer
    }

    quesIndex++; // increase index value by one (go to next question)
    if (quesIndex < questionList.length) {    
        renderQuesItem(); // render next question on the screen
    }
}

// This function displays one quiz question and associated answer options at a time
// The function also binds click event listeners to the option buttons
let renderQuesItem = function(){
    var quesItem = questionList[quesIndex]; // Get a question item from dictionary
    questionParagraphEl.textContent = quesItem.question; // Set the question
    optionsListEl.innerHTML = ""; // Reset inner html
    quesItem.options.map((option, index) => { // Populate answer options
        var listItemEl = document.createElement("div");
        listItemEl.className = "btn-container";
        listItemEl.innerHTML = `<button class="btn btn-sm" name="btn-${index}"> ${index + 1}. ${option} </button>`;
        optionsListEl.appendChild(listItemEl);
    });
    let btnEl = document.querySelectorAll('button[name^="btn-"]'); // select all option buttons
    btnEl.forEach(btn => {
        btn.addEventListener("click", clickAnswer); // add click event listener to each option button
    });
}

// Event handler for "start quiz" button
let startQuiz = function(event){
    console.log("Quiz Started!");
    // Update View to show quiz questions
    setDisplay([introWrapperDivEl, questionWrapperDivEl, resultWrapperDivEl, scoreWrapperDivEl], ["none", "block", "none", "none"]);
    // initialize timer span
    timerSpanEl.textContent = timeLeft;
    // Start Timer
    startTimer();
    // Render First Question 
    renderQuesItem();
};

let loadScores = function() {
    viewScoreFlag = true;
    // Update view
    setDisplay([headerEl, introWrapperDivEl, questionWrapperDivEl, resultWrapperDivEl, scoreWrapperDivEl],
        ["none", "none", "none", "none", "block"]);
    
    let storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_SCORE_LIST)); // Get stored Score List from localStorage 
    scoreListUlEl.innerHTML = ""; // reset score list view
    if (storedList) {
        storedList.map((item, index) => {
            let listItemEl = document.createElement("li");
            listItemEl.setAttribute("id", index);
            listItemEl.textContent = `${index + 1}. ${item.initials} - ${item.score}`;
            scoreListUlEl.appendChild(listItemEl); // insert individual Score List
        });
    } else {
        let listItemEl = document.createElement("li");
        listItemEl.textContent = "No item is saved!";
        scoreListUlEl.appendChild(listItemEl); // display "no content"
    }
};

let addScoreToLocalStorage = function(scoreItem) {
    // get the list of stored score lists from localStorage
    let storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_SCORE_LIST)) || []; 

    storedList.push(scoreItem); // add new item to the list
    localStorage.setItem(LOCAL_STORAGE_ITEM_SCORE_LIST, JSON.stringify(storedList)); // save the updated list to localStorage
};

// handler for Submit button (to save score to localStorage)
let submitForm = function(event) {
    event.preventDefault(); // prevent default behavior

    let initialsInputEl = document.querySelector("#input-initial");
    let initialsInput = initialsInputEl.value; // Select input text for Initials

    // check if input is empty
    if (!initialsInput) {
        alert("Please enter valid initials.");
        return false;
    }

    // add current score to local storage
    addScoreToLocalStorage({
        initials: initialsInput.trim(),
        score: timeLeft
    });

    initialsInputEl.value = ''; // reset input field
    loadScores(); // render updated scores to the page
};

// handler for "Go Back" button
let goBackToInitialView = function() {
    // reset all views
    setDisplay([headerEl, introWrapperDivEl, questionWrapperDivEl, resultWrapperDivEl, scoreWrapperDivEl], 
        ["flex", "block", "none", "none", "none"]);
    timeLeft = INITIAL_TIME; // reset timer
    timerSpanEl.textContent = 0;
    viewScoreFlag = false; // reset flag
};

let clearScores = function() {
    localStorage.removeItem(LOCAL_STORAGE_ITEM_SCORE_LIST); // remove localStorage entry
    alert("scroes have been cleared from localStorage!");
    loadScores();
};

showScoreButtonEl.addEventListener("click", loadScores);
startQuizButtonEl.addEventListener("click", startQuiz);
submitFormButtonEl.addEventListener("click", submitForm);
goBackButtonEl.addEventListener("click", goBackToInitialView);
clearScoreButtonEl.addEventListener("click", clearScores);