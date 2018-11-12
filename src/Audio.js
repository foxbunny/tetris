function Audio(url) {
    this.url = url;
    try {
        this.context = new AudioContext();
        this.source = this.context.createBufferSource();
        this.source.connect(this.context.destination);
    } catch (e) {
        // No support for audio context
    }
}

Audio.prototype.loop = function () {
    if (!this.context) return;
    var self=  this;
    var request = new XMLHttpRequest();
    request.open('GET', this.url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        self.context.decodeAudioData(request.response, function (audioData) {
            self.source.buffer = audioData;
            self.source.loop = true
            self.source.start();
        });
    };
    request.send();
};

Audio.prototype.stop = function () {
    this.source.disconnect()
};

Audio.prototype.resume = function () {
    this.source.connect(this.context.destination);
};

module.exports = Audio;
