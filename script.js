const form = document.querySelector('form')
const result = document.querySelector('.result')
const correctOption = document.querySelector('#correct')
const incorrectOption = document.querySelector('#incorrect')
let score = 0;
const title = document.querySelector(".question span")
const answers = document.querySelectorAll(".answers ul li");
const prevBtn = document.getElementById('previous')
const nextBtn = document.getElementById('next') 
const totalQuestions = document.getElementById('totalQuestions');
const heading = document.getElementById('heading');

correctOption.style.display = "none"
incorrectOption.style.display = "none"
result.style.display = "none"

const reqQuestion = prompt('How many question do you want ?');

const url = `https://quiz26.p.rapidapi.com/questions?cat=c&sort=questions&limit=${reqQuestion}&page=3`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6f692112c4msh67a2f9cedce6f8bp1f05a6jsnb801684049df',
		'X-RapidAPI-Host': 'quiz26.p.rapidapi.com'
	}
};
let currentQuestionIndex = 0;

async function fetchData() {
    try {
        let response = await fetch(url, options);
        let quizData = await response.json();

        totalQuestions.innerText = `No of Questions : ${reqQuestion}`

        // setting up the questions and answers        
        setQuestion(quizData.data[currentQuestionIndex]);

        nextBtn.addEventListener('click', () => {
            if (currentQuestionIndex < quizData.data.length - 1) {
                currentQuestionIndex++;
                setQuestion(quizData.data[currentQuestionIndex]);
            } else {
                heading.innerText = `Socre : ${score}`
                alert('You have reached the last question.');
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                setQuestion(quizData.data[currentQuestionIndex]);
            } else {
                alert('You are on the first question.');
            }
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
        
            let selectedOption = document.querySelector('input[name="option"]:checked');
            console.log(selectedOption.value)

            if (selectedOption) {
                console.log(quizData.data[0].answer)
                if (selectedOption.value === `${quizData.data[currentQuestionIndex].answer}`) {
                    correctOption.style.display = 'inline flex';
                    incorrectOption.style.display = 'none';
                    score++;
                } else {
                    correctOption.style.display = 'none';
                    incorrectOption.style.display = 'inline flex';
                }
                result.style.display = "flex"
            } 
            else {
                alert('Please select an option before submitting.');
            }
        })
    } 
    catch (error) {
        console.error(error);
    }
}
function setQuestion(questionData) {
    title.innerHTML = questionData.question;
    let i = 0;
    answers.forEach(li => {
        li.childNodes[3].innerHTML = questionData.options[i];
        li.childNodes[1].value = questionData.options[i];
        i++;
    });
}

fetchData();

