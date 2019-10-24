// function BugHit(player) {
//     if(bug.body.touching.up){
//         if (this.evoBatInterior.displayWidth < 457) {
//             this.evoBatInterior.displayWidth += 30
//             score += 10;
//             scoreText.setText(`${score}`);
            
//         }
//         bug.disableBody(true,true)  
//     }
//         else if (bug.body.touching.left || bug.body.touching.right || bug.body.touching.down){
//             if ( this.evoBatInterior.displayWidth >= 15) {
//                 this.evoBatInterior.displayWidth -= 15
//             }
//         score -= 10;
//         scoreText.setText(`${score}`);
//         }
//     if (evoBatInterior.displayWidth === 457) {

//         becomeRaptor(chickenPlayer)  
//     } 
    
        
//     if (bugs.countActive(true) === 0){

//         activeAvatar.chicken = false
//         activeAvatar.raptor = true
        
          

//         }
//     }

//     function levelChange(player) {
//         if (player.texture.key === 'egg' ) {
//             becomeChicken(player)  
//             //put avatar changes in become methods ///
//         } 
//         else if (player.texture.key === 'chicken') {
//             becomeRaptor(player)
//         }
//         else if (player.texture.key === 'raptor') {
//             becomeKing(player)
//         }
//         else {
//             becomeEgg(player)
//         }

//     }



//     function collectBinary(player, binaryTokens) {
//         binaryTokens.disableBody(true, true)
//         score += 10;
//         scoreText.setText(`${score}`);
//         this.evoBarInterior.displayWidth += 15

//       } 



//     makeTokens = () => {
//         var tokens = scene.physics.add.group({
//         key: 'binary',
//         repeat: 2,
//         setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70 }
//     }); 
//     var tokens10 = scene.physics.add.group({
//         key: 'binary10',
//         repeat: 2,
//         setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70 }
//     }); 
//     tokens.children.iterate(function(token){
//         token.setCollideWorldBounds(true)
//         binaryTokens.setScale(.3)
//         token.setBounce(1,0)
//     })

//     tokens10.children.iterate(function(token){
//         token.setCollideWorldBounds(true)
//         binaryTokens10.setScale(.3)
//         token.setBounce(1,0)
//     })
//     this.physics.add.collider(tokens, cloudPlatforms)
//     this.physics.add.collider(tokens, gameBoundaries)
//     this.physics.add.collider(tokens10, cloudPlatforms)
//     this.physics.add.collider(tokens10, gameBoundaries)
//     return tokens 
//     }
  
    

    Phaser.Sprite.call(this, game, 0, 0, 'cake');

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;

    this.tracking = false;
    this.scaleSpeed = 0;



Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet5'), true);
    }

    return this;

};

Weapon.SingleBullet.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;

    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;

};


else if  (bug.body.touching.left || bug.body.touching.right || bug.body.touching.down){
    raptorPlayer.setTint(0xff0000)  
    setTimeout(() => {
        raptorPlayer.clearTint()
    }, 1000)  
        this.evoBarInterior.displayWidth -= 15
        score -= 10;
        scoreText.setText(`${score}`);
    }
        if (this.evoBarInterior.displayWidth <= 0){
            becomeEgg(raptorPlayer)
        
    }