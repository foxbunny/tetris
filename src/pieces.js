var Drawable = require('./Drawable');

var PIECES = {
    O: [
        [1, 1],
        [1, 1],
    ],
    I: [
        [0, 0, 2, 0],
        [0, 0, 2, 0],
        [0, 0, 2, 0],
        [0, 0, 2, 0],
    ],
    S: [
        [0, 0, 0],
        [0, 3, 3],
        [3, 3, 0],
    ],
    Z: [
        [0, 0, 0],
        [4, 4, 0],
        [0, 4, 4],
    ],
    L: [
        [0, 5, 0],
        [0, 5, 0],
        [0, 5, 5],
    ],
    T: [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0],
    ]
};

var TYPE_SELECTION = 'OOISSSSZZZZLLTTT';

function createPiece(type) {
    return new Drawable(PIECES[type]);
}

function randomPiece() {
    var l = TYPE_SELECTION.length - 1;
    var type = TYPE_SELECTION[Math.round(Math.random() * l)];
    return createPiece(type);
}

module.exports = {
    createPiece: createPiece,
    randomPiece: randomPiece
};
