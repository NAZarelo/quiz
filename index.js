let buttonPlus = document.querySelector('.plus')
let buttonEnd = document.querySelector('.end')
let exercise = document.querySelector('.exercise')
let inp_corect = document.querySelector('.inp-corect')
let inp_one = document.querySelector('.inp-1')
let inp_two = document.querySelector('.inp-2')
let inp_three = document.querySelector('.inp-3')
let inp_four = document.querySelector('.inp-4')
let question = document.querySelector('.question')
let test = document.querySelector('.test')

let questionAnswers = []

function end() {
    exercise.style.display = 'none'
    buttonPlus.style.display = 'none'
    buttonEnd.style.display = 'none'
    for(let i = 0; i < questionAnswers.length; i += 1) {
        let endValue =  questionAnswers[i]
        qa = (endValue.split('.'))
        q = qa[0]
        a = qa[1]
        aAll = (a.split(','))
        a_corect = aAll[0]
        a_one = aAll[1]
        a_two = aAll[2]
        a_three = aAll[3]
        a_four = aAll[4]
        test.innerHTML += `<div class="Tex">
            <h1 class="Tquestion">${q}</h1>
            <div class="Tanswers">
                <h2 class="Tans Tcorect">варіант відповіді<br><button class="Tinp-corect">${a_corect}</button></h2>
                <h2 class="Tans">варіант відповіді<br><button class="Tinp-1">${a_one}</button></h2>
                <h2 class="Tans">варіант відповіді<br><button class="Tinp-2">${a_two}</button></h2>
                <h2 class="Tans">варіант відповіді<br><button class="Tinp-3">${a_three}</button></h2>
                <h2 class="Tans">варіант відповіді<br><button class="Tinp-4">${a_four}</button></h2>
            </div>
        </div>`
    }
}

buttonPlus.addEventListener('click', function() {
    exercise.innerHTML += `<div class="ex">
            <h1>ПИТАННЯ<br><input class="question" type="text"></h1>
            <div class="answers">
                <h2 class="ans corect">варіант відповіді<br><input class="inp-corect" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input class="inp-1" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input class="inp-2" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input class="inp-3" type="text"></h2>
                <h2 class="ans">варіант відповіді<br><input class="inp-4" type="text"></h2>
            </div>
        </div>`
    let exValue = question.value + '.' + inp_corect.value + "," + inp_one.value + "," + inp_two.value + "," + inp_three.value + "," + inp_four.value
    questionAnswers.push (exValue)
    exercise.innerHTML += `${questionAnswers}`
})
buttonEnd.addEventListener('click', function() {
    let exValue = question.value + '.' + inp_corect.value + "," + inp_one.value + "," + inp_two.value + "," + inp_three.value + "," + inp_four.value
    questionAnswers.push (exValue)
    exercise.innerHTML += `${questionAnswers}`
    end()
})
