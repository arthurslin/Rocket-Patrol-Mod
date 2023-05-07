// Arthur Lin Spring 2023
// Rocket Patrol Faded
// Project took ~ 6-8 hours
// Mods Chosen:
// New Spaceship (15)
// Alternating two player mode (15)
// New Timing mechanism (15)
// Particle  Emitter (15)

// New Title screen (10)
// Time Remaining in Seconds (10)

// Music in background (5)
// Speed increase (5)
// New scrolling tile sprite (5)
// Allow the player to control the rocket after it is fired (5)


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
