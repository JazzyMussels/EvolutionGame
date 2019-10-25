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
var activeAvatar = {egg: true, chicken: false, raptor: false, king: false, restart: false}
var lastCursor;
var scene;
var cake;
var coins; 
var eggSound; 
var gobble; 
var levelDown; 
var levelUp; 
var scream; 
var squish; 
var touchingObj;
var scoreText;
var cakeFire;
var devolve;

function preload ()
{
     //scorecard
     this.load.image('scorecard', 'assets/high_score_screen.png');
     this.load.image('outer_shell', 'assets/outer_shell.png');
     this.load.image('inner_bar', 'assets/inner_bar.jpg');
 
//background and status screens
this.load.image('background', 'assets/background.png');
this.load.image('introscreen', 'assets/intro_screen.png')
this.load.image('loginscreen', 'assets/login_screen.png')
this.load.image('eggscreen', 'assets/egg_screen.png')
this.load.image('chickenscreen', 'assets/chicken_screen.png')
this.load.image('raptorscreen', 'assets/raptor_screen.png')
this.load.image('kingscreen', 'assets/king_screen.png')
this.load.image('restartscreen', 'assets/startfresh.png')


//boundaries and platforms
this.load.image('horizontalboundary', 'assets/cupboundhorizontal.png')
this.load.image('verticalboundary', 'assets/cupboundvertical.png')
this.load.image('cloud', 'assets/cloud.png')

//character sprites 
this.load.spritesheet('egg', 'assets/eggsprite.png', { frameWidth: 76, frameHeight: 88 })
this.load.spritesheet('chicken', 'assets/chickensprite.png', { frameWidth: 82, frameHeight: 60 })
this.load.spritesheet('raptor', 'assets/raptorsprite.png', { frameWidth: 186, frameHeight: 129 })
this.load.spritesheet('king', 'assets/kingsprite.png', { frameWidth: 77, frameHeight: 88 })
this.load.image('binary', 'assets/binarysprite.png', { frameWidth: 76, frameHeight: 88 })
this.load.spritesheet('cake', 'assets/cakesprite.png', { frameWidth: 200, frameHeight: 211 })
this.load.spritesheet('bug', 'assets/bugsprite.png', { frameWidth: 80, frameHeight: 60 });

//sound
this.load.audio('soundtrack', 'assets/sounds/soundtrack.mp3')
this.load.audio('cake', 'assets/sounds/cake.mp3')
this.load.audio('coins', 'assets/sounds/coins.mp3')
this.load.audio('eggSound', 'assets/sounds/egg.mp3')
this.load.audio('gobble', 'assets/sounds/gobble.mp3')
this.load.audio('level_down', 'assets/sounds/level_down.mp3')
this.load.audio('level_up', 'assets/sounds/level_up.mp3')
this.load.audio('scream', 'assets/sounds/scream.mp3')
this.load.audio('squish', 'assets/sounds/squish.mp3')
this.load.audio('devolve', 'assets/sounds/devolve.mp3')
}


function create ()
{
 
    //soundtrack
    let music = this.sound.add('soundtrack')
    music.setLoop(true);
    music.play()

    //sound-effects
    cake = this.sound.add('cake')
    coins = this.sound.add('coins')
    eggSound = this.sound.add('eggSound')
    gobble = this.sound.add('gobble')
    levelDown = this.sound.add('level_down')
    levelUp = this.sound.add('level_up')
    scream = this.sound.add('scream')
    squish = this.sound.add('squish')
    devolve = this.sound.add('devolve')


    //  background
    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0,0)

    // scorecard
    this.scoreCard = this.add.image(1020, 40, 'scorecard')
    this.scoreCard.setScale(0.6)
     //score
    //  scoreText = this.add.text(1283, 20, '0', { fontSize: '41px', fill: '#1df4ff' });
    // divLine = this.add.text(1200, 40, '--------', { fontSize: '41px', fill: '#1df4ff' });
    
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


// if((bugs.countActive(true) < 10)){
    
if (activeAvatar.egg){
    this.time.addEvent({
        delay: 4000,
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
        delay: 2000,
        callback: createBug, // End callback for adding enemies
        callbackScope: this,
        loop: true
    })}
else if (activeAvatar.king){
    this.time.addEvent({
        delay: 700,
        callback: createBug, // End callback for adding enemies
        callbackScope: this,
        loop: true
    })
}
function createBug(){
    for (var i = 0; i < 2; i++) {
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
      
      chickenPlayer.setScale(1.2)
      chickenPlayer.setBounce(0);
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
        key: 'raptorStaticRight',
        frames: [ { key: 'raptor', frame: 7 } ],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'raptorStaticLeft',
        frames: [ { key: 'raptor', frame: 0 } ],
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

    //  cake ammo
    cakes = this.physics.add.group({
        key: 'cake',
        setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70 }
    })
    cakes.children.iterate(function(cakeAmmo){
        cakeAmmo.setScale(0.18)
        cakeAmmo.setBounce(0);
        cakeAmmo.setCollideWorldBounds(true)
         cakeAmmo.disableBody(true,true)
        
    })
    
    this.physics.add.collider(cakes, cloudPlatforms)
    this.physics.add.collider(cakes, gameBoundaries)

     
 
   
     this.anims.create({
        key: 'cakeleft',
        frames: [ { key: 'cake', frame: 0 } ],
        frameRate: 10,
        repeat: -1
    });


    this.anims.create({
        key: 'cakeright',
        frames: [ { key: 'cake', frame: 1 } ],
        frameRate: 10,
        repeat: -1

       
    });

    // binary
    binaryTokens = this.physics.add.group({
        key: 'binary',
        setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70}
    }); 
   
    binaryTokens.children.iterate(function(token){
       token.setScale(.3);
        token.setBounce(0.3);
        token.setCollideWorldBounds(true)
        setTimeout(() => {
            token.disableBody(true, true);
          }, 4000)
    })
    
   

    this.physics.add.collider(binaryTokens, cloudPlatforms)
    this.physics.add.collider(binaryTokens, gameBoundaries)
   


    cursors = this.input.keyboard.createCursorKeys();
  
    
}


function update(){

    if(activeAvatar.restart && activeAvatar.egg){
        this.restartScreen = this.add.image(1302, 480, 'restartscreen')
        
    }   else if (activeAvatar.egg){
        this.eggScreen = this.add.image(1305, 555, 'eggscreen')
        }
        else if (activeAvatar.chicken){
        
        this.chickenScreen = this.add.image(1305, 510, 'chickenscreen')
        }
        else if (activeAvatar.raptor){
        
        this.raptorScreen = this.add.image(1302, 544, 'raptorscreen')
        }
        else if (activeAvatar.king){
       this.kingScreen = this.add.image(1302, 580, 'kingscreen')
        }
        scoreText = this.add.text(1216, 20, `${score}`, { fontSize: '41px', fill: '#1df4ff' });
    divLine = this.add.text(1200, 40, '--------', { fontSize: '41px', fill: '#1df4ff' });
        
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
        eggSound.play()
         eggPlayer.setVelocityY(-375);
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
    else if (cursors.space.isDown){
        if (lastCursor === "left"){
            
            kingPlayer.setVelocityX(0);
            var cakeAmmo = cakes.create(kingPlayer.x, kingPlayer.y, 'cake')
             cakeAmmo.anims.play('cakeleft', true);
             cakeAmmo.setScale(0.18)
             cakeAmmo.setBounce(0);
             
             cakeAmmo.setCollideWorldBounds(true)
            cakeAmmo.setVelocityX(-200)
            setTimeout(() =>{
                cakeAmmo.destroy();},1000)
        
        }
        if (lastCursor === "right"){
        
            kingPlayer.setVelocityX(0);
            var cakeAmmo = cakes.create(kingPlayer.x, kingPlayer.y, 'cake')
             cakeAmmo.anims.play('cakeright', true);
             cakeAmmo.setScale(0.18)
        cakeAmmo.setBounce(0);

        cakeAmmo.setCollideWorldBounds(true)
            cakeAmmo.setVelocityX(200)
            setTimeout(() =>{
                cakeAmmo.destroy();},1000)
        }
        
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
        scream.play()
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
    //probably source of bug with dino movement
    else if (lastCursor === "left")
    {
        raptorPlayer.setVelocityX(0);

        raptorPlayer.anims.play('raptorStaticLeft', true);
    }
    else if (lastCursor === "right")
    {
        raptorPlayer.setVelocityX(0);

        raptorPlayer.anims.play('raptorStaticRight', true);
    }

    if (cursors.up.isDown && raptorPlayer.body.touching.down)
    {
        raptorPlayer.setVelocityY(-400);
    }
    }

    makeTokens = () => {  
        for (var i = 0; i < 2; i++) {
            if (i === 0){
                var x = Phaser.Math.Between(0, 800);
                var tokens = binaryTokens.create(x, 16, 'binary');
                tokens.setScale(0.3);
       
                tokens.setBounce(1,0);
                tokens.setCollideWorldBounds(true);
                this.physics.add.collider(tokens, cloudPlatforms);
                this.physics.add.collider(tokens, gameBoundaries);
               
                 setTimeout(() => {
                    tokens.disableBody(true, true);
                  }, 8000)
            }
            else {
                var x1 = Phaser.Math.Between(0, 800);
                var tokens1 = binaryTokens.create(x1, 16, 'binary');
                tokens1.setScale(0.3);
       
                tokens1.setBounce(1,0);
                tokens1.setCollideWorldBounds(true);
                this.physics.add.collider(tokens1, cloudPlatforms);
                this.physics.add.collider(tokens1, gameBoundaries);
               
                 setTimeout(() => {
                    tokens1.disableBody(true, true);
                  }, 8000)
                }
            }
         
        
       
    
}

this.physics.add.collider(eggPlayer, bugs, eggBugHit, null, this);

function eggBugHit(eggPlayer, bug){
    if (bug.body.touching.up){
        squish.play()
        this.evoBarInterior.displayWidth += 457/5
        score += 50;
    scoreText.setText(`${score}`);
    makeTokens()
    bug.destroy()}
    else if (bug.body.touching.left || bug.body.touching.right || bug.body.touching.down){
        levelDown.play()
        score -= 10;
        scoreText.setText(`${score}`);
        touchingObj = bug.body.touching
      bugHurt(bug, eggPlayer, touchingObj)
    }

    if (this.evoBarInterior.displayWidth >= 457){
        this.evoBarInterior.displayWidth = 0
        
        activeAvatar.egg = false
        activeAvatar.chicken = true
        
        becomeChicken(eggPlayer)
        levelUp.play()
        
        
     }
    }

    function bugHurt(bug, player, touchingObj){
        
         if (touchingObj.left){
            bug.setVelocityX(160)
        }
        else if (touchingObj.right){
            bug.setVelocityX(-160)
        }
        else if (touchingObj.down){
            bug.setVelocityY(-300)
            setTimeout(()=>{
                bug.setVelocityY(0)
            }, 1000)
        }
        levelDown.play()
        player.setTint(0xff0000)  
        setTimeout(() => {
            player.clearTint()
        }, 1000)  
            if ( scene.evoBarInterior.displayWidth >= 15) {
                scene.evoBarInterior.displayWidth -= 15
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
            gobble.play()
            squish.play()
            this.evoBarInterior.displayWidth += 65
            score += 50;
            scoreText.setText(`${score}`);
            makeTokens()
            bug.disableBody(true,true)
            bug.destroy()
            
        }
        else if (bug.body.touching.left || bug.body.touching.right || bug.body.touching.down){
            levelDown.play()
            touchingObj = bug.body.touching
            bugHurt(bug, chickenPlayer, touchingObj)
            score -= 10;
            scoreText.setText(`${score}`);
            } 
        
        if (this.evoBarInterior.displayWidth >= 457){
            becomeRaptor(chickenPlayer) 
            activeAvatar.chicken = false
            activeAvatar.raptor = true
            levelUp.play() 
            this.evoBarInterior.displayWidth = 30
            }
            if (this.evoBarInterior.displayWidth <= 0){
                becomeEgg(chickenPlayer)
                this.evoBarInterior.displayWidth = 30
                devolve.play()
            
        }
        }

        function becomeRaptor(chickenPlayer){
            
            chickenPlayer.setTexture( "raptor")
            raptorPlayer.enableBody(true, chickenPlayer.x, chickenPlayer.y,true, true)
            chickenPlayer.disableBody(true,true)
            scene.physics.add.collider(raptorPlayer, bugs, raptorBugHit, null, scene)
        }

        function raptorBugHit(raptorPlayer, bug){
            if (this.evoBarInterior.displayWidth <= 0){
                becomeEgg(raptorPlayer)
                devolve.play()
            
        }
            if(bug.body.touching.up){
                squish.play()
                this.evoBarInterior.displayWidth += 457/10
                score += 50;
                scoreText.setText(`${score}`)
                bug.destroy()
                makeTokens()
             } else if  (bug.body.touching.left || bug.body.touching.right || bug.body.touching.down){
                 levelDown.play()
                 touchingObj = bug.body.touching
                 bugHurt(bug, raptorPlayer, touchingObj)
                 score -= 10;
                 scoreText.setText(`${score}`);
             }
            if (this.evoBarInterior.displayWidth >= 457){
                becomeKing(raptorPlayer) 
                activeAvatar.raptor = false
                activeAvatar.king = true 
                levelUp.play()  
                this.evoBarInterior.displayWidth = 30
                
                
                
                
        
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
            //corrected the king falling through the floor when changing from raptor
            let y = (raptorPlayer.y >= 669) ? 661.4 : raptorPlayer.y
            kingPlayer.enableBody(true, raptorPlayer.x, y, true, true);
            raptorPlayer.setTexture("king");
            ;
            raptorPlayer.disableBody(true, true);
            scene.physics.add.collider(kingPlayer, bugs, kingBugHit, null, scene);
        }

        function kingBugHit(kingPlayer, bug){
            if (bug.body.touching.up){
                squish.play()
                this.evoBarInterior.displayWidth += 30
                score += 50;
            scoreText.setText(`${score}`);
            bug.destroy()
            makeTokens()}
            else if (bug.body.touching.left || bug.body.touching.right || bug.body.touching.down){
                levelDown.play()
                touchingObj = bug.body.touching
                bugHurt(bug, kingPlayer, touchingObj)
                score -= 10;
                scoreText.setText(`${score}`);
                }
if (this.evoBarInterior.displayWidth >= 443){
    this.evoBarInterior.displayWidth = 443
}                
if (this.evoBarInterior.displayWidth <= 0){
                    becomeEgg(kingPlayer)
                    devolve.play()

                }

        }

        // game.world.bringToTop(scoreText)
        function becomeEgg(player){

            player.setTexture( 'egg')
            eggPlayer.enableBody(true, player.x, player.y,true, true)
            player.disableBody(true,true)
            activeAvatar.restart = true
            activeAvatar.egg = true
             activeAvatar.king = false
             activeAvatar.chicken = false
             activeAvatar.raptor = false
            scene.physics.add.collider(eggPlayer, bugs, eggBugHit, null, scene)
            setTimeout(()=>{
                activeAvatar.restart = false;
            }, 10000)
            
            
           
        }

        this.physics.add.overlap(eggPlayer, binaryTokens, collectBinary, null, this);
        this.physics.add.overlap(chickenPlayer, binaryTokens, collectBinary, null, this);
        this.physics.add.overlap(raptorPlayer, binaryTokens, collectBinary, null, this);
        this.physics.add.overlap(kingPlayer, binaryTokens, collectBinary, null, this);
     
        scene.physics.add.collider(cakes, bugs, cakeBugHit, null, scene)
        scene.physics.add.collider(cakes, cloudPlatforms, cakeWallHit, null, scene)
        scene.physics.add.collider(cakes, gameBoundaries, cakeWallHit, null, scene)

        function cakeBugHit(cakeAmmo, bug){
            this.evoBarInterior.displayWidth += 30
            cake.play()
            score += 50;
            scoreText.setText(`${score}`);
            cakeAmmo.destroy()
            bug.destroy()
            makeTokens()

        }

        function cakeWallHit(cakeAmmo, wall){
            cakeAmmo.destroy()
        }
       
        
        function collectBinary(player, binaryTokens) {
            coins.play()
            binaryTokens.destroy()
            score += 100;
            scoreText.setText(`${score}`);
          } 
          
          
          
        // game.canvas.bringToTop(scoreText)
        

    }