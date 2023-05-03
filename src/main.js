// Arthur Lin Spring 2023
// Rocket Patrol Faded
// Project took ~ 6-8 hours
// Music: https://www.youtube.com/watch?v=60ItHLz5WEA
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]

}
let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT, keyA, keyD, keyW;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
