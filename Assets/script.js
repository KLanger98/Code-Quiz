
//begin game function
//Start timer using a setInterval function 
//load first question
function startGame(){
    setTimer();
    //start Timer
    //load first question
}

function loadQuestion(){

}

var timerBox = document.getElementById('timer');

function setTimer(){
    var timeLeft = 2;

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


//Check high scores function 
    //
