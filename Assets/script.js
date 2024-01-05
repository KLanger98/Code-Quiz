
//Organise main document elements here
var stage = document.getElementById('stage');
var timerBox = document.getElementById('timer');
const interface = document.getElementById('interface');

var questionNumber = 0;
let score = 0;
var timeLeft = 0;

let quizQuestions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript",
        options: ["var", "let", "const", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        question: "What statement can be used to execute a block of code repeatedly as long as the condition remains 'true'?",
        options: ["if statement", "for loop", "switch statement", "while loop"],
        correctAnswer: "while loop"
    },
    {
        question: "What is the correct syntax for declaring a named function in JavaScript?",
        options: [
        "function myFunction() {}",
        "const myFunction = function() {}",
        "myFunction: function() {}",
        "const myFunction: () => {}"
        ],
        correctAnswer: "function myFunction() {}"
    },
    {
        question: "Which array method is used to add one or more elements to the end of an array and returns the new length of the array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
        ],
        correctAnswer: "push()"
    },
    {
        question: "How do you access the value of a property named 'age' in an object called person?",
        options: [
            "person.age",
            "person[age]",
            "person->age",
            "person.get('age')"
        ],
        correctAnswer: "person.age"
    }
    
];

let highScores = [];

function startGame(){
    setTimer();
    clearStage();

    score = 0;
    questionNumber = 0;
    timeLeft = 60;

    loadQuestion(questionNumber);
}

function setTimer(){
    var timer = setInterval(function(){
    timeLeft--;
    timerBox.innerText = "Time left:" + timeLeft
    if(timeLeft < 10){
        timerBox.style.color = "red"
    }
    if(timeLeft <= 0){
        clearInterval(timer)
        timerBox.innerText = ""
        gameOver();
    }
},
1000)
}

function clearStage(){
    while(stage.hasChildNodes()){
        stage.removeChild(stage.firstChild);
    }
}

function loadQuestion(){
    if(questionNumber == quizQuestions.length){
        addHighScore();
        return;
    }
    let currentQuestion = document.createElement('h2');

    let colorClass = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"];

    currentQuestion.innerText = quizQuestions[questionNumber].question;
    let answer = quizQuestions[questionNumber].correctAnswer;

    let optionsList = document.createElement('ul');
    
    for(let i = 0; i < 4; i++){
        let option = document.createElement('li');
        option.innerText = quizQuestions[questionNumber].options[i];
        option.setAttribute("id", "option" + i)
        option.style.backgroundColor = colorClass[i];
        option.classList.add('quizOption');
        option.addEventListener('click', () => {
            if(answer === option.innerText){
                console.log('Correct');
                score++;
                correctAnswer();
            } else{
                console.log('Wrong');
                timeLeft = timeLeft - 5;
                incorrectAnswer();
            }
            clearStage();
            questionNumber++;
            loadQuestion();
        })

        optionsList.append(option);
    }

    stage.append(currentQuestion, optionsList);
}
function showHighScores(){
    clearStage();

    highScores.sort(function(a,b){
        return b[1] - a[1]
    })

    console.log(highScores)
    const highScoreTitle = document.createElement('h2')
    const highScoreTable = document.createElement('table');
    const tableHeadings = document.createElement('tr');
    const initialsHead = document.createElement('th');
    const scoreHead = document.createElement('th');

    initialsHead.innerText = "Initials";
    scoreHead.innerText = "Score";

    tableHeadings.append(initialsHead, scoreHead);
    highScoreTable.append(tableHeadings);

    highScoreTitle.innerText = "HighScores"
    
    for(let i = 0; i < highScores.length; i++){
        const tableRow = document.createElement('tr');
        const rowScore = document.createElement('td');
        const rowInitials = document.createElement('td');

        rowScore.innerText = highScores[i][0];
        rowInitials.innerText = highScores[i][1];

        tableRow.append(rowScore,rowInitials)
        highScoreTable.append(tableRow);
    }

    stage.append(highScoreTable);

    const restartBtn = document.createElement('button');
    restartBtn.innerText = "Restart"
    restartBtn.addEventListener('click', startGame)

    stage.append(restartBtn)


}

function addHighScore(){
    let info = document.createElement('h3');
    let inputBox = document.createElement('input');
    let submitBtn = document.createElement('button')

    info.innerText = "Add your initials to your score";
    submitBtn.innerText = "Submit";

    submitBtn.addEventListener('click', () =>{
        highScores.push([score, inputBox.value])
        showHighScores()
    })

    
    stage.append(info, inputBox, submitBtn)
}

function gameOver(){
    clearStage();
    addHighScore();
}


function correctAnswer(){
    interface.children[0].classList.add('shakeRight');
    interface.children[0].style.backgroundColor = "green";

    stage.classList.add('shakeRight');
    stage.style.backgroundColor = "#4c9d50";

    setTimeout(() =>{
        interface.children[0].classList.remove('shakeRight');
        interface.children[0].style.backgroundColor = "";
        stage.classList.remove('shakeRight');
        stage.style.backgroundColor = "";
    }, 1000);
}

function incorrectAnswer(){
    interface.children[0].classList.add('shakeWrong');
    interface.children[0].style.backgroundColor = "red";

    stage.classList.add('shakeWrong')
    stage.style.backgroundColor = "#c44040";

    setTimeout(() =>{
        interface.children[0].classList.remove('shakeWrong');
        interface.children[0].style.backgroundColor = "";
        stage.classList.remove('shakeWrong');
        stage.style.backgroundColor = "";
    }, 1000);
}