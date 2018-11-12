var COLORS = {
    1: 'red',
    2: 'blue',
    3: 'green',
    4: 'yellow',
    5: 'purple',
    6: 'teal'
};

function Screen(width, height, scale) {
    this.width = width * scale;
    this.height = height * scale;
    this.scale = scale;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context = this.canvas.getContext('2d');
    this.context.scale(this.scale, this.scale);

    this.clear();

    document.body.appendChild(this.canvas);
}

Screen.prototype.clear = function () {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.width, this.height);
};

Screen.prototype.draw = function (drawable) {
    var context = this.context;
    drawable.forEachCell(function (x, y, value) {
        if (value === 0) return
        context.fillStyle = COLORS[value];
        context.fillRect(x, y, 1, 1);
    });
}

module.exports = Screen;
