//Display Area Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 574

c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.8;


//Enviromental sprites
const background = new World({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './assets/background.png'
})

const building = new World({
    position: {
        x: 640,
        y: 160,
    },
    scale: 2.5,
    maxFrames: 6,
    imageSrc: './assets/shop.png'
})

//player sprite
const player = new Fighter({
    position:{
    x: 24,
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
const enemy = new Fighter({
    position:{
    x: 950,
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

decreaseTimer()
animate()