// ----------------------------
// Основні елементи
// ----------------------------
let buttonPlus = document.querySelector('.plus');
let buttonEnd = document.querySelector('.end');
let exercise = document.querySelector('.exercise');
let test = document.querySelector('.test');
let quizzes = document.querySelector('.quizzes');
let ready_quiz = document.querySelector('.ready-quiz');

let questionAnswers = [];
let questionCount = 0;

// ----------------------------
// Додавання нового питання
// ----------------------------
buttonPlus.addEventListener('click', function () {
    questionCount++;
    exercise.insertAdjacentHTML("beforeend", `
        <div class="ex">
            <h1>ПИТАННЯ<br><input class="question" type="text"></h1>
            <div class="answers">
                <h2 class="ans">варіант відповіді<br><input name="correct${questionCount}" type="radio" value="0"><br><input class="inp-1" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input name="correct${questionCount}" type="radio" value="1"><br><input class="inp-2" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input name="correct${questionCount}" type="radio" value="2"><br><input class="inp-3" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input name="correct${questionCount}" type="radio" value="3"><br><input class="inp-4" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input name="correct${questionCount}" type="radio" value="4"><br><input class="inp-5" type="text"></h2>
            </div>
        </div>
    `);
});

// ----------------------------
// Завершення створення тесту
// ----------------------------
buttonEnd.addEventListener('click', function () {
    questionAnswers = [];

    let allExercises = document.querySelectorAll('.ex');
    allExercises.forEach(ex => {
        let q = ex.querySelector('.question').value;
        let answers = [
            ex.querySelector('.inp-1').value,
            ex.querySelector('.inp-2').value,
            ex.querySelector('.inp-3').value,
            ex.querySelector('.inp-4').value,
            ex.querySelector('.inp-5').value
        ];
        let correctRadio = ex.querySelector('input[type="radio"]:checked');
        let correctIndex = correctRadio ? parseInt(correctRadio.value) : -1;

        questionAnswers.push({ question: q, answers: answers, correctIndex: correctIndex });
    });

    exercise.style.display = 'none';
    buttonPlus.style.display = 'none';
    buttonEnd.style.display = 'none';

    test.style.display = 'block';
    test.innerHTML = "";

    let create_name_inp = document.querySelector('.create-name-inp').value;
    let create_time_inp = parseInt(document.querySelector('.create-time-inp').value);

    test.insertAdjacentHTML("beforebegin", `
        <h1 class="test-name">${create_name_inp}</h1>
    `);

    renderTest(questionAnswers, test, create_time_inp);

    test.insertAdjacentHTML("beforeend", `
        <a href="#"><button class="end-last">✓</button></a>
        <button class="back"><</button>
    `);

    let end_last = test.querySelector('.end-last');
    let back = test.querySelector('.back');

    end_last.addEventListener('click', function () {
        localStorage.setItem("readyQuizData", JSON.stringify(questionAnswers));
        localStorage.setItem("readyQuizName", create_name_inp);
        localStorage.setItem("readyQuizTime", create_time_inp);
        window.location.href = "test.html";
    });

    back.addEventListener('click', function () {
        exercise.style.display = 'block';
        buttonPlus.style.display = 'block';
        buttonEnd.style.display = 'block';
        test.style.display = 'none';
    });
});

// ----------------------------
// Функція renderTest
// ----------------------------
function renderTest(questions, container, testTimeInMinutes = 0) {
    container.innerHTML = "";
    let total_answers = questions.length;
    let total_correct_answers = 0;
    let total_given_answers = 0;
    let timer = true;

    questions.forEach((qa, idx) => {
        let answersHtml = qa.answers.map((ans, i) => `
            <h2 class="Tans">
                варіант відповіді<br>
                <button class="Tbtn" data-q="${idx}" data-index="${i}">${ans}</button>
            </h2>
        `).join("");

        container.insertAdjacentHTML("beforeend", `
            <div class="Tex">
                <h1 class="Tquestion">${qa.question}</h1>
                <div class="Tanswers">${answersHtml}</div>
            </div>
        `);
    });

    container.querySelectorAll(".Tbtn").forEach(btn => {
        btn.addEventListener('click', function () {
            let qIndex = parseInt(this.dataset.q);
            let aIndex = parseInt(this.dataset.index);
            let allBtns = this.closest('.Tex').querySelectorAll('.Tbtn');

            allBtns.forEach(b => b.disabled = true);

            if (timer) {
                if (aIndex === questions[qIndex].correctIndex) {
                    total_correct_answers++;
                    this.style.background = "green";
                } else {
                    this.style.background = "red";
                    allBtns[questions[qIndex].correctIndex].style.background = "green";
                }

                total_given_answers++;

                if (total_given_answers >= total_answers) {
                    timer = false;
                    alert(`Ви дали ${total_correct_answers} з ${total_answers}`);
                    container.insertAdjacentHTML("beforeend", `
                       <h1>Ви дали ${total_correct_answers} правильні відповіді з ${total_answers}</h1>
                    `);
                }
            }
        });
    });

    if (testTimeInMinutes > 0) {
        let time = testTimeInMinutes * 60;
        let timerDiv = document.createElement("h1");
        container.insertAdjacentElement("beforebegin", timerDiv);

        let interval = setInterval(() => {
            time--;
            timerDiv.innerText = `Час: ${time} с`;
            if (time <= 0 || !timer) {
                clearInterval(interval);
                timer = false;
                timerDiv.innerText = "ТЕСТУВАННЯ ЗАВЕРШЕНО!";
                alert(`Ви дали ${total_correct_answers} з ${total_answers}`);
                head
            }
        }, 1000);
    }
}

// ----------------------------
// Код для test.html (для відновлення тесту)
// ----------------------------
document.addEventListener("DOMContentLoaded", function () {
    if (ready_quiz) {
        let savedData = localStorage.getItem("readyQuizData");
        let savedName = localStorage.getItem("readyQuizName");
        let savedTime = localStorage.getItem("readyQuizTime");

        if (savedData) {
            let questions = JSON.parse(savedData);

            let title = document.createElement("h1");
            title.innerText = savedName || "Тест";
            ready_quiz.insertAdjacentElement("beforebegin", title);

            renderTest(questions, ready_quiz, parseInt(savedTime) || 0);

            // (опційно) очищення localStorage
            // localStorage.removeItem("readyQuizData");
            // localStorage.removeItem("readyQuizName");
            // localStorage.removeItem("readyQuizTime");
        } else {
            ready_quiz.innerHTML = "Тест ще не створений!";
        }
    }
});
