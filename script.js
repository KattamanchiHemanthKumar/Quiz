const quizData = [
  {
    question: "Who wrote the famous play \"Romeo and Juliet\"?",
    options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
    answer: "William Shakespeare",
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    answer: "Canberra",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Mercury", "Uranus"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Pacific Ocean", "Indian Ocean", "Atlantic Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean",
  },
  {
    question: "Who discovered the Americas?",
    options: ["Christopher Columbus", "Ferdinand Magellan", "Marco Polo", "Vasco da Gama"],
    answer: "Christopher Columbus",
  },
  {
    question: "When did World War II begin and end?",
    options: ["1914-1918", "1939-1945", "1941-1945", "1917-1919"],
    answer: "1939-1945",
  },
  {
    question: "Who was the first President of the United States?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John F. Kennedy"],
    answer: "George Washington",
  },
  {
    question: "In which year did the French Revolution take place?",
    options: ["1776", "1789", "1793", "1815"],
    answer: "1789",
  },
  {
    question: "What was the name of the first man to walk on the moon?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Michael Collins", "John Glenn"],
    answer: "Neil Armstrong",
  },
  {
    question: "Who was the first woman to win the Nobel Prize in Physics?",
    options: ["Marie Curie", "Rosalind Franklin", "Lise Meitner", "Jocelyn Bell Burnell"],
    answer: "Marie Curie",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "NaCl", "H2SO4"],
    answer: "H2O",
  },
  {
    question: "Which gas is essential for human life?",
    options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Argon"],
    answer: "Oxygen",
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Albert Einstein", "Isaac Newton", "Stephen Hawking", "Galileo Galilei"],
    answer: "Albert Einstein",
  },
  {
    question: "What is the smallest unit of matter?",
    options: ["Atom", "Molecule", "Electron", "Proton"],
    answer: "Atom",
  },
  {
    question: "Which element is the most abundant in the Earth's atmosphere?",
    options: ["Nitrogen", "Oxygen", "Argon", "Carbon Dioxide"],
    answer: "Nitrogen",
  },
  {
    question: "What is the highest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
    answer: "Mount Everest",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "South Korea", "Taiwan"],
    answer: "Japan",
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    answer: "Nile River",
  },
  {
    question: "Which continent is the largest?",
    options: ["Asia", "Africa", "North America", "South America"],
    answer: "Asia",
  },
  {
    question: "What is the capital of Canada?",
    options: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];
  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';
  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  shuffledOptions.forEach(option => {
    const optionLabel = document.createElement('label');
    optionLabel.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = option;

    optionLabel.appendChild(radio);
    optionLabel.appendChild(document.createTextNode(option));
    optionsElement.appendChild(optionLabel);
  });

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  } else {
    alert('Please select an option!');
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  incorrectAnswers.forEach(item => {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${item.question}<br>
        <strong>Your Answer:</strong> ${item.incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${item.correctAnswer}
      </p>
    `;
  });

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
