const quizData = [
    {
        question: "Q1. Which language is used for web page structure?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "HTML"
    },
    {
        question: "Q2. Which CSS property changes text color?",
        options: ["background-color", "color", "font-size", "border"],
        answer: "color"
    },
    {
        question: "Q3. Which keyword is used to declare a variable?",
        options: ["let", "define", "create", "new"],
        answer: "let"
    },
    {
        question: "Q4. Which mehod selects an element by ID?",
        options: ["getElementById()", "query()", "find()", "select()"],
        answer: "getElementById()"
    },
    {
        question: "Q5. Which event occurs when a button is clicked?",
        options: ["onclick", "onhover", "onfocus", "onsubmit"],
        answer: "onsubmit"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {

    selectedAnswer = null;

    const currentQuiz = quizData[currentQuestion];

    question.textContent = currentQuiz.question;

    options.innerHTML = "";

    currentQuiz.options.forEach(option => {

        const button = document.createElement("button");

        button.classList.add("option");

        button.innerText = option;

        button.addEventListener("click", () => {

            document.querySelectorAll(".option").forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedAnswer = option;
        });

        options.appendChild(button);
    });
}

nextBtn.addEventListener("click", () => {

    if (!selectedAnswer) {
        alert("Please select an answer");
        return;
    }

    if (selectedAnswer === quizData[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {

    document.getElementById("quiz").style.display = "none";

    document.getElementById("result").style.display = "block";

    document.getElementById("score").innerText =
        `Your Score: ${score}/${quizData.length}`;

    document.getElementById("message").innerText =
        score >= 3 ? "Good Job!" : "Keep Practicing!";
}

document.getElementById("restart-btn").addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    document.getElementById("result").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    loadQuestion();
});

loadQuestion();