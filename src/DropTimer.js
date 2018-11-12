function DropTimer(dropInterval) {
    this.dropInterval = dropInterval;
    this.lastFrameTime = 0;
    this.timeSinceLastDrop = 0;
}

DropTimer.prototype.drop = function (currentTime, callback) {
    var frameTime = currentTime - this.lastFrameTime;
    this.lastFrameTime = currentTime;
    this.timeSinceLastDrop += frameTime;
    if (this.timeSinceLastDrop >= this.dropInterval) {
        this.timeSinceLastDrop = 0;
        callback()
    }
}

module.exports = DropTimer;
