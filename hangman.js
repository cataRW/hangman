let allWords = ['matemathic', 'mate', 'friends', 'wellcode', 'youtube', 'facebook', 'function', 'zuckerberg', 'selector', 'entertaining', 'funny', 'united', 'translate', 'work', 'house', 'crypto', 'then', 'and', 'random', 'customize', 'sleep', 'drink', 'food', 'run'];
let rounds = 1;
let wrongs, randomWord;

function visibilitySetter() {
  document.getElementById('startGame').style.visibility = 'hidden';
  document.querySelector('.restart-container').style.visibility = 'hidden';
  document.querySelector('.status').style.visibility = 'visible';

  for(let i = 0; i < 10; ++i) {
    document.getElementById(100 + i).style.visibility = 'hidden';
  }
}

function letterChangeInRandomWord(letter) {
  let letterIndex = randomWord.indexOf(letter);

  if(letterIndex === 0) {
    randomWord = '_' + randomWord.substr(letterIndex + 1);
  }else if(letterIndex === randomWord.length - 1) {
    randomWord = randomWord.substr(0, letterIndex) + '_';
  }else {
    randomWord = randomWord.substr(0, letterIndex) + '_' + randomWord.substr(letterIndex + 1);
  }
}

function inputOutputCreator(firstLetter) {
  $('body').append('<div class="input-output-container"></div>');
  $('.input-output-container').append('<div class ="inputLetters"></div>').append('<label for="userInput" class="userInputLabel">Add your letter here: </label>').append('<input id="userInput" type="text" placeholder="here" value="" autofocus />').append('<input id="submitInput" type="submit" value="submit" onclick="inputCheck()"/>');
  $('.input-output-container').append('<div class="outputLetters"></div>');

  for(let i = 0; i < randomWord.length; ++i) {
    if(randomWord[i] === firstLetter) {
      $('.outputLetters').append('<div class="word" id="'+ i +'"> ' + firstLetter + ' </div>');
      letterChangeInRandomWord(firstLetter);
    }else {
      $('.outputLetters').append('<div class="word" id="' + i + '"> _ </div>');
    }
  }
}

function startGame() {
  wrongs = 0;
  randomWord = allWords[Math.floor(Math.random() * allWords.length)];

  document.querySelector('.wrongs').innerText = wrongs;
  document.querySelector('.rounds').innerText = rounds;
  document.querySelector('.finalMessage').innerText = '!!!YOU WON, CONGRATS!!!';

  visibilitySetter();
  inputOutputCreator(randomWord[wrongs]);
}

function inputCheck() {
  const input = document.getElementById('userInput').value.toLowerCase();
  if(input.length === 1 && /[a-z]/i.test(input)) {
    document.querySelector('.userInputLabel').innerText = 'Add your letter here: ';
    gameStateCheck(input);
  }else {
    document.querySelector('.userInputLabel').innerText = 'Please, a letter and just one letter!';
  }
}

function gameStateCheck(input) {
  let index = randomWord.indexOf(input);
  const message = document.querySelector('.finalMessage');

  if(index !== -1) {
    while(index !== -1) {
      document.getElementById(index).innerText = input;
      letterChangeInRandomWord(input);
      index = randomWord.indexOf(input);
    }
    if(/[a-z]/i.test(randomWord) == false) {
      endGame(message.innerText);
    }
  }else {
    document.getElementById(100 + wrongs).style.visibility = 'visible';
    document.querySelector('.wrongs').innerText = ++wrongs;
    if(wrongs == 10) {
      message.innerText = '!!!YOU LOSE, TRY AGAIN!!!';
      endGame(message.innerText);
    }
  }
}

function endGame(message) {
  document.querySelector('.input-output-container').remove();
  document.querySelector('.restart-container').style.visibility = 'visible';
  ++rounds;
}
