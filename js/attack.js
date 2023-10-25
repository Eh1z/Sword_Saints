function swordHit({ sword1, sword2 }){
    return(
        sword1.attackBox.position.x + sword1.attackBox.width >= sword2.position.x && 
        sword1.attackBox.position.x < sword2.position.x + sword2.width &&
        sword1.attackBox.position.y + sword1.attackBox.height >= sword2.position.y &&
        sword1.attackBox.position.y <= sword2.position.y + sword2.height
    )
}
