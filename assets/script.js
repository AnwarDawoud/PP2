document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        {
            question: 'What is the largest ocean in the world?',
            options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
            correctAnswer: 'Pacific Ocean',
            image: 'images/pacific-ocean.jpg'
        },
        {
            question: 'What is the capital city of France?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            correctAnswer: 'Paris',
            image: 'images/paris.jpg'
        },
        
        {
            question: 'Which country is known as the "Land of the Rising Sun"?',
            options: ['China', 'Japan', 'Thailand', 'South Korea'],
            correctAnswer: 'Japan',
            image: 'images/japan.jpg'
        },
        {
            question: 'What is the largest desert in the world?',
            options: ['Sahara Desert', 'Gobi Desert', 'Arabian Desert', 'Kalahari Desert'],
            correctAnswer: 'Sahara Desert',
            image: 'images/sahara-desert.jpg'
        },
        {
            question: 'What is the capital city of Australia?',
            options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
            correctAnswer: 'Canberra',
            image: 'images/canberra.jpg'
        },
        {
            question: 'Which is the longest river in the world?',
            options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
            correctAnswer: 'Nile River',
            image: 'images/nile-river.jpg'
        },
        {
            question: 'Which city is famous for its canals and gondolas?',
            options: ['Venice', 'Amsterdam', 'Bruges', 'Copenhagen'],
            correctAnswer: 'Venice',
            image: 'images/venice.jpg'
        },
        {
            question: 'What is the highest mountain in the world?',
            options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
            correctAnswer: 'Mount Everest',
            image: 'images/mount-everest.jpg'
        },
        {
            question: 'Which country is home to the Great Barrier Reef?',
            options: ['Australia', 'Brazil', 'Mexico', 'Thailand'],
            correctAnswer: 'Australia',
            image: 'images/great-barrier-reef.jpg'
        },
        {
            question: 'What is the largest country by land area?',
            options: ['Russia', 'Canada', 'China', 'United States'],
            correctAnswer: 'Russia',
            image: 'images/russia.jpg'
        },
        {
            question: 'Which continent is known for its diverse wildlife and safaris?',
            options: ['Africa', 'Asia', 'South America', 'Australia'],
            correctAnswer: 'Africa',
            image: 'images/africa.jpg'
        },

        {
            question: 'What is the currency of Japan?',
            options: ['Yuan', 'Dollar', 'Yen', 'Euro'],
            correctAnswer: 'Yen',
            image: 'images/japan-currency.jpg'
        },
        {
            question: 'Which country is famous for the Taj Mahal?',
            options: ['India', 'Egypt', 'Italy', 'Spain'],
            correctAnswer: 'India',
            image: 'images/taj-mahal.jpg'
        },
        {
            question: 'What is the official language of Brazil?',
            options: ['English', 'Spanish', 'Portuguese', 'French'],
            correctAnswer: 'Portuguese',
            image: 'images/brazil-language.jpg'
        },
        {
            question: 'Which city is known as the "Eternal City"?',
            options: ['Rome', 'Athens', 'Florence', 'Cairo'],
            correctAnswer: 'Rome',
            image: 'images/rome.jpg'
        },
        {
            question: 'What is the largest waterfall in the world?',
            options: ['Angel Falls', 'Niagara Falls', 'Iguazu Falls', 'Victoria Falls'],
            correctAnswer: 'Angel Falls',
            image: 'images/angel-falls.jpg'
        },
        {
            question: 'Which country is known as the "Land Down Under"?',
            options: ['Australia', 'New Zealand', 'Argentina', 'South Africa'],
            correctAnswer: 'Australia',
            image: 'images/australia.jpg'
        },
        {
            question: 'What is the capital city of Canada?',
            options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
            correctAnswer: 'Ottawa',
            image: 'images/ottawa.jpg'
        },
        {
            question: 'Which is the largest lake in Africa?',
            options: ['Lake Victoria', 'Lake Tanganyika', 'Lake Malawi', 'Lake Chad'],
            correctAnswer: 'Lake Victoria',
            image: 'images/lake-victoria.jpg'
        },
        {
            question: 'Which city is famous for its carnival celebration?',
            options: ['Rio de Janeiro', 'New Orleans', 'Venice', 'Cologne'],
            correctAnswer: 'Rio de Janeiro',
            image: 'images/rio-carnival.jpg'
        },
        {
            question: 'What is the national animal of Canada?',
            options: ['Lion', 'Panda', 'Kangaroo', 'Beaver'],
            correctAnswer: 'Beaver',
            image: 'images/canada-beaver.jpg'
        },
    ];

    // Function to shuffle the questions array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(questions); // Shuffle the questions array

    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let currentQuestionIndex = 0;
    let username = '';

    const usernameInput = document.getElementById('username');
    const usernameLabel = document.getElementById('username-label');
    const startButton = document.getElementById('start');
    const scoreContainer = document.getElementById('score-container');
    const scoreValueElement = document.getElementById('score-value');
    const correctAnswersElement = document.getElementById('correct-answers');
    const wrongAnswersElement = document.getElementById('wrong-answers');
    const feedbackElement = document.getElementById('feedback');
    const questionContainer = document.getElementById('question-container');
    const submitButton = document.getElementById('submit');
    const nextButton = document.getElementById('next');
    const submitQuizButton = document.getElementById('submit-quiz');

    startButton.addEventListener('click', function () {
        username = usernameInput.value.trim();
        if (username) {
            usernameLabel.textContent = `Username: ${username}`;
            startButton.style.display = 'none';
            usernameInput.disabled = true;
            scoreContainer.style.display = 'block';
            scoreValueElement.textContent = score;
            correctAnswersElement.textContent = `Correct Answers: ${correctAnswers}`;
            wrongAnswersElement.textContent = `Wrong Answers: ${wrongAnswers}`;
            displayQuestion();
        } else {
            alert('Please enter a username!');
        }
    });

    submitButton.addEventListener('click', function () {
        checkAnswer();
        submitButton.style.display = 'none';
        if (currentQuestionIndex < 4) {
            nextButton.style.display = 'block';
        } else {
            submitQuizButton.style.display = 'block';
        }
    });

    nextButton.addEventListener('click', function () {
        currentQuestionIndex++;
        nextButton.style.display = 'none';
        submitButton.style.display = 'block';
        displayQuestion();
    });

    submitQuizButton.addEventListener('click', function () {
        evaluateQuiz();
    });

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];

            questionContainer.innerHTML = `
                <div class="question">${currentQuestion.question}</div>
                <div class="options">
                    ${currentQuestion.options
                    .map(
                        (option, index) => `
                                <div class="option">
                                    <input type="radio" id="option-${index}" name="answer" value="${option}">
                                    <label for="option-${index}">${option}</label>
                                </div>
                            `
                    )
                    .join('')}
                </div>
            `;

            // Reset feedback message
            feedbackElement.textContent = '';

            // Show submit button
            submitButton.style.display = 'block';

            // Hide next button
            nextButton.style.display = 'none';

            // Hide submit quiz button
            submitQuizButton.style.display = 'none';
        } else {
            // If all questions are answered, hide the question container
            questionContainer.style.display = 'none';

            // Hide submit button
            submitButton.style.display = 'none';

            // Hide next button
            nextButton.style.display = 'none';

            // Show submit quiz button
            submitQuizButton.style.display = 'block';

            // Evaluate the quiz and display the final score
            evaluateQuiz();
        }
    }

    function checkAnswer() {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedOption = document.querySelector('input[name="answer"]:checked');

        if (selectedOption) {
            if (selectedOption.value === currentQuestion.correctAnswer) {
                score++;
                correctAnswers++;
                feedbackElement.innerHTML = '<span class="correct-feedback">Correct!</span>';
            } else {
                wrongAnswers++;
                feedbackElement.innerHTML = '<span class="incorrect-feedback">Incorrect!</span>';
            }
        } else {
            feedbackElement.innerHTML = '<span class="no-answer-feedback">Please select an answer!</span>';
        }

        // Update score value
        scoreValueElement.textContent = score;
        correctAnswersElement.textContent = `Correct Answers: ${correctAnswers}`;
        wrongAnswersElement.textContent = `Wrong Answers: ${wrongAnswers}`;
    }

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        const starsContainer = document.getElementById('stars-container');
        const containerWidth = starsContainer.clientWidth;
        const containerHeight = starsContainer.clientHeight;
        const radius = Math.min(containerWidth, containerHeight) * 0.4; // Set the radius of the circle (adjust as needed)
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const angle = Math.random() * Math.PI * 2; // Random angle within 0 to 2*pi
        const starX = centerX + radius * Math.cos(angle);
        const starY = centerY + radius * Math.sin(angle);

        star.style.left = starX + 'px';
        star.style.top = starY + 'px';
        starsContainer.appendChild(star);

        // After a delay, remove the star from the DOM
        setTimeout(() => {
            star.remove();
        }, 2000);
    }

    function showStars() {
        for (let i = 0; i < 50; i++) {
            createStar();
        }
    }

    function evaluateQuiz() {
        // Display the final score message with the pluming stars effect
        const scoreMessage = document.createElement('h2');
        scoreMessage.textContent = `Your final score is ${score} out of 5.`;
        scoreMessage.id = "score-message";
        document.getElementById('question-container').appendChild(scoreMessage);

        if (score >= 4) {
            scoreMessage.style.color = "green"; // Set to green for scores greater than or equal to 4
            scoreMessage.textContent += ' Well done! Cognates!';
            showStars(); // Show the pluming stars effect
            // Remove the correct and incorrect feedback elements
            const quizContainer = document.querySelector('.quiz-container');
            const correctFeedback = quizContainer.querySelector('.correct-feedback');
            const incorrectFeedback = quizContainer.querySelector('.incorrect-feedback');
            if (correctFeedback) {
                correctFeedback.remove();
            }
            if (incorrectFeedback) {
                incorrectFeedback.remove();
            }
        } else {
            scoreMessage.style.color = "red"; // Set to red for scores less than 4
            scoreMessage.textContent += ' To improve your score, please retake the quiz.';
            submitQuizButton.style.display = 'none';
            resetQuiz();
        }

        questionContainer.innerHTML = '';
        questionContainer.appendChild(scoreMessage);
        submitButton.style.display = 'none';
        nextButton.style.display = 'none';
        submitQuizButton.style.display = 'none'
        // Show the pluming stars effect
        if (score > 4) {
            showStars();
        }
    }
    function resetQuiz() {
        score = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        currentQuestionIndex = 0;
        usernameInput.value = '';
        usernameInput.disabled = false;
        startButton.style.display = 'block';
        scoreContainer.style.display = 'none';
        questionContainer.innerHTML = '';
        feedbackElement.textContent = '';
        correctAnswersElement.textContent = `Correct Answers: ${correctAnswers}`;
        wrongAnswersElement.textContent = `Wrong Answers: ${wrongAnswers}`;
    }
});
