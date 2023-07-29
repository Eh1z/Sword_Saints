//Display Area Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 574

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.3;



//Creates Players and Enemies using OOP
class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height   = 200
    }

    //Creates the player pixels
    draw(){
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    //Updates player location
    update(){
        this.draw()
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
    x: 500,
    y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})



//Main Code*********


//Animations
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

animate()




//Event Listeners for Control Input
window.addEventListener('keydown', (event) =>{
    console.log(event.key);
})