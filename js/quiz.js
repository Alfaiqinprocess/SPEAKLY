/* ===================================
   SPEAKLY - Quiz System
   10 multiple-choice questions
   =================================== */

const quizData = [
  {
    question: 'What is the meaning of "Practice"?',
    options: ['Belajar', 'Berlatih', 'Membaca', 'Menulis'],
    answer: 1
  },
  {
    question: 'What is the meaning of "Improve"?',
    options: ['Menurunkan', 'Menambah', 'Meningkatkan', 'Mengurangi'],
    answer: 2
  },
  {
    question: 'What is the meaning of "Knowledge"?',
    options: ['Kekuatan', 'Pengetahuan', 'Keberanian', 'Kecerdasan'],
    answer: 1
  },
  {
    question: 'What is the meaning of "Education"?',
    options: ['Hiburan', 'Pekerjaan', 'Pendidikan', 'Perjalanan'],
    answer: 2
  },
  {
    question: 'What is the meaning of "Customer"?',
    options: ['Karyawan', 'Pelanggan', 'Penjual', 'Pemilik'],
    answer: 1
  },
  {
    question: 'Which sentence uses Simple Present Tense correctly?',
    options: [
      'She studied English yesterday.',
      'I am study every day.',
      'He speaks English fluently.',
      'They was practicing grammar.'
    ],
    answer: 2
  },
  {
    question: 'What is the correct formula for Simple Past Tense?',
    options: [
      'Subject + Verb 1 + Object',
      'Subject + Verb 2 + Object',
      'Subject + Will + Verb 1',
      'Subject + Is/Am/Are + Verb-ing'
    ],
    answer: 1
  },
  {
    question: 'What should you say when entering a restaurant politely?',
    options: [
      'Give me food now!',
      'May I see the menu, please?',
      'Where is the food?',
      'I want eat.'
    ],
    answer: 1
  },
  {
    question: 'What is the meaning of "Campus"?',
    options: ['Pabrik', 'Kampus', 'Kantor', 'Rumah Sakit'],
    answer: 1
  },
  {
    question: 'In a job interview, how do you politely introduce yourself?',
    options: [
      'I am the best candidate.',
      'Just hire me!',
      'My name is [Name]. I am a student majoring in Software Engineering.',
      'I don\'t know what to say.'
    ],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let answers = new Array(quizData.length).fill(null);
let answered = false;

// DOM Elements
const questionEl = document.getElementById('quiz-question');
const optionsEl = document.getElementById('quiz-options');
const progressFill = document.getElementById('progress-fill');
const questionCount = document.getElementById('question-count');
const scoreDisplay = document.getElementById('score-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const restartBtn = document.getElementById('restart-btn');

function renderQuestion() {
  const q = quizData[currentQuestion];
  const total = quizData.length;
  
  // Update progress
  progressFill.style.width = `${((currentQuestion + 1) / total) * 100}%`;
  questionCount.textContent = `Question ${currentQuestion + 1} of ${total}`;
  scoreDisplay.textContent = `Score: ${score}`;

  // Question text
  questionEl.textContent = q.question;

  // Options
  optionsEl.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D'];
  
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.innerHTML = `
      <span class="option-letter">${labels[idx]}</span>
      <span>${opt}</span>
    `;

    // Restore previous answer state
    if (answers[currentQuestion] !== null) {
      btn.disabled = true;
      if (idx === q.answer) btn.classList.add('correct');
      if (idx === answers[currentQuestion] && idx !== q.answer) btn.classList.add('wrong');
      if (idx === answers[currentQuestion] && idx === q.answer) btn.classList.add('selected');
    }

    btn.addEventListener('click', () => selectAnswer(idx));
    optionsEl.appendChild(btn);
  });

  // Navigation buttons
  prevBtn.style.display = currentQuestion === 0 ? 'none' : 'flex';
  
  if (currentQuestion === total - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = answers[currentQuestion] !== null ? 'flex' : 'none';
  } else {
    nextBtn.style.display = answers[currentQuestion] !== null ? 'flex' : 'none';
    submitBtn.style.display = 'none';
  }
}

function selectAnswer(selectedIdx) {
  if (answers[currentQuestion] !== null) return; // Already answered

  const q = quizData[currentQuestion];
  answers[currentQuestion] = selectedIdx;

  // Update score
  if (selectedIdx === q.answer) score++;

  // Disable all options and show correct/wrong
  const options = optionsEl.querySelectorAll('.quiz-option');
  options.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.answer) btn.classList.add('correct');
    if (idx === selectedIdx && idx !== q.answer) btn.classList.add('wrong');
    if (idx === selectedIdx && idx === q.answer) btn.classList.add('selected');
  });

  scoreDisplay.textContent = `Score: ${score}`;

  // Show next/submit button
  if (currentQuestion === quizData.length - 1) {
    submitBtn.style.display = 'flex';
  } else {
    nextBtn.style.display = 'flex';
  }
}

prevBtn?.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
});

nextBtn?.addEventListener('click', () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    renderQuestion();
  }
});

submitBtn?.addEventListener('click', showResult);

function showResult() {
  quizScreen.style.display = 'none';
  resultScreen.classList.add('show');

  const percent = Math.round((score / quizData.length) * 100);
  
  document.getElementById('result-score').textContent = `${score}/${quizData.length}`;
  document.getElementById('result-percent').textContent = `${percent}%`;

  let level, message, emoji;

  if (percent >= 90) {
    level = '🏆 Excellent!';
    message = 'Outstanding performance! You have mastered English very well.';
    emoji = '🎉';
  } else if (percent >= 70) {
    level = '⭐ Great Job!';
    message = 'Well done! Keep up the good work and you\'ll be fluent in no time.';
    emoji = '😄';
  } else if (percent >= 50) {
    level = '📚 Keep Practicing!';
    message = 'Good effort! Review the lessons and practice more to improve.';
    emoji = '💪';
  } else {
    level = '💡 Don\'t Give Up!';
    message = 'Learning takes time. Review the vocabulary and grammar tips, then try again!';
    emoji = '🌱';
  }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-level').textContent = level;
  document.getElementById('result-message').textContent = message;
}

restartBtn?.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  answers = new Array(quizData.length).fill(null);
  resultScreen.classList.remove('show');
  quizScreen.style.display = 'block';
  renderQuestion();
});

// Initialize quiz
if (questionEl) renderQuestion();
