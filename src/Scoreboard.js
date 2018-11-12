function Scoreboard() {
    this.score = 0;
    this.board = document.createElement('div');
    document.body.appendChild(this.board);
    this.loadScores();
    this.renderScore();
}

Scoreboard.prototype.loadScores = function () {
    this.previousScores = JSON.parse(localStorage.scores) || [];
    this.previousScores.sort(function (a, b) {
        return b.score - a.score;
    })
}

Scoreboard.prototype.updateScore = function (rowsRemoved) {
    if (rowsRemoved === 0) return;
    this.score += rowsRemoved * 100;
    if (rowsRemoved === 4) {
        this.score += 100;
    }
    this.renderScore();
};

Scoreboard.prototype.reset = function () {
    if (this.score === 0) return;
    this.previousScores.push({
        time: Date.now(),
        score: this.score,
    });
    localStorage.scores = JSON.stringify(this.previousScores);
    this.renderScore();
};

Scoreboard.prototype.renderScore = function () {
    const previous = this.previousScores.map(function (previous) {
        return [
            '<li>',
            previous.score,
            'pt ',
            new Date(previous.time).toLocaleDateString(),
            '</li>'
        ].join('')
    });
    const html = [
        '<div class="currentScore">',
        this.score,
        '</div>',
        '<ul>',
        previous,
        '</ul>',
    ].join('');
    this.board.innerHTML = html;
};

module.exports = Scoreboard;
