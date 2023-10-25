//Creates the enviroment of the game
class World {
    constructor({ position, imageSrc, scale = 1, maxFrames = 1, }) {
        this.position     = position
        this.height       = 150
        this.width        = 50
        this.image        = new Image()
        this.image.src    = imageSrc
        this.scale        = scale
        this.maxFrames    = maxFrames
        this.currentFrame = 0

        //framerate of game (fps implementation)
        this.framesElapsed = 0
        this.framesHold    = 10

    }

    //Daws the game's background and decorational assets
    draw(){    
        c.drawImage( 
            this.image,
            
            //Image cropping
            this.currentFrame * ( this.image.width / this.maxFrames ),
            0,
            this.image.width / this.maxFrames,
            this.image.height,

            this.position.x, 
            this.position.y, 
            (this.image.width / this.maxFrames) * this.scale, 
            this.image.height * this.scale
        ) 
    }

    //
    update(){
        this.draw()
        this.framesElapsed++
        if ( this.framesElapsed % this.framesHold === 0){
            if (this.currentFrame < this.maxFrames - 1){
                this.currentFrame++  
            } else {
                this.currentFrame = 0
            }
        }
    }
}





//Creates Players and Enemies using OOP
class Fighter {
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
        

        if (this.position.y + this.height + this.velocity.y + 95 >= canvas.height){
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