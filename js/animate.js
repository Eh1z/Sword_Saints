//Animations
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    building.update()
    player.update()
    //enemy.update()

    player.velocity.x = 0
    enemy.velocity.x  = 0

    //player movement

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else
    if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }


    //Detect Sword Collison
    if( 
        swordHit({
            sword1: player,
            sword2: enemy
        }) &&
        player.isAttacking)
        {
            player.isAttacking = false
            enemy.health -= 10
            document.querySelector('#enemyHealth').style.width = enemy.health + '%'
            console.log('Oof, that has to hurt')
    }

    if( 
        swordHit({
            sword1: enemy,
            sword2: player
        }) &&
        enemy.isAttacking)
        {
            enemy.isAttacking = false
            player.health -= 10
            document.querySelector('#playerHealth').style.width = player.health + '%'
            console.log('Take that, puny hero')
    }

    //end game based on amount of health
    if (enemy.health <= 0 || player.health <= 0){
        determineWinner({ player, enemy, timerId })
    }
}
