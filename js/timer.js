//Game Timer
let timer = 90
let timerId
function decreaseTimer()  { 
    
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0){
        determineWinner({ player, enemy, timerId })
    }
}