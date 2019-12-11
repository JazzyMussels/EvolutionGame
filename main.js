var config = {
    type: Phaser.CANVAS,
    width: 1450,
    height: 724,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    fps: {target: 2}
};

var game = new Phaser.Game(config);


