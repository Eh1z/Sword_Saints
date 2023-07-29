//Display Area Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 860
canvas.height = 574

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.8;



//Creates Players and Enemies using OOP
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height   = 200
        this.lastKey  
    }

    //Creates the player pixels
    draw(){
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    //Updates player and enemy locations
    update(){
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity
        }
    }
}

//player sprite
const player = new Sprite({
    position:{
    x: 0,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

//Enemy sprite
const enemy = new Sprite({
    position:{
    x: 400,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})



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



//Animations
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

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

}

animate()




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
            enemy.velocity.y = -30
            enemy.lastKey = 'ArrowUp'
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