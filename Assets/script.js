
//Organise main document elements here
var stage = document.getElementById('stage');
var timerBox = document.getElementById('timer');

var questionNumber = 0;
let score = 0;

let quizQuestions = [
    {
        question: "Hello",
        options: ["a", "b", "c", "d"],
        correctAnswer: "a"
    },
    {
        question: "Hello",
        options: ["d", "e", "f", "g"],
        correctAnswer: "e"
    }
    
]

function startGame(){
    setTimer();
    clearStage();

    score = 0;
    
    questionNumber = 0;
    loadQuestion(questionNumber);
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

function loadQuestion(){
    let currentQuestion = document.createElement('h2');

    console.log(questionNumber)
    currentQuestion.innerText = quizQuestions[questionNumber].question;
    let answer = quizQuestions[questionNumber].correctAnswer;

    let optionsList = document.createElement('ul');
    
    for(let i = 0; i < 4; i++){
        let option = document.createElement('li');
        option.innerText = quizQuestions[questionNumber].options[i];
        option.setAttribute("id", "option" + i)
        option.setAttribute('class', "quizOption")
        option.addEventListener('click', () => {
            if(answer === option.innerText){
                console.log('Correct');
                nextQuestion(true);
            } else{
                console.log('Wrong');
                nextQuestion(false);
            }
        })

        optionsList.append(option);
    }

    stage.append(currentQuestion);
    stage.append(optionsList)
}

function nextQuestion(answer){
    if(answer == true){
        score++;
    } 

    clearStage();
    questionNumber++;
    loadQuestion();
}






//Check high scores function 
    //
