var Game = require('./Game');

(function () {
    var startButton = document.createElement('button');
    startButton.innerText = 'Start';
    startButton.addEventListener('click', function () {
        startButton.parentNode.removeChild(startButton);
        new Game();
    });
    document.body.appendChild(startButton);
})();
