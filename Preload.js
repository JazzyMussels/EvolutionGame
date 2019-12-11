    function preload() {

//scorecard

     this.load.image('scorecard', 'assets/high_score_screen.png');
     this.load.image('outer_shell', 'assets/outer_shell.png');
     this.load.image('inner_bar', 'assets/inner_bar.jpg');
 
//background and status screens

     this.load.image('background', 'assets/background.png');
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
     this.load.image('cake', 'assets/newrightcake.png')
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

