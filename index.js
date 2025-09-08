// Отримуємо кнопки та контейнери з HTML
let buttonPlus = document.querySelector('.plus')      // кнопка "додати питання"
let buttonEnd = document.querySelector('.end')        // кнопка "завершити тест"
let exercise = document.querySelector('.exercise')    // блок, де будуть інпути з питаннями
let test = document.querySelector('.test')            // блок, де буде готовий тест

// Масив для збереження усіх питань з відповідями
let questionAnswers = []

// --- Додавання нового питання ---
buttonPlus.addEventListener('click', function() {
    // додаємо новий блок з полями для введення питання та відповідей
    exercise.insertAdjacentHTML("beforeend", `
        <div class="ex">
            <h1>ПИТАННЯ<br><input class="question" type="text"></h1>
            <div class="answers">
                <h2 class="ans corect">варіант відповіді<br><input class="inp-corect" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input class="inp-1" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input class="inp-2" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input class="inp-3" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input class="inp-4" type="text"></h2>
            </div>
        </div>
    `)
})
// Після натискання на "плюс" зʼявляється новий блок, але нічого не зберігається у масиві.
// Збереження робимо тільки тоді, коли натиснемо "кінець".

// --- Завершення тесту ---
buttonEnd.addEventListener('click', function() {
    questionAnswers = [] // очищаємо масив, щоб не дублювати старі дані
    let allExercises = document.querySelectorAll('.ex') // шукаємо всі питання, які є на сторінці

    // перебираємо всі блоки з питаннями
    allExercises.forEach(ex => {
        // зчитуємо текст питання
        let q = ex.querySelector('.question').value
        // зчитуємо всі відповіді
        let a_corect = ex.querySelector('.inp-corect').value
        let a_one = ex.querySelector('.inp-1').value
        let a_two = ex.querySelector('.inp-2').value
        let a_three = ex.querySelector('.inp-3').value
        let a_four = ex.querySelector('.inp-4').value

        // формуємо рядок у форматі:
        // "Питання.Вірна,Відповідь1,Відповідь2,Відповідь3,Відповідь4"
        let exValue = `${q}.${a_corect},${a_one},${a_two},${a_three},${a_four}`
        // додаємо в масив
        questionAnswers.push(exValue)
    })

    // ховаємо поля вводу і кнопки
    exercise.style.display = 'none'
    buttonPlus.style.display = 'none'
    buttonEnd.style.display = 'none'

    // очищаємо блок результатів перед виводом
    test.innerHTML = ""

    // виводимо усі питання з масиву як готовий тест
    questionAnswers.forEach(endValue => {
        // розділяємо текст на питання та відповіді
        let qa = endValue.split('.')    // [0] - питання, [1] - відповіді
        let q = qa[0]                   // текст питання
        let aAll = qa[1].split(',')     // масив з усіма відповідями

        // додаємо в HTML готовий блок
        test.insertAdjacentHTML("beforeend", `
            <div class="Tex">
                <h1 class="Tquestion">${q}</h1>
                <div class="Tanswers">
                    <h2 class="Tans Tcorect">варіант відповіді<br><button class="Tinp-corect">${aAll[0]}</button></h2>
                    <h2 class="Tans">варіант відповіді<br><button class="Tinp-1">${aAll[1]}</button></h2>
                    <h2 class="Tans">варіант відповіді<br><button class="Tinp-2">${aAll[2]}</button></h2>
                    <h2 class="Tans">варіант відповіді<br><button class="Tinp-3">${aAll[3]}</button></h2>
                    <h2 class="Tans">варіант відповіді<br><button class="Tinp-4">${aAll[4]}</button></h2>
                </div>
            </div>
        `)
    })
})
