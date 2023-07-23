document.addEventListener("DOMContentLoaded", function () {
    let questions = null; // Initialize questions to null

    // Dynamic import to load the questions module
    import('java-modules/questions.js')
        .then((module) => {
            questions = module.default; // Assign the questions array from the module
            // Call the function to start the quiz after loading the questions
            startQuiz();
        })
        .catch((err) => {
            console.error("Failed to load questions module:", err);
        });

    function startQuiz() {
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

        const usernameInput = document.getElementById('username');
        const usernameContainer = document.getElementById('username-container');
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
            const username = usernameInput.value.trim();
            if (username) {
                usernameLabel.textContent = `Username: ${username}`;
                usernameContainer.style.display = 'none'; // Hide the username container
                startButton.style.display = 'none';
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
            // Hide the username container during the quiz
            usernameContainer.style.display = 'none';

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

                // Show the username container again after the quiz ends
                usernameContainer.style.display = 'block';

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
            submitQuizButton.style.display = 'none';
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
            usernameContainer.style.display = 'block';
            startButton.style.display = 'block';
            scoreContainer.style.display = 'none';
            questionContainer.style.display = 'block';
            feedbackElement.textContent = '';
            correctAnswersElement.textContent = `Correct Answers: ${correctAnswers}`;
            wrongAnswersElement.textContent = `Wrong Answers: ${wrongAnswers}`;
        }
    }
});
