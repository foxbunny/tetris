function Audio(url, loop) {
    this.url = url;
    this.loop = !!loop;
    this.audioData = null;
    this.context = new AudioContext();
    this.source = this.context.createBufferSource();
}

Audio.prototype.load = function (callback) {
    var self=  this;
    var request = new XMLHttpRequest();
    request.open('GET', this.url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        self.context.decodeAudioData(request.response, function (audioData) {
            self.audioData = audioData;
            if (callback) callback();
        });
    };
    request.send();
};

Audio.prototype.start = function () {
    if (!this.audioData) return;
    this.source = this.context.createBufferSource()
    this.source.connect(this.context.destination);
    this.source.buffer = this.audioData;
    this.source.loop = this.loop;
    this.source.start(0);
};

Audio.prototype.mute = function () {
    this.source.disconnect()
};

Audio.prototype.unmute = function () {
    this.source.connect(this.context.destination);
};

function FallbackAudio(url, loop) {
    this.url = url;
    this.loop = loop | false;
    this.audioNode = null;
}

FallbackAudio.prototype.load = function (callback) {
    this.audioNode = document.createElement('audio');
    document.body.appendChild(this.audioNode);
    this.audioNode.oncanplay = callback;
    this.audioNode.src = this.url;
    this.audioNode.loop = this.loop;
};

FallbackAudio.prototype.start = function () {
    if (!this.audioNode) return;
    this.audioNode.play();
}

FallbackAudio.prototype.mute = function () {
    if (!this.audioNode) return;
    this.audioNode.pause();
}

FallbackAudio.prototype.unmute = function () {
    if (!this.audioNode) return;
    this.audioNode.play();
}

module.exports = window.AudioContext ? Audio : FallbackAudio;
