// Global variables and consts
const questionList = [
    {
        question: "Commonly used data types DO Not include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        correctAnsIndex: 2
    },
    {
        question: "The condition in an if / else statement is enclosed with _________.:",
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
        question: "String values must be enclosed within _______ when being assigned to letiables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnsIndex: 2
    },
    // {
    //     question: "Commonly used data types DO Not include:",
    //     options: ["strings", "booleans", "alerts", "numbers"],
    //     correctAnsIndex: 2
    // },
    // {
    //     question: "Commonly used data types DO Not include:",
    //     options: ["strings", "booleans", "alerts", "numbers"],
    //     correctAnsIndex: 2
    // },
    // {
    //     question: "Commonly used data types DO Not include:",
    //     options: ["strings", "booleans", "alerts", "numbers"],
    //     correctAnsIndex: 2
    // },
    // {
    //     question: "Commonly used data types DO Not include:",
    //     options: ["strings", "booleans", "alerts", "numbers"],
    //     correctAnsIndex: 2
    // },
    // {
    //     question: "Commonly used data types DO Not include:",
    //     options: ["strings", "booleans", "alerts", "numbers"],
    //     correctAnsIndex: 2
    // }
];

const LOCAL_STORAGE_ITEM_QUES_LIST = "questionBank";
const LOCAL_STORAGE_ITEM_HIGH_SCORE = "highScore";
var startTime = 75;


// Element selectors
let timerSpanEl = document.getElementById("timer");
let introWrapperDivEl = document.getElementById("intro-wrapper");
let questionParagraphEl = document.getElementById("question");
let optionsListEl = document.getElementById("options");


let storeQuesListToLocalStorage = function() {
    // check to see if the list is already stored in localStorage
    // if the list is already stored, then return, otherwise store the question list
    let storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_QUES_LIST));
    if (!storedList) {
        localStorage.setItem(LOCAL_STORAGE_ITEM_QUES_LIST, JSON.stringify(questionList));
    }
}



let startButtonEl = document.getElementById('start-quiz');

let startTimer = function(timeLeft){
    setInterval( function() {
        timeLeft -= 1;
        timerSpanEl.textContent = timeLeft;
    } , 1000);
}

let renderQuesItem = function(){

}

let clickAnswer = function(event){
    console.log("clicked: ", this.name.replace("btn-",""));
}
 
let startQuiz = function(event){
    console.log("Quiz Started");
    let timeLeft = startTime;
    timerSpanEl.textContent = timeLeft;
    startTimer(timeLeft);
    
    // Hide Intro Wrapper
    introWrapperDivEl.style.display = "none";

    var ind = 0;
    var quesItem = questionList[ind];
    questionParagraphEl.textContent = quesItem.question;
    quesItem.options.map((option, index) => {
        var listItemEl = document.createElement("div");
        listItemEl.className = "btn-container";
        // listItemEl.setAttribute("data-task-id", taskIdCounter);
        listItemEl.setAttribute("id", index);
        listItemEl.innerHTML = `<button class="btn btn-sm" name="btn-${index}"> ${index + 1}. ${option} </button>`
        optionsListEl.appendChild(listItemEl);
    })
    let btnEl = document.querySelectorAll("button");
    btnEl.forEach(btn => {
        btn.addEventListener("click", clickAnswer);
    })
};



startButtonEl.addEventListener("click", startQuiz);
storeQuesListToLocalStorage();
