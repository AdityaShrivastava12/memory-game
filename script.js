const cards = document.querySelectorAll('[data-card]');
const closeButton = document.querySelector('#messageButton');
const message = document.querySelector('#message');
const messageBox = document.querySelector('#messageBox');
const resetButton = document.querySelector('#resetButton');
let lockBoard = true;
let totalMoves = 0;
let matchedMoves = 0;

let startTime = 7;
const countDown = document.querySelector("#countDown");

const startButton = document.querySelector("#startButton");

let myInterval;
startButton.addEventListener('click', (event) => {
  console.log("buttonClicked");
  myInterval = setInterval(startCountDown, 1000);
  cards.forEach(showCards);
});

function startCountDown() {
  if (startTime > 0) {
    startTime--;
    countDown.innerText = startTime;
  } else {
    clearInterval(myInterval);
    cards.forEach(hideCards);
    lockBoard = false;
  }
}

function shuffleCards() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 17);
    card.style.order = randomPosition;
  })
};
shuffleCards();

function showCards(card) {
  card.classList.add('flip');
}

function hideCards(card) {
  card.classList.remove('flip');
}

let checkFirstSecond = false;
let firstCard, secondCard;

function flip() {
  if (lockBoard) {
    return;
  }
  this.classList.add('flip');
  storeCards(this);
}

cards.forEach((card) => {
  card.addEventListener('click', flip);
})

function storeCards(card) {
  if (!checkFirstSecond) {
    firstCard = card;
    checkFirstSecond = true;
  } else {
    secondCard = card;
    checkFirstSecond = false;
    totalMoves++;
    matchCards(firstCard, secondCard);
  }
}

function matchCards(firstCard, secondCard) {
  if ((firstCard.dataset.card === secondCard.dataset.card) &&
    (firstCard.dataset.number !== secondCard.dataset.number)) {
    matchedMoves++;
    if (matchedMoves === 8) {
      console.log(totalMoves);
      setTimeout(showMessage, 500);
    }
    disableFlip(firstCard, secondCard);
  } else {
    unflip(firstCard, secondCard);
  }
}

function disableFlip(firstCard, secondCard) {
  firstCard.removeEventListener('click', flip);
  secondCard.removeEventListener('click', flip);
}

function unflip(firstCard, secondCard) {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockBoard = false;
  }, 1500);
}

function reset() {
  clearInterval(myInterval);
  startTime = 7;
  countDown.innerText = startTime;
  totalMoves = 0;
  matchedMoves = 0;
  cards.forEach((card) => {
    card.classList.remove('flip');
    card.addEventListener('click', flip);
    lockBoard = true;
  })
  shuffleCards();
}

function showMessage() {
  message.innerText = `Total moves: ${totalMoves}`;
  messageBox.classList.add('show');
}

function close() {
  messageBox.classList.remove('show');
  reset();
}

closeButton.addEventListener('click', close);
resetButton.addEventListener('click', reset);
