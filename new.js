function BugHit(player) {
    if(bug.body.touching.up){
        if (this.evoBatInterior.displayWidth < 457) {
            this.evoBatInterior.displayWidth += 30
            score += 10;
            scoreText.setText(`${score}`);
            
        }
        bug.disableBody(true,true)  
    }
        else if (bug.body.touching.left || bug.body.touching.right || bug.body.touching.down){
            if ( this.evoBatInterior.displayWidth >= 15) {
                this.evoBatInterior.displayWidth -= 15
            }
        score -= 10;
        scoreText.setText(`${score}`);
        }
    if (evoBatInterior.displayWidth === 457) {

        becomeRaptor(chickenPlayer)  
    } 
    
        
    if (bugs.countActive(true) === 0){

        activeAvatar.chicken = false
        activeAvatar.raptor = true
        
          

        }
    }

    function levelChange(player) {
        if (player.texture.key === 'egg' ) {
            becomeChicken(player)  
            //put avatar changes in become methods ///
        } 
        else if (player.texture.key === 'chicken') {
            becomeRaptor(player)
        }
        else if (player.texture.key === 'raptor') {
            becomeKing(player)
        }
        else {
            becomeEgg(player)
        }

    }