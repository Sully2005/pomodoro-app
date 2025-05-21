const bells = new Audio('./sounds/bells.wav');
const startButton = document.querySelector('.button-start');
const session = document.querySelector('.minutes');
const stopButton = document.querySelector('.button-stop');
const resetButton = document.querySelector('.button-reset');
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector('.seconds');
let myInterval;
let state = true;
let paused = false;
let totalSeconds = 0;
let originalSessionMinutes;

const appTimer = () => {
  

  if(state) {
    const sessionAmount = Number.parseInt(session.textContent)
    originalSessionMinutes = sessionAmount;
    state = false;
    paused = false;
    totalSeconds = sessionAmount * 60;
    startCountdown();
  }
    else if (paused){
        paused = false;
        startCountdown();
    }
    else{
        alert("Session already running!");
    }
};

    const startCountdown = () => {
        const updateSeconds = () => {
            if (totalSeconds <= 0){
                clearInterval(myInterval);
                bells.play();
                state = true;
                return;
            }
            totalSeconds--;
            const minutesLeft = Math.floor(totalSeconds / 60);
            const secondsLeft = totalSeconds % 60;
            if(secondsLeft< 10){
                secondDiv.textContent = '0' + secondsLeft;
            }
            else{
                secondDiv.textContent = secondsLeft
            }
            minuteDiv.textContent = minutesLeft;
            
             
        };
        updateSeconds();
        myInterval = setInterval(updateSeconds, 1000);
    };

    const pause = () => {
        clearInterval(myInterval);
        paused = true;
    };

    const reset = ()=> {
        clearInterval(myInterval);
        state = true;
        paused = false;
        const defaultMinutes = originalSessionMinutes || 25;
        totalSeconds = defaultMinutes * 60;
        session.textContent = defaultMinutes;
        secondDiv.textContent = '00';
    };

    

startButton.addEventListener("click", appTimer);
stopButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
