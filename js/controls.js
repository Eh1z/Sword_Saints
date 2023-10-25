//******Main Controls******
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },


    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

//Event Listeners for Control Input
window.addEventListener('keydown', (event) =>{
    console.log(event.key);

    switch (event.key) {

        //Player controls
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
        break;
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
        break;
        case 'w':
            player.velocity.y = -20
            player.lastKey = 'w'
        break;
        case ' ':
            player.attack()
        break;

        //Enemy controls
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
        break;
        case 'ArrowUp':
            enemy.velocity.y = -10
            enemy.lastKey = 'ArrowUp'
        break;
        case 'Enter':
            enemy.attack()
        break;
    }
})

window.addEventListener('keyup', (event) =>{
    console.log(event.key);

    switch (event.key) {
        //Player controls
        case 'd':
            keys.d.pressed = false
        break;
        case 'a':
            keys.a.pressed = false
        break;
        case 'w':
            keys.w.pressed = false
        break;

        //Enemy controls
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            lastKey = 'ArrowRight'
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            lastKey = 'ArrowLeft'
        break;
        case 'ArrowUp':
            enemy.velocity.y = false
            lastKey = 'ArrowUp'
        break;
    }
})