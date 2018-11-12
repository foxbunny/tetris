function fillArray(filler, array) {
    for (var i = 0; i < array.length; i += 1) {
        array[i] = filler
    }
}

function createArray(length, filler) {
    var newArray = [];
    while (length) {
        newArray.push(filler);
        length -= 1;
    }
    return newArray;
}

function createMatrix(width, height) {
    var matrix = createArray(height);
    return matrix.map(function () {
        return createArray(width, 0);
    });
}

module.exports = {
    fillArray: fillArray,
    createArray: createArray,
    createMatrix: createMatrix,
};
