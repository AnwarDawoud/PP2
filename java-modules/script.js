/*jshint esversion: 8 */
document.addEventListener("DOMContentLoaded", function () {
    let questions = null; // Initialize questions to null

    const usernameInput = document.getElementById('username');
    const usernameContainer = document.getElementById('username-container');
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
    const starsContainer = document.getElementById('stars-container');

    startButton.addEventListener('click', function () {
        const username = usernameInput.value.trim();
        if (username) {
            usernameContainer.style.display = 'none'; // Hide the username container
            startButton.style.display = 'none';
            scoreContainer.style.display = 'block';
            scoreValueElement.textContent = 0;
            correctAnswersElement.textContent = 'Correct Answers: 0';
            wrongAnswersElement.textContent = 'Wrong Answers: 0';
            fetchQuestionsAndStartQuiz();
        } else {
            alert('Please enter a username!');
        }
    });

    function fetchQuestionsAndStartQuiz() {
        // Fetch the questions from the questions.js file
        fetch('java-modules/questions.js')
            .then((response) => response.text())
            .then((data) => {
                // Evaluate the dynamically loaded script
                eval(data);

                // Check if the 'questions' variable is defined
                if (typeof window.questions !== 'undefined' && Array.isArray(window.questions) && window.questions.length > 0) {
                    questions = window.questions; // Assign the fetched questions to the local 'questions' variable
                    startQuiz();
                } else {
                    throw new Error('Failed to load questions. Please refresh the page and try again.');
                }
            })
            .catch((err) => {
                console.error("Failed to load questions:", err);
            });
    }

    function startQuiz() {
        let score = 0;
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let currentQuestionIndex = 0;

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffleArray(questions); // Shuffle the questions array

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
                // If all questions are answered, remove the question container
                questionContainer.innerHTML = '';

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
            // Remove all children (questions and options) from the question container
            questionContainer.innerHTML = '';

            // Hide the "Submit Quiz" button and the "Submit" button in the final score page
            submitQuizButton.classList.add('hide');
            submitButton.classList.add('hide');

            // Remove the "Submit Quiz" button and the "Submit" button in the final score page
            submitQuizButton.remove();
            submitButton.remove();

            // Hide the "Submit Quiz" button in the final score page
            submitQuizButton.classList.add('hide');

            // Hide the username container and the "Start Quiz" button
            usernameContainer.style.display = 'none';
            startButton.style.display = 'none';

            // Display the final score message with the pluming stars effect
            const scoreMessage = document.createElement('h2');
            scoreMessage.textContent = `Your final score is ${score} out of 5.`;
            scoreMessage.id = "score-message";
            document.getElementById('question-container').appendChild(scoreMessage);

            if (score >= 4) {
                scoreMessage.style.color = "green"; // Set to green for scores greater than or equal to 4
                scoreMessage.textContent += ' Well done! Cognates!';
                showStars(); // Show the pluming stars effect

                // Remove the feedback element itself
                const feedbackElement = document.querySelector('.feedback');
                if (feedbackElement) {
                    feedbackElement.remove();
                }
            } else {
                scoreMessage.style.color = "red"; // Set to red for scores less than 4

                // Remove the feedback element itself
                const feedbackElement = document.querySelector('.feedback');
                if (feedbackElement) {
                    feedbackElement.remove();
                }

                // Remove the "Please select an answer!" message
                const noAnswerFeedback = document.querySelector('.no-answer-feedback');
                if (noAnswerFeedback) {
                    noAnswerFeedback.remove();
                }


                // Create the "Retake Quiz" button
                const retakeQuizButton = document.createElement('button');
                retakeQuizButton.textContent = 'Retake Quiz';
                retakeQuizButton.id = 'retake-quiz';
                document.getElementById('question-container').appendChild(retakeQuizButton);

                // Add event listener to the "Retake Quiz" button
                retakeQuizButton.addEventListener('click', function () {
                    // Reload the page to begin a new quiz
                    window.location.reload();
                });

                // Reset the quiz scores and question index
                score = 0;
                correctAnswers = 0;
                wrongAnswers = 0;
                currentQuestionIndex = 0;
            }

            nextButton.style.display = 'none';
            // Show the pluming stars effect if score is greater than 4
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

        displayQuestion();
    }
});
