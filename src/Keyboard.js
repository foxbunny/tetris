function Keyboard(keyMap) {
    this.keyMap = keyMap;
    this.handleKey = this.handleKey.bind(this);
}

Keyboard.prototype.handleKey = function (event) {
    var keyName = Keyboard.KEYNAMES[event.keyCode];
    var callback = this.keyMap[keyName];
    if (!callback) return;
    callback();
}

Keyboard.prototype.start = function () {
    document.addEventListener('keydown', this.handleKey);
};

Keyboard.prototype.stop = function () {
    document.removeEventListener('keydown', this.handleKey);
};

Keyboard.LEFT = 'LEFT';
Keyboard.UP = 'UP';
Keyboard.RIGHT = 'RIGHT';
Keyboard.DOWN = 'DOWN';
Keyboard.Q = 'Q';
Keyboard.W = 'W';
Keyboard.E = 'E';
Keyboard.SPACE = 'SPACE';

Keyboard.KEYNAMES = {
    37: Keyboard.LEFT,
    38: Keyboard.UP,
    39: Keyboard.RIGHT,
    40: Keyboard.DOWN,
    81: Keyboard.Q,
    87: Keyboard.W,
    69: Keyboard.E,
    32: Keyboard.SPACE,
};

module.exports = Keyboard;
