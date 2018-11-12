var createArray = require('./helpers').createArray;

function Drawable(matrix, offset) {
    this.matrix = matrix;
    this.width = matrix[0].length;
    this.height = matrix.length;
    this.offset = offset || { x: 0, y: 0 };
}

Drawable.prototype.find = function (callback) {
    for (var y = 0; y < this.height; y += 1) {
        for (var x = 0; x < this.width; x += 1) {
            if (callback(
                x + this.offset.x,
                y + this.offset.y,
                this.matrix[y][x]
            )) return true
        }
    }
    return false
};

Drawable.prototype.forEachCell = function (callback) {
    for (var y = 0; y < this.height; y += 1) {
        for (var x = 0; x < this.width; x += 1) {
            callback(
                x + this.offset.x,
                y + this.offset.y,
                this.matrix[y][x]
            );
        }
    }
};

Drawable.prototype.rotate = function (direction) {
    for (var y = 0; y < this.height; y += 1) {
        for (var x = 0; x < y; x += 1) {
            var oldVal = this.matrix[y][x];
            this.matrix[y][x] = this.matrix[x][y];
            this.matrix[x][y] = oldVal;
        }
    }
    if (direction == 1) {
        this.matrix.forEach(function (row) {
            row.reverse();
        });
    } else {
        this.matrix.reverse();
    }
};

Drawable.prototype.copyOffset = function () {
    return {
        x: this.offset.x,
        y: this.offset.y
    };
};

Drawable.prototype.merge = function (drawable) {
    var self = this;
    drawable.forEachCell(function (x, y, value) {
        var targetX = x - self.offset.x;
        var targetY = y - self.offset.y;
        if (value === 0) return;
        if (self.isOutOfBounds(targetX, targetY)) return;
        self.matrix[targetY][targetX] = value;
    });
};

Drawable.prototype.isOutOfBounds = function (x, y) {
    return (
        x < 0
        || x >= this.width
        || y < 0
        || y >= this.height
    )
};


Drawable.prototype.filterRows = function (condition) {
    this.matrix = this.matrix.filter(condition);
    this.height = this.matrix.length;
};

Drawable.prototype.insertBlankRowsAtTop = function (count) {
    while (count > 0) {
        this.matrix.unshift(createArray(this.width, 0));
        count -= 1;
    }
    this.height = this.matrix.length;
};

module.exports = Drawable;
