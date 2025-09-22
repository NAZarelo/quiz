// Шукаємо основні елементи з HTML
let buttonPlus = document.querySelector('.plus')   // кнопка "додати питання"
let buttonEnd = document.querySelector('.end')     // кнопка "переврка"
let end_last = document.querySelector('.end-last') // завершити тест
let exercise = document.querySelector('.exercise') // блок, де створюються питання
let test = document.querySelector('.test')         // блок, де відображається готовий тест


let total_given_answers = 0
let total_answers = 1
let total_corrrect_answers = 0


// Масив для збереження усіх питань з відповідями
let questionAnswers = []

// Лічильник для унікальних назв radio-кнопок (щоб у кожного питання були свої)
let questionCount = 0;


// --- Додавання нового питання ---
buttonPlus.addEventListener('click', function () {
    questionCount++; // збільшуємо номер питання

    // Додаємо HTML-код нового блоку питання
    exercise.insertAdjacentHTML("beforeend", `
        <div class="ex">
            <h1>ПИТАННЯ<br><input class="question" type="text"></h1>
            <div class="answers">
                <!-- кожен варіант має input[type=radio] з унікальним name -->
                <!-- value="0..4" — номер відповіді, щоб знати яка правильна -->
                <h2 class="ans">варіант відповіді<br><input name="correct${questionCount}" type="radio" value="0"><br><input class="inp-1" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input name="correct${questionCount}" type="radio" value="1"><br><input class="inp-2" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input name="correct${questionCount}" type="radio" value="2"><br><input class="inp-3" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input name="correct${questionCount}" type="radio" value="3"><br><input class="inp-4" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input name="correct${questionCount}" type="radio" value="4"><br><input class="inp-5" type="text"></h2>
            </div>
        </div>
    `)
    total_answers += 1
})


// --- Завершення тесту (створення готової версії) ---
buttonEnd.addEventListener('click', function () {
    test.style.display = 'block'
    questionAnswers = [] // очищаємо масив (щоб уникнути дублювання старих питань)
    let allExercises = document.querySelectorAll('.ex') // шукаємо всі питання на сторінці

    // Перебираємо усі блоки з питаннями
    allExercises.forEach(ex => {
        let q = ex.querySelector('.question').value // текст питання

        // Масив з усіма варіантами відповідей
        let answers = [
            ex.querySelector('.inp-1').value,
            ex.querySelector('.inp-2').value,
            ex.querySelector('.inp-3').value,
            ex.querySelector('.inp-4').value,
            ex.querySelector('.inp-5').value
        ]

        // Знаходимо, який radio було обрано як правильний
        let correctRadio = ex.querySelector('input[type="radio"]:checked')
        // Якщо обрано — беремо його value (це номер правильного варіанта), інакше -1
        let correctIndex = correctRadio ? parseInt(correctRadio.value) : -1

        // Додаємо об'єкт у масив
        questionAnswers.push({
            question: q,
            answers: answers,
            correctIndex: correctIndex
        })
    })

    // Ховаємо форму для створення тесту
    exercise.style.display = 'none'
    buttonPlus.style.display = 'none'
    buttonEnd.style.display = 'none'

    // Очищаємо блок для готового тесту
    test.innerHTML = ""

    // Виводимо усі питання з варіантами
    questionAnswers.forEach((qa, idx) => {
        // Для кожної відповіді робимо кнопку з атрибутом data-index
        let answersHtml = qa.answers.map((ans, i) => `
            <h2 class="Tans">варіант відповіді<br>
                <button class="Tbtn" data-q="${idx}" data-index="${i}">${ans}</button>
            </h2>
        `).join("") // join об’єднує усі <h2> в один рядок

        // Додаємо блок питання з усіма відповідями
        test.insertAdjacentHTML("beforeend", `
            <div class="Tex">
                <h1 class="Tquestion">${qa.question}</h1>
                <div class="Tanswers">${answersHtml}</div>
            </div>
            
        `)
    })


    let timer = true


    let create_name_inp = document.querySelector('.create-name-inp')
    let create_time_inp = document.querySelector('.create-time-inp')


    test.insertAdjacentHTML("beforebegin", `
            <h1 class="test-name">${create_name_inp.value}</h1>
            <h1 class="test-time">${create_time_inp.value}</h1>
        `)

    let test_time = document.querySelector('.test-time')



    let time = parseInt(create_time_inp.value) * 60// робимо число
    let s = setInterval(function () {
        time = time - 1
        test_time.innerHTML = time
        if (total_given_answers == total_answers){
        time = 0
        }

        

        if (time <= 0) { // перевіряємо тут
            clearInterval(s)
            test_time.innerHTML = "ТЕСТУВАННЯ ЗАВЕРШЕНО!"
            timer = false
            alert('Ви дали ' + total_corrrect_answers + ' з ' + total_answers)
            total_given_answers            
        }
    }, 1000)


    



    test.insertAdjacentHTML("beforeend", `
            <div class="Tresult">
            ПРАВИЛЬНІ ВІДПОВІДІ:<br>
            ${total_corrrect_answers} з ${total_answers}
            </div>
            <button class="end-last">✓</button>
            <button class="back"><</button>
        `)
    let Tresult = document.querySelector('.Tresult')

    // Додаємо події для кнопок відповідей
    test.querySelectorAll('.Tbtn').forEach(btn => {
        btn.addEventListener('click', function () {
            let qIndex = parseInt(this.dataset.q)     // номер питання
            let aIndex = parseInt(this.dataset.index) // номер відповіді

            // Знаходимо всі кнопки цього питання
            let allBtns = this.closest('.Tex').querySelectorAll('.Tbtn')

            // Вимикаємо всі кнопки (щоб не можна було тицяти ще раз)
            allBtns.forEach(b => b.disabled = true)

            // Якщо вибрали правильну відповідь — зелений фон, інакше — червоний
            if (timer == true) {
                if (aIndex === questionAnswers[qIndex].correctIndex) {
                    total_given_answers = +total_given_answers + 1
                    this.style.background = "green"
                    total_corrrect_answers += 1
                    Tresult.innerHTML = `
                    ПРАВИЛЬНІ ВІДПОВІДІ:<br>
                    ${total_corrrect_answers} з ${total_answers}

                    `
                } else {
                    total_given_answers = +total_given_answers + 1
                    this.style.background = "red"

                    // підсвічуємо правильний варіант, навіть якщо користувач помилився
                    allBtns[questionAnswers[qIndex].correctIndex].style.background = "green"
                }
            }
        })
    })
    
    let back = document.querySelector('.back') // назад

    back.addEventListener('click', function () {
        exercise.style.display = 'block'
        buttonPlus.style.display = 'block'
        buttonEnd.style.display = 'block'
        test.style.display = 'none'
    })




//    end_last.addEventListener('click', )
})