//const p1Button = document.querySelector('#p1Button');
//const p2Button = document.querySelector('#p2Button');
const resetButton = document.querySelector('#reset');
//const p1Display = document.querySelector('#p1Display');
//const p2Display = document.querySelector('#p2Display');
const winningScoreSelect = document.querySelector('#playto');

//let p1Score = 0;
//let p2Score = 0;
let winningScore = 3;
let isGameOver = false;

const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}

function updateScores(player, opponent) {
    if(!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('winner');
            opponent.display.classList.add('loser');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

p1.button.addEventListener('click', function () {
    return updateScores(p1, p2);
});

p2.button.addEventListener('click', function () {
    return updateScores(p2, p1);
});

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
});

resetButton.addEventListener('click', reset);

function reset() {
    isGameOver = false;
    for (let p of [p1,p2]) {
        p.score = 0;
        p.display.textContent = p.score;
        p.display.classList.remove('winner', 'loser');
        p.button.disabled = false;
    }
    /*
    p1.score = 0;
    p2.score = 0;
    p1.display.textContent = p1.score;
    p2.display.textContent = p2.score;
    p1.display.classList.remove('winner', 'loser');
    p2.display.classList.remove('winner', 'loser');
    p1.button.disabled = false;
    p2.button.disabled = false;
    */
}
