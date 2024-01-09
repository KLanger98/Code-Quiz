
var stage = document.getElementById('stage');
var timerBox = document.getElementById('timer');
var interface = document.getElementById('interface');

var questionNumber = 0;
var score = 0;
var timeLeft = 0;
var timer;

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

//Function to launch game once 'Start' Button is pressed
function startGame(){
    score = 0;
    questionNumber = 0;
    timeLeft = 75;
    timerBox.innerText = "Time Left: " + timeLeft;
    setTimer();
    clearStage();
    loadQuestion(questionNumber);
}

//Function to begin timer and react to the timer reaching 0
function setTimer(){
    timer = setInterval(function(){
    timeLeft--;
    timerBox.innerText = "Time left: " + timeLeft
    if(timeLeft < 10){
        timerBox.style.color = "red"
    }
    if(timeLeft <= 0){
        clearInterval(timer)
        timerBox.innerText = ""
        clearStage();
        addHighScore();
    }
},
1000)
return timer;
}

//Function which loads questions in the staging area
function loadQuestion(){
    if(questionNumber == quizQuestions.length){
        addHighScore();
        return;
    }
    let currentQuestion = document.createElement('h2');
    let optionsList = document.createElement('ul');

    let answer = quizQuestions[questionNumber].correctAnswer;
    currentQuestion.innerText = quizQuestions[questionNumber].question;
    let colorClass = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"];

    
    
    for(let i = 0; i < 4; i++){
        let option = document.createElement('li');
        option.innerText = quizQuestions[questionNumber].options[i];
        option.setAttribute("id", "option" + i)
        option.style.backgroundColor = colorClass[i];
        option.classList.add('quizOption');
        option.addEventListener('click', () => {
            if(answer === option.innerText){
                console.log('Correct');
                correctAnswer();
            } else{
                console.log('Wrong');
                timeLeft = timeLeft - 15;
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

//Function used to ask the user for their initials and react to a submit event
function addHighScore(){
    clearTimer(timer);

    let info = document.createElement('h3');
    let inputBox = document.createElement('input');
    let submitBtn = document.createElement('button')

    info.innerText = "Add your initials to your score";
    submitBtn.innerText = "Submit";

    if(timeLeft < 0){
        timeLeft = 0;
    }

    submitBtn.addEventListener('click', () =>{
        if(inputBox.value.length == 2){
            storeScore(inputBox.value, timeLeft)
            showHighScores()
        } else{
            window.alert('Initials must be 2 characters');
            inputBox.value = ""
        }
    })

    
    stage.append(info, inputBox, submitBtn)
}

//Function used to save the user score and username to the local storage
function storeScore(userInitials, userScore){
    let highScoresArr = JSON.parse(localStorage.getItem('highScores'));

    let userValues = {
        name: userInitials,
        score: userScore
    }

    if(!highScoresArr){
        highScoresArr = [userValues];
    } else{
        highScoresArr.push(userValues)
    }

    localStorage.setItem("highScores", JSON.stringify( highScoresArr));
}

//Function to load all high scores in a table
function showHighScores(){
    clearStage();

    let highScoresArr = JSON.parse(localStorage.getItem('highScores'));

    if(highScoresArr.length > 1){
        highScoresArr.sort(function(a,b){
        return b.score - a.score
    })
    }

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
    
    for(let i = 0; i < highScoresArr.length; i++){
        const tableRow = document.createElement('tr');
        const rowScore = document.createElement('td');
        const rowInitials = document.createElement('td');

        rowScore.innerText = highScoresArr[i].score;
        rowInitials.innerText = highScoresArr[i].name;

        tableRow.append(rowInitials, rowScore)
        highScoreTable.append(tableRow);
    }

    const restartBtn = document.createElement('button');
    restartBtn.innerText = "Restart"
    restartBtn.addEventListener('click', startGame)

    stage.append(highScoreTitle, highScoreTable, restartBtn);
}

//Function to make the page react to the user providing a correct answer
function correctAnswer(){
    interface.children[0].style.backgroundColor = "green";

    stage.style.backgroundColor = "#4c9d50";

    setTimeout(() =>{
        interface.children[0].style.backgroundColor = "";
        stage.style.backgroundColor = "";
    }, 1000);
}

//Function to make the page react negatively to a user providing a wrong number
function incorrectAnswer(){
    timerBox.innerText = "Time left: " + timeLeft
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

//function used to clear the staging area
function clearStage(){
    while(stage.hasChildNodes()){
        stage.removeChild(stage.firstChild);
    }
}

//function used to clear the timer
function clearTimer(timer){
    clearInterval(timer);
    timerBox.innerText = "Your Score is: " + timeLeft;
}