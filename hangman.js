//i dont't know if it's a good practice what i have done here, please let me know Petru
let allWords = ['matemathic', 'mate', 'friends', 'wellcode', 'youtube', 'facebook', 'function', 'zuckerberg', 'selector', 'entertaining', 'funny', 'united', 'translate'];
let rounds = 1;
let wrongs, randomWord;

function startGame() {

  // i do that for the moment when the user restart the game
  wrongs = 0;
  randomWord = allWords[Math.floor(Math.random() * allWords.length)];

  // here I played a little bit with visibility
  for(let i = 0; i < 10; ++i) {
    $('#' + (100 + i)).css('visibility', 'hidden');
    if(i === 0) {
      $('#' + (100 + i)).css('visibility', 'visible');
    }
  }
  $(".wrongs").html(wrongs);
  $('.rounds').html(rounds);
  $("#startGame").hide();
  $('.status').css('visibility', 'visible');
  $('.restart-container').css('visibility', 'hidden');
  $('.finalMessage').html('!!!YOU WON, CONGRATS!!!');

// after the 'game start' when button was clicked i generate the game elements (like input, '_ _ _ _')
  $('.input-output-container').append('<div class="inputLetters"></div>');
  $('.input-output-container').append('<div class="outputLetters"></div>');
  $('.restart-container').css('visibility', 'hidden');
  $('.inputLetters').append('<label for="userInput" class="label">Add your letter here: </label>').append('<input id="userInput" type="text" placeholder="here" value="" autofocus />').append('<input id="submitInput" type="submit" value="submit" onclick="validInput()"/>');

  for(let i = 0; i < randomWord.length; ++i) {
    if(randomWord.charAt(0) === randomWord.charAt(i)) {
      $('.outputLetters').append('<div class="word" id="'+ i +'"> ' + randomWord.charAt(0) + ' </div>');
    } else {
      $('.outputLetters').append('<div class="word" id="' + i + '"> _ </div>');
    }
  }
  randomWord = '_' + randomWord.substr(1); //if i hadn't done this the endGame function it will never be called if the player win
}

//here i wanna to be sure that the input it is a single letter
function validInput() {
  let input = $('#userInput').val();
  input = input.toLowerCase();
  if(input.length === 1 && ('a' <= input && input <= 'z')) {
    $('.label').text('Add your letter here: ');
    gameStateCheck();
  } else if('a' > input || input > 'z') {
    $('.label').text('You must insert a letter!');
  } else {
    $('.label').text('You must insert just one letter');
  }
}

//here i checked input that i get(and i have 3 cases)
function gameStateCheck() {
  const input = $('#userInput').val();
  let index = randomWord.indexOf(input);
  let fleg = 0

  while(index !== -1) {
    $('#' + index).html(input);
    randomWord = randomWord.substr(0, index) + '_' + randomWord.substr(index + 1);
    index = randomWord.indexOf(input);
    ++fleg;
  }

  if(fleg === 0) {
    ++wrongs;
    $('.wrongs').html(wrongs);
    $('#' + (100 + wrongs)).css('visibility', 'visible');
    if(wrongs === 9) {
      $('.finalMessage').html('!!!YOU LOSE, TRY AGAIN!!!');
      endGame($('.finalMessage').val());
    }
  }else {
    for(let i = 0; i < randomWord.length; ++i) {
      if(randomWord[i] !== '_') {
        break;
      } else if(i === (randomWord.length - 1)) {
        endGame($('.finalMessage').val());
      }
    }
  }
}

function endGame(message) {
  ++rounds;
  $('.inputLetters').remove();
  $('.outputLetters').remove();
  $('.restart-container').css('visibility', 'visible');
}
