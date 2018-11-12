var randomPiece = require('./pieces').randomPiece;

function Player(boardWidth) {
    this.boardWidth = boardWidth;
    this.drawable = null;
    this.nextDrawable = randomPiece();
    this.reset();
}

Player.prototype.reset = function () {
    this.drawable = this.nextDrawable;
    this.nextDrawable = randomPiece();
    this.setInitialOffset();
};

Player.prototype.setInitialOffset = function () {
    this.drawable.offset.y = 0;
    this.drawable.offset.x = (
        Math.round(this.boardWidth / 2)
        - Math.round(this.drawable.width / 2)
    )
};

Player.prototype.collidesWith = function (board) {
    var boardDrawable = board.drawable;
    return this.drawable.find(function (x, y, value) {
        if (value === 0) return false;
        if (!boardDrawable.matrix[y]) return true;
        return boardDrawable.matrix[y][x] !== 0;
    })
}

Player.prototype.moveY = function (distance) {
    this.drawable.offset.y += distance;
};

Player.prototype.moveDown = function () {
    this.moveY(1);
};

Player.prototype.moveUp = function () {
    this.moveY(-1);
};

Player.prototype.moveX = function (distance) {
    this.drawable.offset.x += distance;
};

Player.prototype.moveLeft = function () {
    this.moveX(-1);
};

Player.prototype.moveRight = function () {
    this.moveX(1);
};

Player.prototype.rotate = function (direction) {
    this.drawable.rotate(direction);
};

Player.prototype.rotateLeft = function () {
    this.rotate(-1);
};

Player.prototype.rotateRight = function () {
    this.rotate(1);
};

Player.prototype.moveTo = function (offset) {
    this.drawable.offset.x = offset.x;
    this.drawable.offset.y = offset.y;
};

module.exports = Player;
