const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const resultEl = document.getElementById("result");
const ExamEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 40 * 60;
let selectedAnswers = {};
let wrongAnswers = [];

// ---- Python & Pygame Quiz Questions ----
const questions = [
  { question: "Which of the following is used to store data in Python?", options: ["Operators", "Variables", "Functions", "Modules"], answer: "Variables" },
  { question: "What will the output of print(3 + 4 * 2) be?", options: ["14", "11", "10", "7"], answer: "11" },
  { question: "Which data type is written inside quotation marks (' ' or \" \") in Python?", options: ["Integer", "Float", "String", "Boolean"], answer: "String" },
  { question: "Which function is used to get user input in Python?", options: ["input()", "scan()", "read()", "collect()"], answer: "input()" },
  { question: "What keyword is used in Python for decision making?", options: ["repeat", "if", "choose", "case"], answer: "if" },
  { question: "In a while loop, the code inside will keep running until…", options: ["The computer crashes", "The condition becomes False", "A function is called", "Python decides to stop"], answer: "The condition becomes False" },
  { question: "Which of these is a Python module for random numbers?", options: ["math", "random", "system", "os"], answer: "random" },
  { question: "In Pygame, which function initializes all modules?", options: ["pygame.display()", "pygame.start()", "pygame.init()", "pygame.begin()"], answer: "pygame.init()" },
  { question: "Which Pygame function is used to create a window?", options: ["pygame.display.set_mode()", "pygame.window()", "pygame.new_screen()", "pygame.create()"], answer: "pygame.display.set_mode()" },
  { question: "What is the role of the game loop in Pygame?", options: ["To run the program only once", "To continuously update game events and graphics", "To close the game window", "To install packages"], answer: "To continuously update game events and graphics" },
  { question: "Which symbol is used for single-line comments in Python?", options: ["//", "<!-- -->", "#", "%"], answer: "#" },
  { question: "What will the expression 'Hello' + 'World' produce?", options: ["HelloWorld", "Hello World", "'Hello' 'World'", "Error"], answer: "HelloWorld" },
  { question: "Which of these is an example of a Boolean value in Python?", options: ["'True'", "1", "True", "'Yes'"], answer: "True" },
  { question: "What function can you use to find the length of a list in Python?", options: ["len()", "size()", "count()", "length()"], answer: "len()" },
  { question: "Which operator is used for division in Python that gives a decimal result?", options: ["/", "//", "%", "÷"], answer: "/" },
  { question: "What keyword is used to define a function in Python?", options: ["def", "func", "define", "function"], answer: "def" },
  { question: "Which of the following loops will always run at least once?", options: ["for loop", "while loop", "do-while loop", "range loop"], answer: "do-while loop" },
  { question: "In Python, which error type occurs when you forget a colon after an if statement?", options: ["SyntaxError", "TypeError", "ValueError", "NameError"], answer: "SyntaxError" },
  { question: "Which of these is NOT a valid Python data type?", options: ["integer", "float", "decimal", "boolean"], answer: "decimal" },
  { question: "What is the result of int(5.9) in Python?", options: ["5", "6", "5.9", "Error"], answer: "5" },
  { question: "Which module would you import to use mathematical functions like square root?", options: ["random", "math", "os", "sys"], answer: "math" },
  { question: "What does the comparison operator == do?", options: ["Assigns values", "Compares two values for equality", "Checks if a variable exists", "Ends a loop"], answer: "Compares two values for equality" },
  { question: "What does the input() function return by default?", options: ["Integer", "String", "Float", "Boolean"], answer: "String" },
  { question: "Which of the following will create a list in Python?", options: ["{}", "[]", "()", "<>"], answer: "[]" },
  { question: "How do you check if 3 is in the list numbers?", options: ["if numbers in 3", "if 3 contains numbers", "if 3 in numbers", "if numbers.has(3)"], answer: "if 3 in numbers" },
  { question: "Which statement is used for multiple conditions in Python?", options: ["elseif", "elif", "else if", "then"], answer: "elif" },
  { question: "What is the purpose of the try...except block in Python?", options: ["To handle errors", "To loop through items", "To declare variables", "To compare values"], answer: "To handle errors" },
  { question: "Which of these is NOT a valid Python keyword?", options: ["pass", "break", "continue", "repeat"], answer: "repeat" },
  { question: "Which function ends all Pygame modules?", options: ["pygame.quit()", "pygame.close()", "pygame.exit()", "pygame.stop()"], answer: "pygame.quit()" },
  { question: "What argument do you pass to pygame.display.set_mode()?", options: ["A string name", "A tuple of (width, height)", "An integer size", "Nothing"], answer: "A tuple of (width, height)" },
  { question: "Which method is used to draw a rectangle in Pygame?", options: ["pygame.draw.rect()", "pygame.display.rect()", "pygame.rect()", "pygame.create_rect()"], answer: "pygame.draw.rect()" },
  { question: "What does pygame.time.Clock().tick(30) do?", options: ["Sets the window title", "Limits the game to 30 frames per second", "Prints the time", "Restarts the loop"], answer: "Limits the game to 30 frames per second" },
  { question: "Which module is used in Pygame to handle keyboard events?", options: ["pygame.key", "pygame.event", "pygame.input", "pygame.control"], answer: "pygame.event" },
  { question: "Which method is used to display text in Pygame?", options: ["pygame.font.display()", "pygame.font.render()", "pygame.text.show()", "pygame.print()"], answer: "pygame.font.render()" },
  { question: "In Pygame, which function is used to load an image?", options: ["pygame.image.load()", "pygame.load.image()", "pygame.display.image()", "pygame.file.load()"], answer: "pygame.image.load()" },
  { question: "Which function in Pygame is used to play background music?", options: ["pygame.music.play()", "pygame.mixer.music.play()", "pygame.sound.play()", "pygame.audio.play()"], answer: "pygame.mixer.music.play()" },
  { question: "Which method checks for collision between rectangles?", options: ["collides()", "hitbox()", "colliderect()", "overlap()"], answer: "colliderect()" },
  { question: "What color model does Pygame use for screen colors?", options: ["CMYK", "HSL", "RGB", "HEX"], answer: "RGB" },
  { question: "Which of the following is an example of a game state?", options: ["True/False", "start/play/game over", "add/subtract/multiply", "left/right/up"], answer: "start/play/game over" },
  { question: "In Pygame, which function clears and fills the screen with a color?", options: ["screen.fill()", "screen.clear()", "screen.background()", "pygame.fill()"], answer: "screen.fill()" },
  { question: "What is the default top-left coordinate of a Pygame window?", options: ["(0,0)", "(1,1)", "(10,10)", "(100,100)"], answer: "(0,0)" },
  { question: "In a snake game, how is the snake typically represented?", options: ["A string of text", "A list of coordinates", "A dictionary of values", "A sound effect"], answer: "A list of coordinates" },
  { question: "Which function ensures the snake moves smoothly by controlling frame rate?", options: ["pygame.delay()", "pygame.wait()", "pygame.time.Clock().tick()", "pygame.update()"], answer: "pygame.time.Clock().tick()" },
  { question: "What prevents the snake from reversing directly into itself?", options: ["Score system", "Direction check logic", "Food placement", "Random module"], answer: "Direction check logic" },
  { question: "In Pygame, how do you detect when a key is pressed?", options: ["pygame.key.get_pressed()", "pygame.event.get_key()", "pygame.read.key()", "pygame.input()"], answer: "pygame.key.get_pressed()" },
  { question: "Which class is often used to represent a player or enemy in games?", options: ["Sprite", "Window", "Surface", "Module"], answer: "Sprite" },
  { question: "What is the purpose of pygame.sprite.Group()?", options: ["To group sound effects", "To store multiple sprites", "To create new windows", "To import images"], answer: "To store multiple sprites" },
  { question: "Which event is triggered when the close button on the game window is clicked?", options: ["pygame.QUIT", "pygame.CLOSE", "pygame.EXIT", "pygame.STOP"], answer: "pygame.QUIT" },
  { question: "What happens when pygame.display.update() is called?", options: ["The game loop ends", "The screen refreshes to show new drawings", "The program quits", "The keyboard resets"], answer: "The screen refreshes to show new drawings" },
  { question: "What is the purpose of the game loop in programming?", options: ["To run code only once", "To continuously update game events and redraw the screen", "To install external libraries", "To close the program automatically"], answer: "To continuously update game events and redraw the screen" }
];

// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Start Quiz
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizContainer.style.display = "block";

  shuffle(questions); // randomize questions

  startTimer();
  loadQuestion(currentQuestion);
});

// Load Question
function loadQuestion(index) {
  let q = questions[index];
  questionEl.textContent = `${index + 1}. ${q.question}`;
  optionsEl.innerHTML = "";

  // randomize answer options too
  let shuffledOptions = [...q.options];
  shuffle(shuffledOptions);

  shuffledOptions.forEach(option => {
    let btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");

    if (selectedAnswers[index] === option) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => selectAnswer(index, option, btn));
    optionsEl.appendChild(btn);
  });
}

// Select Answer
function selectAnswer(qIndex, answer, btn) {
  selectedAnswers[qIndex] = answer;
  Array.from(optionsEl.children).forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

// Next Button
nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  } else {
    endQuiz();
  }
});

// Back Button
backBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
});

// Timer
function startTimer() {
  timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerEl.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// End Quiz
function endQuiz() {
  clearInterval(timer);
  quizContainer.style.display = "none";

  score = 0;
  wrongAnswers = [];

  questions.forEach((q, i) => {
    if (selectedAnswers[i] === q.answer) {
      score++;
    } else {
      wrongAnswers.push({ question: q.question, correct: q.answer, chosen: selectedAnswers[i] });
    }
  });

  let percentage = ((score / questions.length) * 100).toFixed(2);

  resultEl.innerHTML = `
    <h3>You scored: ${score} out of ${questions.length}</h3>
    <h2>${percentage}%</h2>
  `;

  if (wrongAnswers.length > 0) {
    resultEl.innerHTML += "<h3>Review Your Mistakes:</h3>";
    wrongAnswers.forEach(w => {
      resultEl.innerHTML += `
        <div class="correction-card">
          <p class="question"><strong>Q:</strong> ${w.question}</p>
          <p class="correct"><strong>✔ Correct Answer:</strong> ${w.correct}</p>
          <p class="chosen"><strong>✘ Your Answer:</strong> ${w.chosen || "No Answer"}</p>
        </div>
      `;
    });
  }

  
  resultEl.style.display = "block";
}
