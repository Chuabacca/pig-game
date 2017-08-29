/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gameReady;

init();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.querySelector('.btn-roll').addEventListener('click', function() {
  
  if (gameReady) {
    gameReady = false;

    var i = 0;
    var delay = 50;
    var diceDOM = document.querySelector('.dice');

    diceDOM.style.display = 'block';

    async function roulette() {
      var dice = Math.floor(Math.random() * 6 + 1);
      diceDOM.src = 'dice-' + dice + '.png';
      await sleep(delay);
      i++;
      delay *= 1.1;
      if (i < 12) {
        roulette();
      } else if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        gameReady = true;
      } else {
        nextPlayer();
      }
    }
    roulette();
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameReady) {
    gameReady = false;

    scores[activePlayer] += roundScore;

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
      nextPlayer();
    }
  }
});

async function nextPlayer() {
  await sleep(1000);

  document.getElementById('current-' + activePlayer).textContent = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  roundScore = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';

  gameReady = true;
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gameReady = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'
  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
