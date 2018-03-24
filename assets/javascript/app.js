//Get jQuery to start:
$(document).ready(function () {

  //Create the trivia questions and answer lists:
  var triviaQuestions = [
    {
      question: "What is the color of the five stars found on the flag of China?",
      answerList: ["Blue", "Red", "White", "Yellow"],
      answer: 3
    },

    {
      question: "What is the main dialect of Chinese spoken in Hong Kong by the majority of the locals?",
      answerList: ["Madarin", "Cantonese", "Sichuanese", "Shandong Hua"],
      answer: 1
    },

    {
      question: "Who was the first emperor of China?",
      answerList: ["Wu Ze Tian", "Zhu Yuan Zhang", "Qin Shi Huang", "Qian Long"],
      answer: 2
    },

    {
      question: "Who ruled China when Marco Polo reached there in 1266?",
      answerList: ["Kublai Khan", "Chengiz Khan", "Babur", "Akbar"],
      answer: 0
    },

    {
      question: "Which country does NOT border with China?",
      answerList: ["Iran", "Myanmar(Burma)", "Laos", "India"],
      answer: 0
    },

    {
      question: "There are two major rivers in China. One is the Yangtze, the other is the:",
      answerList: ["Honshui", "Huang", "Mekong", "Tarim"],
      answer: 1
    },

    {
      question: "Which of the following presidents did NOT visit China?",
      answerList: ["George W. Bush", "Richard Nixon", "Ronald Reagon", "Lyndon Johnson"],
      answer: 3
    },

    {
      question: "The era of Chinese history known as the Cultural Revolution began in which year?",
      answerList: ["1953", "1960", "1966", "1976"],
      answer: 2
    },

    {
      question: "Which of these is a specialty rice dumpling that is particularly popular during the Dragon Boat Festival in the summer?",
      answerList: ["Char Siu", "Mapo Dofu", "Hargau", "Zongzi"],
      answer: 3
    },

    {
      question: "Which of these ingredients is absolutely necessary to make a good batch of the popular Chinese dish ‘Kung Pao Chicken’?",
      answerList: ["Peanuts", "Eggs", "Lotus Roots", "Fish Sauce"],
      answer: 0
    },

    {
      question: "Which of these exotic items is not a part of Chinese cuisine?",
      answerList: ["Jellyfish", "Sea Cucumber", "Bird's saliva", "Rhino's horn"],
      answer: 3
    },

    {
      question: "For the Chinese, this color is associated with death, considered extremely unlucky during the New Year celebrations, and should be rigorously avoided. What color is this?",
      answerList: ["Black", "Red", "White", "Green"],
      answer: 2
    },

    {
      question: "This Chinese festival falls on the seventh month of the Chinese almanac, when the gates of hell are believed to be opened. The main rituals of this major occult festival are held on the 15th, and it lasts a whole month. Which festival is this?",
      answerList: ["Mid-Autumn Festival", "Lantern Festival", "Dragon Boat Festival", "Spring Festival"],
      answer: 0
    },

    {
      question: "In the lunar calendar, each year is named after an animal. The Buddha once summoned all living creatures, but only twelve came at his bidding. To mark their faithfulness, he named a year after each one. Which is NOT one of the animals?",
      answerList: ["Dog", "Cat", "Rat", "Chinese Dragon"],
      answer: 1
    },

    {
      question: "The Chinese always believed that on a map, China looks like this animal. What is the female version of this animal in Chinese?",
      answerList: ["Chicken", "Fish", "Chinese Dragon", "Dog"],
      answer: 2
    }

  ];

  //create undefined relevant variables:
  var currentQuestion;
  var correctAnswer;
  var incorrectAnswer;
  var unanswered;
  var seconds;
  var time;
  var answered;
  var userChoice;

  //Messages shown when answering questions:
  var messages = {
    correct: "Congratulations! That is correct!",
    incorrect: "Oops...wrong answer!",
    endTime: "Time's up!",
    finished: "Let's see how you did!"
  }

  $('#startBtn').on('click', function () {
    $(this).hide();
    newGame();
  });

  $('#startOverBtn').on('click', function () {
    $(this).hide();
    newGame();
  });

  //Function to reset everything:
  function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
  }

  //Display new questions:
  function newQuestion() {

    //Clean last question:
    $('#message').empty();
    $('#correctedAnswer').empty();
    answered = true;


    $('#currentQuestion').html('Question ' + (currentQuestion + 1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (var i = 0; i < 4; i++) {
      var choices = $('<div>');
      choices.text(triviaQuestions[currentQuestion].answerList[i]);
      choices.attr({ 'data-index': i });
      choices.addClass('thisChoice');
      $('.answerList').append(choices);
    }
    countdown();


    $('.thisChoice').on('click', function () {
      userChoice = $(this).data('index');
      clearInterval(time);
      answerPage();
    });
  }

  //Count the time:
  function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;

    time = setInterval(showCountdown, 1000);
  }

  //Display the counting procedure:
  function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
      clearInterval(time);
      answered = false;
      answerPage();
    }
  }

  //Display the answers:
  function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty();
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;



    if ((userChoice == rightAnswerIndex) && (answered == true)) {
      correctAnswer++;
      $('#message').html(messages.correct);
    } else if ((userChoice != rightAnswerIndex) && (answered == true)) {
      incorrectAnswer++;
      $('#message').html(messages.incorrect);
      $('#correctedAnswer').html('The correct answer is: ' + rightAnswerText);
    } else {
      unanswered++;
      $('#message').html(messages.endTime);
      $('#correctedAnswer').html('The correct answer is: ' + rightAnswerText);
      answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
      setTimeout(showscore, 3000)
    } else {
      currentQuestion++;
      setTimeout(newQuestion, 3000);
    }
  }

  //Score:
  function showscore() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();


    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Try Again?');
  }






});