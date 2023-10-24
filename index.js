//Display Area Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 860
canvas.height = 574

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.8;



//Creates Players and Enemies using OOP
class Sprite {
    constructor({ position, velocity, colour = 'green', offset }) {
        this.lastKey 
        this.position  = position
        this.velocity  = velocity
        this.height    = 100
        this.width     = 50
        this.colour    = colour
        this.health    = 100
         
        this.isAttacking
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 20,

        }
    }

    //Creates the player pixels
    draw(){

        //Character Style
        c.fillStyle = this.colour
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //Sword Slash Style
        if(this.isAttacking){
            c.fillStyle = 'white'
            c.fillRect(
                this.attackBox.position.x, 
                this.attackBox.position.y + 30, 
                this.attackBox.width, 
                this.attackBox.height
            )
        }        
    }

    //Updates player and enemy locations
    update(){
        this.draw()
        
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity
        }
    }

    //Sword Attack function
    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
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
    },
    offset: {
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
    },
    offset: {
        x: +50,
        y: 0
    },
    colour: 'red'
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

function swordHit({ sword1, sword2 }){
    return(
        sword1.attackBox.position.x + sword1.attackBox.width >= sword2.position.x && 
        sword1.attackBox.position.x < sword2.position.x + sword2.width &&
        sword1.attackBox.position.y + sword1.attackBox.height >= sword2.position.y &&
        sword1.attackBox.position.y <= sword2.position.y + sword2.height
    )
}

function determineWinner({ player, enemy }){
    if( player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'You were evenly matched in battle'
    } else if ( player.health > enemy.health ){
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    } else if ( player.health < enemy.health ){
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}

//Game Timer
let timer = 90
function decreaseTimer()  { 
    setTimeout(decreaseTimer, 1000)
    if (timer > 0) {
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0){
        document.querySelector('#displayText').style.display = 'flex'
        determineWinner({ player, enemy })
    }
}

decreaseTimer()

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
        determineWinner({ player, enemy })
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
            enemy.velocity.y = -20
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