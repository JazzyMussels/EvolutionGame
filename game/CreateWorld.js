function create() {
  //soundtrack
  music = this.sound.add("soundtrack");
  music.setLoop(true);
  music.play();

  //sound-effects
  cake = this.sound.add("cake");
  coins = this.sound.add("coins");
  eggSound = this.sound.add("eggSound");
  gobble = this.sound.add("gobble");
  levelDown = this.sound.add("level_down");
  levelUp = this.sound.add("level_up");
  scream = this.sound.add("scream");
  squish = this.sound.add("squish");
  devolve = this.sound.add("devolve");

  //  background
  this.background = this.add.image(0, 0, "background");
  this.background.setOrigin(0, 0);

 

  // evolve-bar
  this.evoBarShell = this.add.image(295, 40, "outer_shell");
  this.evoBarShell.setScale(1.8);
  this.evoBarInterior = this.add.image(66, 21, "inner_bar").setOrigin(0, 0);
  this.evoBarInterior.setScale(1.8);
  this.evoBarInterior.displayWidth = 0;



   sideBar = this.add.image(1305, 360, "eggscreen");
   scoreText = this.add.text(1233, 90, `${score}`, {
    fontSize: "41px",
    fill: "#1df4ff"
    });

     // scorecard
  this.scoreCard = this.add.image(1290, 43, "scorecard");
  this.scoreCard.setScale(0.6);

  // boundaries

  gameBoundaries = this.physics.add.staticGroup();
  cloudPlatforms = this.physics.add.staticGroup();

  gameBoundaries.create(575, 714, "horizontalboundary");
  gameBoundaries.create(1138, 355, "verticalboundary");
  gameBoundaries.create(9, 355, "verticalboundary");

  //mid-center
  cloudPlatforms.create(450, 410, "cloud");
  cloudPlatforms.create(700, 410, "cloud");
  cloudPlatforms.create(550, 380, "cloud");
  //bottom-mid-right
  cloudPlatforms.create(900, 570, "cloud");
  cloudPlatforms.create(1040, 440, "cloud");

  //bottom-left
  cloudPlatforms.create(200, 560, "cloud");

  //egg
  eggPlayer = this.physics.add.sprite(100, 653, "egg");
  eggPlayer.setScale(0.8);
  eggPlayer.setBounce(0);
  eggPlayer.setCollideWorldBounds(true);

  this.physics.add.collider(eggPlayer, cloudPlatforms);
  this.physics.add.collider(eggPlayer, gameBoundaries);
 
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("egg", { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "staticLeft",
    frames: [{ key: "egg", frame: 1 }],
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "staticRight",
    frames: [{ key: "egg", frame: 15 }],
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("egg", { start: 8, end: 15 }),
    frameRate: 10,
    repeat: -1
  });

  //keeps track of what avatar is active
  activeAvatar.egg = true;
  //makes a variable of "this" when inside functions
  scene = this;
  //bugs function 

  bugs = this.physics.add.group({
    key: "bug",
    repeat: 3,
    setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70 }
  });

  this.physics.add.collider(bugs, gameBoundaries);
  this.physics.add.collider(bugs, cloudPlatforms);
  this.anims.create({
    key: "leftbug",
    frames: [{ key: "bug", frame: 0 }],
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "rightbug",
    frames: [{ key: "bug", frame: 1 }],
    frameRate: 10,
    repeat: -1
  });

  bugs.children.iterate(function(bug) {
    bug.setCollideWorldBounds(true);
    bug.setScale(0.5, 0.5);
    bug.setBounce(1, 0);
    bug.setVelocityX(-220);
  });

  if (activeAvatar.egg) {
    this.time.addEvent({
      delay: 3000,
      callback: createBug, // End callback for adding enemies
      callbackScope: this,
      loop: true
    });
  } else if (activeAvatar.chicken) {
    this.time.addEvent({
      delay: 2000,
      callback: createBug, // End callback for adding enemies
      callbackScope: this,
      loop: true
    });
  } else if (activeAvatar.raptor) {
    this.time.addEvent({
      delay: 1000,
      callback: createBug, // End callback for adding enemies
      callbackScope: this,
      loop: true
    });
  } else if (activeAvatar.king) {
    this.time.addEvent({
      delay: 700,
      callback: createBug, // End callback for adding enemies
      callbackScope: this,
      loop: true
    });
  }
  function createBug() {
        for (var i = 0; i < 2; i++) {
        var x = Phaser.Math.RND.between(0, 700);
        var bug = bugs.create(x, 16, "bug");
        bug.setCollideWorldBounds(true);
        bug.setScale(0.5, 0.5);
        bug.setBounce(1, 0);
        bug.setVelocityX(-170);
        }
    }

  makeTokens = () => {
    for (var i = 0; i < 2; i++) {
      if (i === 0) {
        var x = Phaser.Math.Between(0, 800);
        var tokens = binaryTokens.create(x, 16, "binary");
        tokens.setScale(0.3);
        tokens.setBounce(1, 0);
        tokens.setCollideWorldBounds(true);
        this.physics.add.collider(tokens, cloudPlatforms);
        this.physics.add.collider(tokens, gameBoundaries);
        setTimeout(() => {
          tokens.destroy();
        }, 4000);
      } else {
        var x1 = Phaser.Math.Between(0, 800);
        var tokens1 = binaryTokens.create(x1, 16, "binary");
        tokens1.setScale(0.3);
        tokens1.setBounce(1, 0);
        tokens1.setCollideWorldBounds(true);
        this.physics.add.collider(tokens1, cloudPlatforms);
        this.physics.add.collider(tokens1, gameBoundaries);
        setTimeout(() => {
          tokens1.destroy();
        }, 4000);
      }
    }
  };

  //chicken
  chickenPlayer = this.physics.add.sprite(100, 650, "chicken");
  chickenPlayer.setScale(1.2);
  chickenPlayer.setBounce(0);
  chickenPlayer.setCollideWorldBounds(true);
  this.physics.add.collider(chickenPlayer, cloudPlatforms);
  this.physics.add.collider(chickenPlayer, gameBoundaries);
  

  this.anims.create({
    key: "chickleft",
    frames: this.anims.generateFrameNumbers("chicken", { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "chickStaticRight",
    frames: [{ key: "chicken", frame: 3 }],
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "chickStaticLeft",
    frames: [{ key: "chicken", frame: 2 }],
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "chickright",
    frames: this.anims.generateFrameNumbers("chicken", { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  chickenPlayer.disableBody(true, true);

  // king
  kingPlayer = this.physics.add.sprite(100, 650, "king");
  kingPlayer.setScale(0.9);
  kingPlayer.setBounce(0);
  kingPlayer.setCollideWorldBounds(true);
  this.physics.add.collider(kingPlayer, cloudPlatforms);
  this.physics.add.collider(kingPlayer, gameBoundaries);



  this.anims.create({
    key: "kingleft",
    frames: this.anims.generateFrameNumbers("king", { start: 0, end: 0 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "kingturn",
    frames: [{ key: "king", frame: 1 }],
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "kingright",
    frames: [{ key: "king", frame: 1 }],
    frameRate: 10,
    repeat: -1
  });
  kingPlayer.disableBody(true, true);

  //raptor
  raptorPlayer = this.physics.add.sprite(100, 650, "raptor");
  raptorPlayer.setScale(0.5);
  raptorPlayer.setCollideWorldBounds(true);

  this.physics.add.collider(raptorPlayer, cloudPlatforms);
  this.physics.add.collider(raptorPlayer, gameBoundaries);

  this.anims.create({
    key: "raptorleft",
    frames: this.anims.generateFrameNumbers("raptor", { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "raptorStaticRight",
    frames: [{ key: "raptor", frame: 6 }],
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "raptorStaticLeft",
    frames: [{ key: "raptor", frame: 1 }],
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "roarleft",
    frames: [{ key: "raptor", frame: 3 }],
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "roarright",
    frames: [{ key: "raptor", frame: 4 }],
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "raptorright",
    frames: this.anims.generateFrameNumbers("raptor", { start: 5, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  raptorPlayer.disableBody(true, true);

  //  cake ammo
  cakes = this.physics.add.group({
    key: "cake",
    maxSize: 50,
    setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70 }
  });
  cakes.children.iterate(function(cakeAmmo) {
    cakeAmmo.setScale(0.5);
    cakeAmmo.setBounce(0);
    cakeAmmo.setCollideWorldBounds(true);
    cakeAmmo.destroy();
    
  });

  shootCake = (velocity) => {
    var cakeAmmo = cakes.create(kingPlayer.x, kingPlayer.y, "cake");
        cakeAmmo.setVelocityX(velocity);
        cakeAmmo.fireRate = 5
        setTimeout(() => {
          cakeAmmo.destroy();
        }, 1000);
  }

  this.physics.add.collider(cakes, cloudPlatforms);
  this.physics.add.collider(cakes, gameBoundaries);

  // binary
  binaryTokens = this.physics.add.group({
    key: "binary",
    setXY: { x: Phaser.Math.Between(0, 900), y: 0, stepX: 70 }
  });
  

  binaryTokens.children.iterate(function(token) {
    token.setScale(0.3);
    token.setBounce(0.3);
    token.setCollideWorldBounds(true);
    setTimeout(() => {
      token.destroy();
    }, 4000);
  });

  this.physics.add.collider(binaryTokens, cloudPlatforms);
  this.physics.add.collider(binaryTokens, gameBoundaries);

  cursors = this.input.keyboard.createCursorKeys();



}
