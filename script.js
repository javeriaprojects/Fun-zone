
function startGame() {
  const emojis = ["🍎", "🍌", "🍒", "🍓", "🍇", "🍍", "🥝", "🥥"];
  const cardsArray = [...emojis, ...emojis];
  const shuffledCards = cardsArray.sort(() => 0.5 - Math.random());

  const board = document.getElementById("gameBoard");
  board.innerHTML = ""; // Clear existing cards
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  shuffledCards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.textContent = "❔";
    board.appendChild(card);

    card.addEventListener("click", () => {
      if (lockBoard || card.classList.contains("flipped")) return;

      card.textContent = emoji;
      card.classList.add("flipped");

      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        lockBoard = true;

        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          resetTurn();
        } else {
          setTimeout(() => {
            firstCard.textContent = "❔";
            secondCard.textContent = "❔";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
          }, 800);
        }
      }
    });
  });

  function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }
}
function checkAnswer() {
  const answer = document.getElementById("quiz-answer").value.toLowerCase();
  const feedback = document.getElementById("feedback");
  if (answer.includes("fast food") || answer.includes("junk food")) {
    feedback.textContent = "✅ Correct!";
  } else {
    feedback.textContent = "❌ Try again!";
  }
}
function checkAnswer() {
  const answer = document.getElementById("quiz-answer").value.toLowerCase().trim();
  const feedback = document.getElementById("feedback");
  if (answer.includes("fast food") || answer.includes("junk food")) {
    feedback.textContent = "✅ Correct!";
  } else {
    feedback.textContent = "❌ Try again!";
  }
}

function showHint() {
  const hint = document.getElementById("hint");
  hint.textContent = "Hint: It's something you'd get at a burger joint or drive-thru!";
}
const questions = [
  {
    emoji: "🍕🍔🥤",
    answer: ["fast food", "junk food"],
    hint: "You’d grab this at a burger joint or drive-thru."
  },
  {
    emoji: "🛏️😴🌙",
    answer: ["bedtime", "sleep", "good night"],
    hint: "What you do when the moon comes out."
  },
  {
    emoji: "🐶🐱🐭",
    answer: ["pets", "animals", "cute animals"],
    hint: "These furry friends live at home."
  },
  {
    emoji: "🏖️☀️🕶️",
    answer: ["vacation", "beach", "holiday"],
    hint: "Where you go to relax under the sun."
  }
];

let currentIndex = 0;

function loadQuestion() {
  const current = questions[currentIndex];
  document.getElementById("emoji-question").textContent = current.emoji;
  document.getElementById("quiz-answer").value = "";
  document.getElementById("hint").textContent = "";
  document.getElementById("feedback").textContent = "";
}

function checkAnswer() {
  const answer = document.getElementById("quiz-answer").value.toLowerCase().trim();
  const feedback = document.getElementById("feedback");
  const acceptedAnswers = questions[currentIndex].answer;

  if (acceptedAnswers.some(correct => answer.includes(correct))) {
    feedback.textContent = "✅ Correct!";
    currentIndex++;
    if (currentIndex < questions.length) {
      setTimeout(loadQuestion, 1000);
    } else {
      feedback.textContent = "🎉 You completed all questions!";
    }
  } else {
    feedback.textContent = "❌ Try again!";
  }
}

function showHint() {
  document.getElementById("hint").textContent = `Hint: ${questions[currentIndex].hint}`;
}

document.addEventListener("DOMContentLoaded", loadQuestion);
// Sequence Game Logic
const emojiSet = ["🍎", "🍌", "🍇", "🍒", "🍍", "🥝", "🥥", "🍉"];
let sequence = [];
let playerInput = [];
let round = 1;

function playSequence() {
  sequence = [];

  for (let i = 0; i < round; i++) {
    const randomEmoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    sequence.push(randomEmoji);
  }

  let choices = [...sequence, ...emojiSet]; // now valid
  let speed = Math.max(500, 1000 - round * 100); // keeps it smooth

  // display logic...
}


function restartGame() {
  round = 1;
  currentIndex = 0;
  document.getElementById("status").textContent = "";
  document.getElementById("sequence-display").textContent = "";
  document.getElementById("emoji-options").innerHTML = "";
  document.getElementById("level").textContent = round;

  // Call the appropriate game loader:
  loadQuestion();       // for Emoji Quiz
  playSequence();       // for Sequence Game
  startGame();          // for Memory Flip
}




















function playSequence() {
  sequence = [];
  for (let i = 0; i < round; i++) {
    const randomEmoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    sequence.push(randomEmoji);
  }

  const display = document.getElementById("sequence-display");
  display.textContent = "";
  let index = 0;

  const interval = setInterval(() => {
    display.textContent = sequence[index];
    index++;
    if (index === sequence.length) {
      clearInterval(interval);
      setTimeout(() => {
        display.textContent = "Now repeat the sequence!";
        showOptions();
      }, 1000);
    }
  }, 1000);

  playerInput = [];
}

function showOptions() {
  const options = document.getElementById("emoji-options");
  options.innerHTML = "";
  emojiSet.forEach(emoji => {
    const button = document.createElement("button");
    button.textContent = emoji;
    button.onclick = () => handleClick(emoji);
    options.appendChild(button);
  });
}

function handleClick(emoji) {
  playerInput.push(emoji);
  if (playerInput.length === sequence.length) {
    checkSequence();
  }
}

function checkSequence() {
  const status = document.getElementById("status");
  if (playerInput.every((e, i) => e === sequence[i])) {
    status.textContent = "✅ Correct! Next round coming up...";
    round++;
    setTimeout(playSequence, 1500);
  } else {
    status.textContent = "❌ Oops! Try again.";
    round = 1;
  }
}

function showMenu() {
  document.getElementById("game-menu").style.display = "block";
  document.getElementById("main").style.display = "none";
}

function restartGame() {
  round = 1;
  document.getElementById("status").textContent = "";
  document.getElementById("sequence-display").textContent = "";
  document.getElementById("emoji-options").innerHTML = "";
}
// Modify showOptions()
let choices = [...sequence, ...emojiSet]; // mix correct + distractors
let speed = 1000 - round * 100; // faster each level (but not too fast!)
document.getElementById("level").textContent = round;

function revealMystic() {
  const surprises = [
    "🌕 The moon once borrowed a lantern from a fox.",
    "🦉 Ember says: Wisdom grows with wonder.",
    "🎲 Riddle: I never speak, but I answer when spoken to. What am I?",
    "✨ Compliment: You sparkle brighter than a crystal cavern.",
    "📜 Tale: A hedgehog wrote poetry in thunderstorm ink."
  ];
  
  const randomIndex = Math.floor(Math.random() * surprises.length);
  document.getElementById("mystic-output").innerText = surprises[randomIndex];
}