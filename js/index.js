/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
  });

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3, // array index 3 - so Pacific Ocean is the correct answer here
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1, // array index 1 - so Canberra is the correct answer here
    },
    {
      q: "What is the longest river in the world",
      o: ["Yangtze", "Mississippi", "The Nile", "Amazon"],
      a: 2, // array index 2 - so The Nile is the correct answer here
    },
    {
      q: "What is the highest mountain in world",
      o: ["K2", "Mount Everest", "Lhotse", "Makalu"],
      a: 1, // array index 1 - so Mount Everest is the correct answer here
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);

        // if the answer is correct, highlight the correct answer
        if (quizItem.a == i) {
          liElement.style.backgroundColor = "#00ff00";
        }

        // calculate score
        if (radioElement.checked && quizItem.a == i) {
          score++;
        }
      }
    });
  };

  // Display the score



  const displayScore = () => {
    const scoreWrap = document.querySelector("#score");
    let scoreDisplay = "";

    scoreDisplay += `<h3>Your score is ${score} out of ${quizArray.length}</h3>`;
    scoreWrap.innerHTML = scoreDisplay;
  };



  // Event listener for the submit button
  const submitButton = document.querySelector("#btnSubmit");
  submitButton.addEventListener("click", function (e) {
    calculateScore();
    displayScore();
    // highlight the correct answers
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);
        if (quizItem.a == i) {
          liElement = document.querySelector("#" + li);
          liElement.style.backgroundColor = "#00ff00";
        }
      }
    });

    //hide the quiz block
    // document.querySelector('#quizBlock').style.display = 'none'; */
    // show the score block
    document.querySelector("#score").style.display = "block";

  });

  // Event listener for the reset button
  const resetButton = document.querySelector("#btnReset");
  resetButton.addEventListener("click", function (e) {
    window.location.reload();
  });


  // setTimeout
  const timer = document.querySelector("#time");
  let time = 60;
  let interval = setInterval(function () {
    time--;
    timer.innerHTML = time;
    if (time <= 0) {
      clearInterval(interval);
      calculateScore();
      displayScore();
      // highlight the correct answers
      quizArray.map((quizItem, index) => {
        for (let i = 0; i < 4; i++) {
          //highlight the li if it is the correct answer
          let li = `li_${index}_${i}`;
          liElement = document.querySelector("#" + li);
          if (quizItem.a == i) {
            liElement.style.backgroundColor = "#00ff00";
          }
        }
      });
    }
  }, 1000);
    // call the displayQuiz function
    displayQuiz();
  });



