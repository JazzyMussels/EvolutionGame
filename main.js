var config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 727,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 380 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};



var game = new Phaser.Game(config);
var bugs;
var gameBoundaries;
var cloudPlatforms;
var chickenPlayer;
var score = 0;
var activeAvatar = {egg: false, chicken: false, raptor: false, king: false}
var lastCursor;
var scene;


function preload ()
{
     //scorecard
     this.load.image('scorecard', 'assets/high_score_screen.png');
     this.load.image('outer_shell', 'assets/outer_shell.png');
     this.load.image('inner_bar', 'assets/inner_bar.jpg');
 
//background and status screens

this.load.image('background', 'assets/background.png');
// this.load.image('introscreen', 'assets/intro_screen.png')
// this.load.image('loginscreen', 'assets/login_screen.png')
// this.load.image('eggscreen', 'assets/egg_screen.png')
// this.load.image('chickenscreen', 'assets/chicken_screen.png')
// this.load.image('raptorscreen', 'assets/raptor_screen.png')
this.load.image('kingscreen', 'assets/king_screen.png')
// this.load.image('restartscreen', 'assets/restart_screen.png')


//boundaries and platforms
this.load.image('horizontalboundary', 'assets/cupboundhorizontal.png')
this.load.image('verticalboundary', 'assets/cupboundvertical.png')
this.load.image('cloud', 'assets/cloud.png')

//character sprites 
this.load.spritesheet('egg', 'assets/eggsprite.png', { frameWidth: 76, frameHeight: 88 })
this.load.spritesheet('chicken', 'assets/chickensprite.png', { frameWidth: 82, frameHeight: 60 })
this.load.spritesheet('raptor', 'assets/raptorsprite.png', { frameWidth: 186, frameHeight: 129 })
this.load.spritesheet('king', 'assets/kingsprite.png', { frameWidth: 77, frameHeight: 88 })
this.load.spritesheet('binary', 'assets/binarysprite.png', { frameWidth: 76, frameHeight: 88 })
this.load.spritesheet('binary10', 'assets/binarysprite10.png', { frameWidth: 76, frameHeight: 88 })
this.load.spritesheet('cake', 'assets/cakesprite.png', { frameWidth: 200, frameHeight: 211 })
this.load.spritesheet('bug', 'assets/bugsprite.png', { frameWidth: 80, frameHeight: 60 });
}


function create ()
{
    
    //in-game screens
    // this.intro = this.add.image(1300, 360, 'introscreen')
    // this.login = this.add.image(1305, 300, 'loginscreen')
    // this.eggScreen = this.add.image(1305, 555, 'eggscreen')
    // this.chickenScreen = this.add.image(1305, 510, 'chickenscreen')
    // this.raptorScreen = this.add.image(1302, 544, 'raptorscreen')
    this.kingScreen = this.add.image(1302, 580, 'kingscreen')
    // this.restartScreen = this.add.image(1302, 480, 'restartscreen')
    
    

    //  background
    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0,0)

    // scorecard
    this.scoreCard = this.add.image(1020, 40, 'scorecard')
    this.scoreCard.setScale(0.6)
     //score
    scoreText = this.add.text(1283, 20, '0', { fontSize: '41px', fill: '#1df4ff' });
    divLine = this.add.text(1200, 40, '--------', { fontSize: '41px', fill: '#1df4ff' });
    
    // evolve-bar
    this.evoBarShell = this.add.image(295, 40, 'outer_shell')
    this.evoBarShell.setScale(1.8)
    this.evoBarInterior = this.add.image(66, 21, 'inner_bar').setOrigin(0, 0)
    this.evoBarInterior.setScale(1.8)
    this.evoBarInterior.displayWidth = 0;
    
    

    // boundaries

    gameBoundaries = this.physics.add.staticGroup()
    cloudPlatforms = this.physics.add.staticGroup()

    gameBoundaries.create(575, 714, 'horizontalboundary')
    gameBoundaries.create(1138, 355, 'verticalboundary')
    gameBoundaries.create(13, 355, 'verticalboundary')

    //mid-center
    cloudPlatforms.create(450, 440, 'cloud')
    cloudPlatforms.create(700, 440, 'cloud')
    cloudPlatforms.create(550, 410, 'cloud')
    //bottom-mid-right
    cloudPlatforms.create(900, 570, 'cloud')
    cloudPlatforms.create(1040, 440, 'cloud')
    //top-left
    cloudPlatforms.create(170, 270, 'cloud')
    cloudPlatforms.create(440, 225, 'cloud')
    //bottom-left
    cloudPlatforms.create(210, 560, 'cloud')
    
    //top-right
    cloudPlatforms.create(780, 240, 'cloud')
    cloudPlatforms.create(870, 270, 'cloud')

    
     //character avatars

    
  

    //egg
      eggPlayer = this.physics.add.sprite(100, 653, 'egg')
      eggPlayer.setScale(0.80)
      eggPlayer.setBounce(0)
      eggPlayer.score = 0
      eggPlayer.setCollideWorldBounds(true)

      this.physics.add.collider(eggPlayer, cloudPlatforms)
      this.physics.add.collider(eggPlayer, gameBoundaries)
  
      this.anims.create({
         key: 'left',
     frames: this.anims.generateFrameNumbers('egg', { start: 0, end: 7 }),
         frameRate: 10,
         repeat: -1
     });

     this.anims.create({
        key: 'staticLeft',
        frames: [ { key: 'egg', frame: 1 } ],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'staticRight',
        frames: [ { key: 'egg', frame: 15 } ],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('egg', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

//keeps track of what avatar is active
    activeAvatar.egg = true
//makes a variable of "this" when inside functions
  scene = this
   //bugs function

     bugs = this.physics.add.group({
    key: 'bug',
     repeat: 4,
    setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70 }
}); 

this.physics.add.collider(bugs, gameBoundaries)
 this.physics.add.collider(bugs, cloudPlatforms)
 this.anims.create({
    key: 'leftbug',
    frames: [ { key: 'bug', frame: 0 } ],
    frameRate: 10,
    repeat: -1
});
this.anims.create({
    key: 'rightbug',
    frames: [ { key: 'bug', frame: 1 } ],
    frameRate: 10,
    repeat: -1
});

bugs.children.iterate(function(bug){
    bug.setCollideWorldBounds(true)
    bug.setScale(0.5,0.5)
    bug.setBounce(1,0)
    bug.setVelocityX(-160)
})

console.log(this)
if((bugs.countActive(true) < 10)){
    console.log(bugs.countActive(true))
if (activeAvatar.egg){
    this.time.addEvent({
        delay: 5000,
        callback: createBug, // End callback for adding enemies
        callbackScope: this,
        loop: true
    })}
else if (activeAvatar.chicken){
    this.time.addEvent({
        delay: 3000,
        callback: createBug, // End callback for adding enemies
        callbackScope: this,
        loop: true
    })}
else if (activeAvatar.raptor){
    this.time.addEvent({
        delay: 1000,
        callback: createBug, // End callback for adding enemies
        callbackScope: this,
        loop: true
    })}
else if (activeAvatar.king){
    this.time.addEvent({
        delay: 500,
        callback: createBug, // End callback for adding enemies
        callbackScope: this,
        loop: true
    })}
}
function createBug(){
    for (var i = 0; i < 3; i++) {
		var x = Phaser.Math.RND.between(0, 900);
        var bug = bugs.create(x, 16, 'bug')
        bug.setCollideWorldBounds(true)
        bug.setScale(0.5,0.5)
        bug.setBounce(1,0)
        bug.setVelocityX(-160)
	}
    ; 
}




    //chicken
      chickenPlayer = this.physics.add.sprite(100, 650, 'chicken')
      console.log(chickenPlayer)
      chickenPlayer.setScale(1.2)
      chickenPlayer.setBounce(0);
      chickenPlayer.score = 0
      chickenPlayer.setCollideWorldBounds(true)

      this.physics.add.collider(chickenPlayer, cloudPlatforms)
      this.physics.add.collider(chickenPlayer, gameBoundaries)
 
   
      this.anims.create({
         key: 'chickleft',
         frames: this.anims.generateFrameNumbers('chicken', {  start: 0, end: 2}),
         frameRate: 10,
         repeat: -1
     });

     this.anims.create({
         key: 'chickStaticRight',
         frames: [ { key: 'chicken', frame: 3 } ],
         frameRate: 10,
         repeat: -1
     });

     this.anims.create({
        key: 'chickStaticLeft',
        frames: [ { key: 'chicken', frame: 2 } ],
        frameRate: 10,
        repeat: -1
    });

     this.anims.create({
         key: 'chickright',
         frames: this.anims.generateFrameNumbers('chicken', {  start: 3, end: 5}),
         frameRate: 10,
         repeat: -1

       
     });
     chickenPlayer.disableBody(true,true)
     

    // king
     kingPlayer = this.physics.add.sprite(100, 650, 'king')
     kingPlayer.setScale(0.9)
     kingPlayer.setBounce(0);
     kingPlayer.score = 0
     kingPlayer.setCollideWorldBounds(true)

     this.physics.add.collider(kingPlayer, cloudPlatforms)
     this.physics.add.collider(kingPlayer, gameBoundaries)
 
   
     this.anims.create({
        key: 'kingleft',
        frames: this.anims.generateFrameNumbers('king', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'kingturn',
        frames: [ { key: 'king', frame: 1 } ],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'kingright',
        frames: [ { key: 'king', frame: 1} ],
        frameRate: 10,
        repeat: -1 
     });
      kingPlayer.disableBody(true,true)

    //raptor
    raptorPlayer = this.physics.add.sprite(100, 650, 'raptor')
     raptorPlayer.setScale(0.5)
     raptorPlayer.setBounce(0);
     raptorPlayer.score = 0
     raptorPlayer.setCollideWorldBounds(true)

     this.physics.add.collider(raptorPlayer, cloudPlatforms)
     this.physics.add.collider(raptorPlayer, gameBoundaries)
 
   
     this.anims.create({
        key: 'raptorleft',
        frames: this.anims.generateFrameNumbers('raptor', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'raptorturn',
        frames: [ { key: 'raptor', frame: 5 } ],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'roarleft',
        frames: [ { key: 'raptor', frame: 3 } ],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'roarright',
        frames: [ { key: 'raptor', frame: 4 } ],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'raptorright',
        frames: this.anims.generateFrameNumbers('raptor', { start: 5, end: 7 }),
        frameRate: 10,
        repeat: -1

       
     });

     raptorPlayer.disableBody(true,true)

    // // cake ammo
    // cakeAmmo = this.physics.add.sprite(100, 650, 'cake')
    //  cakeAmmo.setScale(0.18)
    //  cakeAmmo.setBounce(0);
    //  cakeAmmo.score = 0
    //  cakeAmmo.setCollideWorldBounds(true)

    //  this.physics.add.collider(cakeAmmo, cloudPlatforms)
    //  this.physics.add.collider(cakeAmmo, gameBoundaries)
 
   
    //  this.anims.create({
    //     key: 'left',
    //     frames: [ { key: 'cake', frame: 0 } ],
    //     frameRate: 10,
    //     repeat: -1
    // });

    // this.anims.create({
    //     key: 'turn',
    //     frames: [ { key: 'cake', frame: 0} ],
    //     frameRate: 10,
    //     repeat: -1
    // });

    // this.anims.create({
    //     key: 'right',
    //     frames: [ { key: 'cake', frame: 1 } ],
    //     frameRate: 10,
    //     repeat: -1

       
    // });

    // binary
    binaryTokens = this.physics.add.group({
        key: 'binary',
        setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70}
    }); 
    binaryTokens10 = this.physics.add.group({
        key: 'binary10',
        setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70}
    }); 

    // binaryTokens = this.physics.add.sprite(400, 650, 'binary')
    // binaryTokens10 = this.physics.add.sprite(460, 650, 'binary10')
    binaryTokens.children.iterate(function(token){
       token.setScale(.3);
        token.setBounce(0);
        token.setCollideWorldBounds(true)
    })
    binaryTokens10.children.iterate(function(token){
        token.setScale(.3);
         token.setBounce(0);
         token.setCollideWorldBounds(true)
     })
   

    this.physics.add.collider(binaryTokens, cloudPlatforms)
    this.physics.add.collider(binaryTokens, gameBoundaries)
    this.physics.add.collider(binaryTokens10, cloudPlatforms)
    this.physics.add.collider(binaryTokens10, gameBoundaries)



    cursors = this.input.keyboard.createCursorKeys();
  
    
}


function update(){

    

    //egg
if (activeAvatar.egg) {
     if (cursors.left.isDown )
     {
         eggPlayer.setVelocityX(-160);

         eggPlayer.anims.play('left', true);
         lastCursor = "left"
     }
     else if (cursors.right.isDown )
     {
         eggPlayer.setVelocityX(160);

         eggPlayer.anims.play('right', true);
         lastCursor = "right"
     }
     else if (lastCursor === "left")
     {
         eggPlayer.setVelocityX(0);

         eggPlayer.anims.play('staticLeft', true);
     }

     else if (lastCursor === "right")
     {
         eggPlayer.setVelocityX(0);

         eggPlayer.anims.play('staticRight', true);
     }

     if (cursors.up.isDown && eggPlayer.body.touching.down )
     {
         eggPlayer.setVelocityY(-400);
     }
}
    //bugs
    if (bugs){
     bugs.children.iterate(function(bug){
        if (bug.body.velocity.x >= 0){
             bug.anims.play("rightbug", true)}
             else
             {
                bug.anims.play("leftbug", true)
             }
        })
    }
    //chicken
    if (activeAvatar.chicken){
    
     if (cursors.left.isDown)
     {
         chickenPlayer.setVelocityX(-160);

         chickenPlayer.anims.play('chickleft', true);
         lastCursor = "left"
     }
     else if (cursors.right.isDown)
     {
         chickenPlayer.setVelocityX(160);

         chickenPlayer.anims.play('chickright', true);
         lastCursor = "right"
     }
     else if (cursors.space.isDown){
         if (lastCursor === "right"){
        chickenPlayer.setVelocityX(520)
     chickenPlayer.anims.play('chickright', true)
         } else if (lastCursor === "left"){
             
             chickenPlayer.setVelocityX(-520)
             chickenPlayer.anims.play('chickleft', true)
         }
     }
     else if (lastCursor === "right")
     {
         chickenPlayer.setVelocityX(0);

         chickenPlayer.anims.play('chickStaticRight', true);
     }
     else if (lastCursor === "left")
     {
         chickenPlayer.setVelocityX(0);

         chickenPlayer.anims.play('chickStaticLeft', true);
     }

     if (cursors.up.isDown && chickenPlayer.body.touching.down)
     {
         chickenPlayer.setVelocityY(-400);
     }
    }
    //king
    if (activeAvatar.king){
    if (cursors.left.isDown)
    {
        kingPlayer.setVelocityX(-160);

        kingPlayer.anims.play('kingleft', true);
        lastCursor = "left"
    }
    else if (cursors.right.isDown)
    {
        kingPlayer.setVelocityX(160);

        kingPlayer.anims.play('kingright', true);
        lastCursor = "right"
    }
    else if (lastCursor === "left")
    {
        kingPlayer.setVelocityX(0);

        kingPlayer.anims.play('kingleft', true);
    }

    else if (lastCursor === "right")
    {
        kingPlayer.setVelocityX(0);

        kingPlayer.anims.play('kingright', true);
    }

    if (cursors.up.isDown && kingPlayer.body.touching.down)
    {
        kingPlayer.setVelocityY(-400);
    }
    }
    // raptor
if (activeAvatar.raptor){
    if (cursors.left.isDown)
    {
        raptorPlayer.setVelocityX(-160);

        raptorPlayer.anims.play('raptorleft', true);
        lastCursor = "left"
    }
    else if (cursors.right.isDown)
    {
        raptorPlayer.setVelocityX(160);

        raptorPlayer.anims.play('raptorright', true);
        lastCursor = "right"
    }

    else if(cursors.space.isDown){
        if (lastCursor === "left"){
            
            raptorPlayer.setVelocityX(0);
            raptorPlayer.anims.play('roarleft', true);
            bugs.children.iterate(function(bug){
                bug.setVelocity(0)
                
            })
        }
        if (lastCursor === "right"){
            raptorPlayer.setVelocityX(0);
            raptorPlayer.anims.play('roarright', true);
        }
        bugs.children.iterate(function(bug){
            bug.setVelocity(0)
        })
    }
    else if (lastCursor === "left")
    {
        raptorPlayer.setVelocityX(0);

        raptorPlayer.anims.play('raptorleft', true);
    }
    else if (lastCursor === "right")
    {
        raptorPlayer.setVelocityX(0);

        raptorPlayer.anims.play('raptorright', true);
    }

    if (cursors.up.isDown && raptorPlayer.body.touching.down)
    {
        raptorPlayer.setVelocityY(-400);
    }
    }

    makeTokens = () => {  
        for (var i = 0; i < 2; i++) {
            var x = Phaser.Math.Between(0, 800);
            var x2 = Phaser.Math.Between(0, 800);
            var tokens = binaryTokens.create(x, 16, 'binary');
            var tokens10 = binaryTokens10.create(x2, 16,'binary10');

    //     var tokens = scene.physics.add.group({
    //     key: 'binary',
    //     repeat: 2,
    //     setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70 }
    // }); 
    // var tokens10 = scene.physics.add.group({
    //     key: 'binary10',
    //     repeat: 2,
    //     setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70 }
    // }); 
        
        tokens.setScale(0.3);
        tokens10.setScale(0.3);
        tokens10.setBounce(1,0);
        tokens.setBounce(1,0);
        tokens10.setCollideWorldBounds(true);
        tokens.setCollideWorldBounds(true);
        this.physics.add.collider(tokens, cloudPlatforms);
        this.physics.add.collider(tokens, gameBoundaries);
         this.physics.add.collider(tokens10, cloudPlatforms);
         this.physics.add.collider(tokens10, gameBoundaries);
         
         setTimeout(() => {
            tokens.disableBody(true, true);
          }, 1000)
          setTimeout(() => {
            tokens10.disableBody(true, true);
          }, 1000)
        
    // this.physics.add.collider(tokens, cloudPlatforms)
    // this.physics.add.collider(tokens, gameBoundaries)
    // this.physics.add.collider(tokens10, cloudPlatforms)
    // this.physics.add.collider(tokens10, gameBoundaries)
    }
    
}

this.physics.add.collider(eggPlayer, bugs, eggBugHit, null, this);

function eggBugHit(eggPlayer, bug){
    if (bug.body.touching.up){
        this.evoBarInterior.displayWidth += 457/5
        score += 10;
    scoreText.setText(`${score}`);
    makeTokens()
    bug.disableBody(true, true)}
    else if (bug.body.touching.left || bug.body.touching.right || bug.body.touching.down){
            if ( this.evoBarInterior.displayWidth >= 15) {
                this.evoBarInterior.displayWidth -= 15
            }
        eggPlayer.setTint(0xff0000)  
        setTimeout(() => {
            eggPlayer.clearTint()
        }, 1000)  
        score -= 10;
        scoreText.setText(`${score}`);
        }

    if (this.evoBarInterior.displayWidth >= 457){
        this.evoBarInterior.displayWidth = 0
        
        activeAvatar.egg = false
        activeAvatar.chicken = true
        
        becomeChicken(eggPlayer)
        
        
     }
    }
    function becomeChicken(player){
       
        player.setTexture( "chicken")
        chickenPlayer.enableBody(true, eggPlayer.x, eggPlayer.y,true, true)
        eggPlayer.disableBody(true,true)

        scene.physics.add.collider(chickenPlayer, bugs, chickenBugHit, null, scene)
       
        
    }

    function chickenBugHit(chickenPlayer, bug) {
        if(bug.body.touching.up || cursors.space.isDown){
            this.evoBarInterior.displayWidth += 457/7
            score += 10;
            scoreText.setText(`${score}`);
            makeTokens()
            bug.disableBody(true,true)
        }
        else if (bug.body.touching.left || bug.body.touching.right || bug.body.touching.down){
            chickenPlayer.setTint(0xff0000)  
                    setTimeout(() => {
                        chickenPlayer.clearTint()
                    }, 1000) ;
                this.evoBarInterior.displayWidth -= 15
                score -= 10;
                scoreText.setText(`${score}`);
                if (this.evoBarInterior.displayWidth <= 0){
                        becomeEgg(chickenPlayer)
                     }
            } 
        
        if (this.evoBarInterior.displayWidth >= 457){
            this.evoBarInterior.displayWidth = 0
    
            activeAvatar.chicken = false
            activeAvatar.raptor = true
            
            becomeRaptor(chickenPlayer)    
    
            }
        }

        function becomeRaptor(chickenPlayer){
            
            chickenPlayer.setTexture( "raptor")
            raptorPlayer.enableBody(true, chickenPlayer.x, chickenPlayer.y,true, true)
            chickenPlayer.disableBody(true,true)
            scene.physics.add.collider(raptorPlayer, bugs, raptorBugHit, null, scene)
        }

        function raptorBugHit(raptorPlayer, bug){
            if(bug.body.touching.up){
                this.evoBarInterior.displayWidth += 457/10
                score += 10;
                scoreText.setText(`${score}`)
                bug.disableBody(true, true)
                makeTokens()
             } else if  (bug.body.touching.left || bug.body.touching.right || bug.body.touching.down){
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
            

            
            if (this.evoBarInterior.displayWidth >= 457){
                this.evoBarInterior.displayWidth = 0
    
                activeAvatar.raptor = false
                activeAvatar.king = true
                
                becomeKing(raptorPlayer)    
        
                }
            
        }
        correctUnderBottom(eggPlayer)
        correctUnderBottom(chickenPlayer)
        correctUnderBottom(raptorPlayer)
        correctUnderBottom(kingPlayer)
//this function corrects for when the player gets pushed to underneath the bottom
        function correctUnderBottom(player){
            if (player.y>=669){
                player.y = 661
            }
        }

        function becomeKing(raptorPlayer){
            ;
            console.log(raptorPlayer.y)
            //corrected the king falling through the floor when changing from raptor
            let y = (raptorPlayer.y >= 669) ? 661.4 : raptorPlayer.y
            kingPlayer.enableBody(true, raptorPlayer.x, y, true, true);
            raptorPlayer.setTexture("king");
            console.log(kingPlayer);
            raptorPlayer.disableBody(true, true);
            scene.physics.add.collider(kingPlayer, bugs, kingBugHit, null, scene);
        }

        function kingBugHit(kingPlayer, bug){
            if (bug.body.touching.up){
                this.evoBarInterior.displayWidth += 30
                score += 10;
            scoreText.setText(`${score}`);
            bug.disableBody(true, true)
            makeTokens()}
            else if (bug.body.touching.left || bug.body.touching.right || bug.body.touching.down){
                kingPlayer.setTint(0xff0000)  
        setTimeout(() => {
            kingPlayer.clearTint()
        }, 1000)  
        this.evoBarInterior.displayWidth -= 15
                score -= 10;
                scoreText.setText(`${score}`);
                }
if (this.evoBarInterior.displayWidth >= 443){
    this.evoBarInterior.displayWidth = 443
}                
if (this.evoBarInterior.displayWidth <= 0){
                    becomeEgg(kingPlayer)

                }

        }

        function becomeEgg(player){

            player.setTexture( 'egg')
            eggPlayer.enableBody(true, player.x, player.y,true, true)
            player.disableBody(true,true)
            activeAvatar.egg = true;
            // activeAvatar.king = false
            scene.physics.add.collider(eggPlayer, bugs, eggBugHit, null, scene)
           
  
        }

        this.physics.add.overlap(eggPlayer, binaryTokens, collectBinary, null, this);
        this.physics.add.overlap(chickenPlayer, binaryTokens, collectBinary, null, this);
        this.physics.add.overlap(raptorPlayer, binaryTokens, collectBinary, null, this);
        this.physics.add.overlap(kingPlayer, binaryTokens, collectBinary, null, this);
        this.physics.add.overlap(eggPlayer, binaryTokens10, collectBinary10, null, this);
        this.physics.add.overlap(chickenPlayer, binaryTokens10, collectBinary10, null, this);
        this.physics.add.overlap(raptorPlayer, binaryTokens10, collectBinary10, null, this);
        this.physics.add.overlap(kingPlayer, binaryTokens10, collectBinary10, null, this);
        
        function collectBinary(player, binaryTokens) {
            binaryTokens.disableBody(true, true)
            score += 10;
            scoreText.setText(`${score}`);
            this.evoBarInterior.displayWidth += 15

          } 

          function collectBinary10(player, binaryTokens10) {
            if (this.evoBarInterior.displayWidth >= 443){
                this.evoBarInterior.displayWidth = 443
                console.log(player.texture.key)
            }
            binaryTokens10.disableBody(true, true)
            score += 10;
            scoreText.setText(`${score}`);
            this.evoBarInterior.displayWidth += 15

          } 

    }