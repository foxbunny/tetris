var Player = require('./Player');
var Board = require('./Board');
var Screen = require('./Screen');
var DropTimer = require('./DropTimer');
var Keyboard = require('./Keyboard');
var Scoreboard = require('./Scoreboard');
var Audio = require('./Audio');

var bgm = require('./media/tetris.mp3');

var DEFAULT_BOARD_WIDTH = 12;
var DEFAULT_BOARD_HEIGHT = 20;
var DROP_INTERVAL = 1000;

function Game(width, height) {
    this.width = width || DEFAULT_BOARD_WIDTH;
    this.height = height || DEFAULT_BOARD_HEIGHT;

    this.screen = new Screen(this.width, this.height, 20)
    this.timer = new DropTimer(DROP_INTERVAL);
    this.scoreboard = new Scoreboard();
    this.audio = new Audio(bgm);

    this.paused = true;
    this.gameTime = 0;
    this.reset();
    this.audio.loop();
    this.update(0);

    this.keyMap = this.createKeymap();
    this.keyboard = new Keyboard(this.keyMap);
    this.keyboard.start();
}

Game.prototype.createKeymap = function () {
    var keyMap = {}
    keyMap[Keyboard.DOWN] = this.playerMoveDown.bind(this);
    keyMap[Keyboard.LEFT] = this.playerMoveLeft.bind(this);
    keyMap[Keyboard.RIGHT] = this.playerMoveRight.bind(this);
    keyMap[Keyboard.Q] = this.playerRotateLeft.bind(this);
    keyMap[Keyboard.E] = this.playerRotateRight.bind(this);
    keyMap[Keyboard.UP] = keyMap[Keyboard.E];
    keyMap[Keyboard.W] = this.playerDropNow.bind(this);
    keyMap[Keyboard.SPACE] = keyMap[Keyboard.W];
    keyMap[Keyboard.P] = this.togglePause.bind(this);
    return keyMap;
}

Game.prototype.togglePause = function () {
    if (this.paused) this.resume();
    else this.pause();
};

Game.prototype.pause = function () {
    this.paused = true;
    this.audio.stop();
};

Game.prototype.resume = function () {
    this.paused = false;
    this.update(this.gameTime);
    this.audio.resume();
};

Game.prototype.reset = function () {
    this.paused = false;
    this.player = new Player(this.width);
    this.board = new Board(this.width, this.height);
    this.player.reset();
    this.scoreboard.reset();
};

Game.prototype.updateTimeDelta = function (time) {
    this.frameTimeDelta = time - this.lastFrameTime;
    this.lastFrameTime = time;
};

Game.prototype.update = function (time) {
    var self = this;
    this.gameTime = time;
    this.timer.drop(time, function () {
        self.playerMoveDown();
    });
    this.screen.clear();
    this.screen.draw(this.player.drawable);
    this.screen.draw(this.board.drawable);
    if (!this.paused) {
        requestAnimationFrame(this.update.bind(this));
    }
};

Game.prototype.playerReset = function () {
    this.player.reset();
    if (this.player.collidesWith(this.board)) {
        this.reset();
    }
};

Game.prototype.dropPiece = function () {
    this.board.mergePlayer(this.player);
    var rowsRemoved = this.board.sweep();
    this.scoreboard.updateScore(rowsRemoved);
    this.playerReset();
};

Game.prototype.playerMoveDown = function () {
    this.player.moveDown();
    if (this.player.collidesWith(this.board)) {
        this.player.moveUp();
        this.dropPiece();
    }
};

Game.prototype.playerDropNow = function () {
    while (!this.player.collidesWith(this.board)) {
        this.player.moveDown();
    }
    this.player.moveUp();
    this.dropPiece();
};

Game.prototype.playerMoveLeft = function () {
    this.player.moveLeft();
    if (this.player.collidesWith(this.board)) {
        this.player.moveRight();
    }
};

Game.prototype.playerMoveRight = function () {
    this.player.moveRight();
    if (this.player.collidesWith(this.board)) {
        this.player.moveLeft();
    }
};

Game.prototype.playerRotate = function (direction) {
    this.player.rotate(direction)
    var offset = 1;
    var originalPosition = this.player.drawable.copyOffset();
    while (this.player.collidesWith(this.board)) {
        this.player.moveX(offset);
        offset = -(offset + 1);
        if (offset > this.player.drawable.width) {
            this.player.rotate(-direction);
            this.player.moveTo(originalPosition);
            return;
        }
    }
};

Game.prototype.playerRotateLeft = function () {
    this.playerRotate(-1);
};

Game.prototype.playerRotateRight = function () {
    this.playerRotate(1);
};

module.exports = Game;
