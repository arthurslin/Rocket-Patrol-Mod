class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }
  preload() {
    // load images/tile sprites
    this.load.image("rocket", "./assets/rocket.png");
    this.load.image("spaceship", "./assets/spaceship.png");
    this.load.image("speedship", "./assets/speedship.png");
    this.load.image("starfield", "./assets/starfield.png");
    this.load.image("greenpop", "./assets/greenpop.png");
    this.load.spritesheet("explosion", "./assets/explosion.png", {
      frameWidth: 64,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 9,
    });
  }
  create() {
    this.starfield = this.add
      .tileSprite(0, 0, 640, 480, "starfield")
      .setOrigin(0, 0);
    // green UI background
    this.add
      .rectangle(
        0,
        borderUISize + borderPadding,
        game.config.width,
        borderUISize * 2,
        0x00ff00
      )
      .setOrigin(0, 0);
    // white borders
    this.add
      .rectangle(0, 0, game.config.width, borderUISize, 0xffffff)
      .setOrigin(0, 0);
    this.add
      .rectangle(
        0,
        game.config.height - borderUISize,
        game.config.width,
        borderUISize,
        0xffffff
      )
      .setOrigin(0, 0);
    this.add
      .rectangle(0, 0, borderUISize, game.config.height, 0xffffff)
      .setOrigin(0, 0);
    this.add
      .rectangle(
        game.config.width - borderUISize,
        0,
        borderUISize,
        game.config.height,
        0xffffff
      )
      .setOrigin(0, 0);
    // add rocket (p1)
    this.p1Rocket = new Rocket(
      this,
      game.config.width / 1.5,
      game.config.height - borderUISize - borderPadding,
      "rocket"
    ).setOrigin(0.5, 0);

    // add rocket (p2)
    if (game.settings.twoPlayer == true) {
      this.p2Rocket = new Rocketp2(
        this,
        game.config.width / 3,
        game.config.height - borderUISize - borderPadding,
        "rocket"
      ).setOrigin(0.5, 0);
    }

    this.ship01 = new Spaceship(
      this,
      game.config.width + borderUISize * 6,
      borderUISize * 4,
      "spaceship",
      0,
      30
    ).setOrigin(0, 0);
    this.ship02 = new Spaceship(
      this,
      game.config.width + borderUISize * 3,
      borderUISize * 5 + borderPadding * 2,
      "spaceship",
      0,
      20
    ).setOrigin(0, 0);
    this.ship03 = new Spaceship(
      this,
      game.config.width,
      borderUISize * 6 + borderPadding * 4,
      "spaceship",
      0,
      10
    ).setOrigin(0, 0);
    this.sship = new Speedship(
      this,
      game.config.width,
      borderUISize * 6 + borderPadding * 2.25,
      "speedship",
      0,
      40
    ).setOrigin(0, 0);
    this.sship.setScale(0.5);

    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 9,
        first: 0,
      }),
      frameRate: 30,
    });
    this.p1Score = 0;
    // display score
    let scoreConfig = {
      fontFamily: "Courier",
      fontSize: "28px",
      backgroundColor: "#F3B141",
      color: "#843605",
      align: "right",
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100,
    };
    this.scoreLeft = this.add.text(
      borderUISize + borderPadding,
      borderUISize + borderPadding * 2,
      this.p1Score,
      scoreConfig
    );


    // GAME OVER flag
    this.gameOver = false;
    this.gameTimer = game.settings.gameTimer


    scoreConfig.fixedWidth = 0;
    this.overtext = this.add.text(game.config.width/2, game.config.height/2, "", scoreConfig).setOrigin(0.5);
    this.restarttext = this.add.text(game.config.width/2, game.config.height/2 + 64, "", scoreConfig).setOrigin(0.5);

    this.gameCountdown = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true}); // code from jjcapellan https://phaser.discourse.group/t/countdown-timer/2471/3

    function onEvent() {
      this.gameTimer -= 1;
      this.timetext.setText('Time Left: ' + this.gameTimer);
    }

    this.timetext= this.add.text(
      borderUISize + borderPadding * 30,
      borderUISize + borderPadding * 2,
      'Time Left: ' + game.settings.gameTimer,
      scoreConfig
    );

  }
  update() {

    if (this.gameTimer == 0) {
      this.gameCountdown.paused = true;
      this.timetext.setText('Time Left: 0');
      this.overtext.setText('GAME OVER');
      this.restarttext.setText('Press (R) to Restart');
      this.gameOver = true;
    }


    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.scene.restart();
    }

    this.starfield.tilePositionX -= 4;
    if (!this.gameOver) {
      this.p1Rocket.update(); // update rocket sprite
      if (game.settings.twoPlayer == true) {
      this.p2Rocket.update();
    }
      this.ship01.update(); // update spaceships (x3)
      this.ship02.update();
      this.ship03.update();
      this.sship.update();
    }
    // check collisions
    if (this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship03);
      this.gameTimer += 3;
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02);
      this.gameTimer += 3;
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01);
      this.gameTimer += 3;
    }
    if (this.checkCollision(this.p1Rocket, this.sship)) {
      this.p1Rocket.reset();
      this.shipExplode(this.sship);
      this.gameTimer += 3;
    }
    // p2 off
    if (game.settings.twoPlayer == true) {
      if (this.checkCollision(this.p2Rocket, this.ship03)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship03);
        this.gameTimer += 3;
      }
      if (this.checkCollision(this.p2Rocket, this.ship02)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship02);
        this.gameTimer += 3;
      }
      if (this.checkCollision(this.p2Rocket, this.ship01)) {
        this.p2Rocket.reset();
        this.shipExplode(this.ship01);
        this.gameTimer += 3;
      }
      if (this.checkCollision(this.p2Rocket, this.sship)) {
        this.p2Rocket.reset();
        this.shipExplode(this.sship);
        this.gameTimer += 3;
      }
    }
  }
  checkCollision(rocket, ship) {
    // simple AABB checking
    if (
      rocket.x < ship.x + ship.width &&
      rocket.x + rocket.width > ship.x &&
      rocket.y < ship.y + ship.height &&
      rocket.height + rocket.y > ship.y
    ) {
      return true;
    } else {
      return false;
    }
  }
  shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    const p = this.add.particles("greenpop");
    const e = p.createEmitter();
    e.setPosition(ship.x + 15, ship.y + 15);
    e.setSpeed(50);
    e.setBlendMode(Phaser.BlendModes.ADD);
    e.explode(25, ship.x + 15, ship.y + 15);

    let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
    boom.anims.play("explode"); // play explode animation
    boom.on("animationcomplete", () => {
      // callback after ani completes
      ship.reset(); // reset ship position
      ship.alpha = 1; // make ship visible again
      boom.destroy(); // remove explosion sprite
    });

    // score add and repaint
    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score;
    this.sound.play("sfx_explosion");
  }
}
