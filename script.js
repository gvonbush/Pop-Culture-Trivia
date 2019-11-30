//creating empty variables
var category = "";
var difficulty = "";
var possiblePoints = 0;
var userScore = 0;
var gameTime = 60;
var correctAnswer = "";

// selecting html elements
var timerSpan = $("#timerValue")
var userScoreDiv = $("#user-score-div")
var gameSectionDiv = $("#game-section")
var questionAnswerDiv = $("#question-answer-section")
var questionDiv = $("#question-text")
var answerBtn1 = $("#answer-1")
var answerBtn2 = $("#answer-2")
var answerBtn3 = $("#answer-3")
var answerBtn4 = $("#answer-4")


// setting intitial value of timerSpan to gameTime
timerSpan.text("Timer: " + gameTime)

function generateQuestion(event) {
   event.preventDefault();

   var thisButton = $(this);
   var thisButtonData = thisButton.attr("data-game");

   console.log(thisButton.attr("data-game"));

   // this switch statement determines the URL that we're going to use in the API
   switch (thisButtonData) {
      case "easy-music":
         category = "12";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-music":
         category = "12";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      case "hard-music":
         category = "12";
         difficulty = "hard";
         possiblePoints = 500;
         break;
      case "easy-film":
         category = "11";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-film":
         category = "11";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      case "hard-film":
         category = "11";
         difficulty = "hard";
         possiblePoints = 500;
         break;
      case "easy-celebs":
         category = "26";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-celebs":
         category = "26";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      case "hard-celebs":
         category = "26";
         difficulty = "hard";
         possiblePoints = 500;
         break;
      case "easy-tv":
         category = "14";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-tv":
         category = "14";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      case "hard-tv":
         category = "14";
         difficulty = "hard";
         possiblePoints = 500;
         break;
      case "easy-cartoon":
         category = "32";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-cartoon":
         category = "32";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      case "hard-cartoon":
         category = "32";
         difficulty = "hard";
         possiblePoints = 500;
         break;
      case "easy-video-game":
         category = "10";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-video-game":
         category = "10";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      default:
         category = "10";
         difficulty = "hard";
         possiblePoints = 500;
   }

   console.log(category);
   console.log(difficulty);

   // query URL for the AJAX call
   var queryURL = "https://opentdb.com/api.php?amount=1&category=" + category + "&difficulty=" + difficulty + "&type=multiple";

   console.log(queryURL);

   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(
      function (response) {

         // // creating html elements to hold content
         // var questionDiv = $("<div>");
         // var answerButton1 = $("<button>");
         // var answerButton2 = $("<button>");
         // var answerButton3 = $("<button>");
         // var answerButton4 = $("<button>");

         // // adding placeholder classes to the buttons
         // answerButton1.attr("class", "btn btn-primary")
         // answerButton2.attr("class", "btn btn-primary")
         // answerButton3.attr("class", "btn btn-primary")
         // answerButton4.attr("class", "btn btn-primary")

         // getting the question from the AJAX call
         var question = response.results[0].question;

         // creating an empty array variable for the incorrec answers
         var possibleAnswers = [];

         // storing the correct answer in a variable. going to use this variable later in a comparison to say 'if value of the button pressed by the user === correctAnswer, take this action, else, take this action
         correctAnswer = response.results[0].correct_answer;
         console.log(correctAnswer)

         // looping through the object to push the incorrect answers into an array
         for (var i = 0; i < response.results[0].incorrect_answers.length; i++) {
            possibleAnswers.push(response.results[0].incorrect_answers[i]);
         }
         // adding correct answer to the array
         possibleAnswers.push(correctAnswer)

         // randomize possible answers - got this from w3schools
         possibleAnswers.sort(function (a, b) { return 0.5 - Math.random() });

         // // adding values to my HTML elements
         // questionDiv.text(question)
         // answerButton1.text(possibleAnswers[0])
         // answerButton2.text(possibleAnswers[1])
         // answerButton3.text(possibleAnswers[2])
         // answerButton4.text(possibleAnswers[3])

         // adding values to HTML elements
         questionDiv.text(question)
         answerBtn1.text(possibleAnswers[0]);
         answerBtn2.text(possibleAnswers[1]);
         answerBtn3.text(possibleAnswers[2]);
         answerBtn4.text(possibleAnswers[3]);

         gameSectionDiv.css("display", "none");
         questionAnswerDiv.css("display", "block");

         // this is where we'll have to collect the user's choice of answer and compare that to the correctAnswer variable

         $(".answer-option").on("click", function (event) {
            event.preventDefault();

            var thisAnswer = $(this)
            if (thisAnswer.text() === correctAnswer) {
               userScore = userScore + possiblePoints;
               userScoreDiv.text(userScore)
            } else {
               userScore = userScore - possiblePoints;
               userScoreDiv.text(userScore)
            }

            thisButton.css("display", "none");
            gameSectionDiv.css("display", "flex");
            questionAnswerDiv.css("display", "none");
            possiblePoints = 0;
         })
      }
   )
}

var timerInterval = setInterval(function () {
   gameTime--;
   timerSpan.text("Timer: " + gameTime);

   if (gameTime === 0) {
      clearInterval(timerInterval)
   }

}, 1000)


function timerStart() {
   timerInterval;
}


timerStart();
console.log(timerSpan);



$(".game-category").on("click", generateQuestion)
$("#start-button").on("click", timerStart)



// ajaxCall(easyMusicURL);
// ajaxCall(mediumCelebritiesURL)



// you get the jeoporday-style
// you get 18 choices - 6 categories and 3 different questions (100, 300, 500) for each category
// user presses 'start game'
// a 60-second timer starts
// you can answer as many questions as possible in the time
// if you get an answer right, you get the points for the category
// if youy get the answer wrong, you lose the points for the category
// game ends when 60 seconds is over OR if user answers all the questions
// then you get a 'here's your score' screen
// Score is at the top

// we need a funciton to start the game that will be triggered by an on-click event - colin, done
// we need to write function that takes in the user's selection for an answer and compares it to the correct answer - phill
// we need a timer that counts down for 60 seconds (can change that depending on gameplay) - colin, done
// we need a user score that increases and decreases depending on the user's response -phill
// a way to determine how many points each question is worth - if this.attr("data-game", "easy-music") set a variable possiblePoints = 1, etc., etc., lots of if else - colin, done
// develop the giphy ajax - phill

