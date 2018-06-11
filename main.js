var trigger = [
  ["hi", "hey", "hello"],
  ["how are you", "how is life", "how are things"],
  ["what are you doing", "what is going on"],
  ["how old are you"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you"],
  [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name"
  ],
  ["i love you"],
  ["happy", "good"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "yes", "ok", "okay", "nice", "thanks", "thank you"],
  ["bye", "good bye", "goodbye", "see you later"]
];
var reply = [
  ["Hi", "Hey", "Hello"],
  ["Fine", "Pretty well", "Fantastic"],
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guest?",
    "I don't know actually"
  ],
  ["I am 1 day old"],
  ["I am just a bot", "I am a bot. What are you?"],
  ["Ken", "My God"],
  ["I am Bobby", "Bobby's my name"],
  ["I love you too", "Me too"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Why?", "Why? You shouldn't!", "Try watching TV"],
  ["I will", "What about?"],
  [
    "Tell me a story",
    "Tell me a joke",
    "Tell me about yourself",
    "You are welcome"
  ],
  ["Bye", "Goodbye", "See you later"]
];
var alternative = ["Haha...", "Eh..."];

var questions = [
  "Hello, before you can ask me anything I'd like to know about you. What's your name?", // question 0
  "Where are you from?",
  "What's your age?",
  "What is your favourite movie?", // question 3
  "I am great at multiplying by 435, try typing in a number ...",
  `Now ask me some questions`
];

var films = [
  { name: "blackpanther", rating: 4 },
  { name: "readyplayerone", rating: 3 },
  { name: "titanic", rating: 2 }
];

// num stands for the question number (starting at zero)
function computeResponse(input) {
  var response = "";
  try {
    response = input + "=" + eval(input);
    return response;
  } catch (e) {
    var text = input.toLowerCase().replace(/[^\w\s\d]/gi, ""); //remove all chars except words, space and
    text = text
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "");
    if (compare(trigger, reply, text)) {
      response = compare(trigger, reply, text);
      return response;
    } else {
      response = alternative[Math.floor(Math.random() * alternative.length)];
      return response;
    }
  }
}

function compare(arr, array, string) {
  var item;
  for (var x = 0; x < arr.length; x++) {
    for (var y = 0; y < array.length; y++) {
      if (arr[x][y] == string) {
        items = array[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  return item;
}
// Step thought the questions and display the chatbox responses.

var inputBox = document.querySelector("#answer");
var output = document.querySelector("#result");
var waitTimeInMilliseconds = 1000;
var num = 0;

function showResponse() {
  var input = inputBox.value;
  if (input !== "") {
    let response = "";
    if (num === 0) {
      response = `Hello ${input}!`;
    } else if (num === 1) {
      response = `${input} must be a good place`;
    } else if (num === 2) {
      response = `So you were born in ${2017 - input}`;
    } else if (num === 3) {
      let rating = 0;
      for (var i = 0; i < films.length; i++) {
        if (films[i].name === input) {
          rating = films[i].rating;
          response = `${input} is rated ${rating} right?`;
        } else {
          response = `Never watched it before....`;
        }
      }
    } else if (num === 4) {
      response = input * 435;
    } else {
      response = computeResponse(input);
      console.log(response);
    }

    output.innerHTML = response;
    speak(response);
    if (num < 5) {
      inputBox.setAttribute(
        "placeholder",
        `Wait for ${timeInSeconds(waitTimeInMilliseconds)} secs`
      );
      inputBox.value = "";
      inputBox.setAttribute("disabled", true);
      num++;
      setTimeout(changeQuestion, waitTimeInMilliseconds);
    } else {
      inputBox.value = "";
    }
  }
}

// Time to wait before showing the next question, in milliseconds
// var waitTimeInMilliseconds = 0;
var totalQuestions = questions.length - 1;

// Displays the first question.
output.innerHTML = questions[num];

function changeQuestion() {
  inputBox.setAttribute("placeholder", "Enter your response");
  // Re-allow the user to type an answer and reset focus on the input field.
  inputBox.removeAttribute("disabled");
  $("#answer").focus();
  // Picks out the question we are currently on.
  output.innerHTML = questions[num];

  // End of the chat, hide the response input field.
  // if (num === totalQuestions) {
  //   inputBox.style.visibility = "hidden";
  // }
}

// Helper function to convert milliseconds into seconds.
function timeInSeconds(milliseconds) {
  return milliseconds / 1000;
}

function speak(response) {
  var utterance = new SpeechSynthesisUtterance();
  utterance.voice = speechSynthesis.getVoices().filter(function(voice) {
    return voice.name == "Google UK English Female";
  })[0];
  utterance.text = response;
  utterance.lang = "en-US";
  utterance.volume = 1; //0-1 interval
  utterance.rate = 1;
  utterance.pitch = 1; //0-2 interval
  speechSynthesis.speak(utterance);
}

$(document).ready(function() {
  speak(questions[0]);
});

$(document).on("keypress", function(event) {
  // When the user hits the enter key trigger showing the response.
  if (event.which === 13) {
    showResponse();
  }
});

$("#begin").on("click", function(event) {
  // When the user hits the enter key trigger showing the response.
  $("#answer").focus();
});

// Initally focus on the answer input field.
if ($(window).width() > 700) {
  $("#answer").focus();
}
