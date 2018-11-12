var createMatrix = require('./helpers').createMatrix
var Drawable = require('./Drawable');

function Board(width, height) {
    this.width = width;
    this.height = height;
    this.drawable = new Drawable(createMatrix(width, height));
}

Board.prototype.mergePlayer = function (player) {
    var playerDrawable = player.drawable;
    this.drawable.merge(playerDrawable);
};

Board.prototype.sweep = function () {
    this.drawable.filterRows(function (row) {
        return row.some(function (value) { return value === 0; });
    });
    var rowsRemoved = this.height - this.drawable.height;
    this.drawable.insertBlankRowsAtTop(rowsRemoved);
    return rowsRemoved;
};

module.exports = Board;
