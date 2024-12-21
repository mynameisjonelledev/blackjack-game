// let firstCard =  getRandomCard();
// let secondCard = getRandomCard();
let cards = [];

let sum = 0;
let hasBlackJack = false;

let isAlive = false;

let message = '';

let messageEl = document.querySelector('#message-el');

let sumEl = document.querySelector('#sum-el');
let cardsEl = document.querySelector('#cards-el');

let isNameAdded = false;

/*
let player = {
  name: 'Jonelle',
  chips: 200
} */

let playerEl = document.querySelector('#player-el');

// playerEl.textContent = player.name + ': $' + player.chips; 

const playerName = document.querySelector('.input-el');
let creditsEl = document.querySelector('#credits-el');
let isDefeated = false;
let playerCredits = 200;

function nameAdded(event) {
  if (event.key === 'Enter') {
    playerEl.textContent = 'Player name:' + ' ' + playerName.value;
    document.querySelector('.input-label').textContent = '';
    playerName.value = '';
    playerName.remove();
    document.querySelector('.p-el').remove(); 

    creditsEl.textContent = 'Credits:' + ' ' + playerCredits;

    isNameAdded = true;
    isAlive = true;
  }

}


document.querySelector('.input-el').addEventListener('keydown', (event) => {
  nameAdded(event);
});

function getRandomCard() {
  const randomNumber = Math.floor(Math.random() * 13) + 1;
  
  if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}


function startGame() {
  if (isNameAdded && playerCredits >= 21) {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
  
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  
  renderGame();
  } else if (playerCredits <= 21) {
    messageEl.innerHTML = `<p class="inside-message">You don't have enough credits to play. <br>Please reload your browser!</p>`;
  }
}

function renderGame() {
  cardsEl.textContent = 'Cards: ';
  
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + ' ';
  }
  
  sumEl.textContent = 'Sum: ' + sum;
  if (sum <= 20) {
  message = "Do you want to draw a new card?";
} else if (sum === 21) {
  message = "You've got Blackjack!";
  hasBlackJack = true;
} else {
  message = "You're out of the game!";
  isAlive = false;
  isDefeated = true;
}

messageEl.textContent = message;
gameResult();
}


document.querySelector('.start-btn').addEventListener('click', () => {
  startGame();
});


function newCard() {
  if (isNameAdded === true && hasBlackJack === false && isAlive === true) {
  let card = getRandomCard();
  sum += card;
  cards.push(card);
  renderGame();
  }
}

document.querySelector('.new-card').addEventListener('click', () => {
  newCard();
});

function gameResult() {
  if (isDefeated) {
    playerCredits -= 21;
    creditsEl.textContent = 'Credits:' + ' ' + playerCredits;
    isDefeated = true;

  } else if (hasBlackJack) {
    playerCredits += 21;
    creditsEl.textContent = 'Credits:' + ' ' + playerCredits;
  }
 
}

