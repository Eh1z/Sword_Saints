function determineWinner({ player, enemy, timerId }){
    clearTimeout(timerId)
    document.querySelector('#displayText').innerHTML = 'flex'
    if( player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'You were evenly matched in battle'
    } else if ( player.health > enemy.health ){
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    } else if ( player.health < enemy.health ){
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}