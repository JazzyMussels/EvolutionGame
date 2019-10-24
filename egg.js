class Egg extends Phaser.Scene {
    constructor() {
        super({key:'egg'});
    }

    preload (){
        this.load.image('eggscreen', 'assets/egg_screen.png')
        this.load.spritesheet('egg', 'assets/eggsprite.png', { frameWidth: 76, frameHeight: 88 })
        
    }

    create(){
        
    }
}