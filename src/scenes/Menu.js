class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }
  preload() {
    // load audio
    this.load.audio("sfx_select", "./assets/blip_select12.wav");
    this.load.audio("sfx_explosion", "./assets/explosion38.wav");
    this.load.audio("sfx_rocket", "./assets/rocket_shot.wav");
    this.load.image("menu", "./assets/menu.png");
  }
  create() {

    this.add.sprite(game.config.width / 2, game.config.height / 2,"menu").setOrigin(0.5);

    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }
  update() {
    // Skip Menu
    // game.settings = {
    //   spaceshipSpeed: 3,
    //   speedshipSpeed: 5,
    //   gameTimer: 5,
    //   twoPlayer: true
    // }
    // this.scene.start('playScene')


    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode and p1 mode
      game.settings = {
        spaceshipSpeed: 3,
        speedshipSpeed: 5,
        gameTimer: 60,
        twoPlayer: false,
      };
      this.sound.play("sfx_select");
      this.scene.start("playScene");
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode and p2 mode
      game.settings = {
        spaceshipSpeed: 4,
        speedshipSpeed: 6,
        gameTimer: 45,
        twoPlayer: true,
      };
      this.sound.play("sfx_select");
      this.scene.start("playScene");
    }
  }
}
