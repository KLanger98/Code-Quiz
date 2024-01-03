
//Organise main document elements here
var stage = document.getElementById('stage');
var timerBox = document.getElementById('timer');

let questionNumber = 0;

let quizQuestions = [
    {
        question: "Hello",
        optionA: "A",
        optionB: "B",
        optionC: "C",
        optionD: "D",
        correctAnswer: "A"
    },
    {
        question: "Hello",
        optionA: "A",
        optionB: "B",
        optionC: "C",
        optionD: "D",
        correctAnswer: "A"
    }
    
]
//begin game function
//Start timer using a setInterval function 
//load first question
function startGame(){
    setTimer();
    clearStage();
    
    questionNumber = 0;
    loadQuestion(questionNumber);
}

function loadQuestion(questionNumber){
    let currentQuestion = document.createElement('h2');
    currentQuestion.innerText = quizQuestions[questionNumber].question;
    let answer = quizQuestions[questionNumber].correctAnswer;

    let optionA = quizQuestions[questionNumber].optionA;
    let optionB = quizQuestions[questionNumber].optionB;
    let optionC = quizQuestions[questionNumber].optionC;
    let optionD = quizQuestions[questionNumber].optionD;

    stage.append(currentQuestion);
    
    questionNumber++;
}



function setTimer(){
    var timeLeft = 60;

    var timer = setInterval(function(){
    timeLeft--;
    timerBox.innerText = timeLeft
    if(timeLeft == 0){
        clearInterval(timer)
        timerBox.innerText = ""
    }
},
1000)
}

function clearStage(){
    while(stage.hasChildNodes()){
        stage.removeChild(stage.firstChild);
    }
}

//Check high scores function 
    //
