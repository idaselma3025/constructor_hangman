var inquirer = require('inquirer');
var fs = require('fs');
var randomWords = require("random-words");
var Word = require('./Word.js');

// GLOBALS
var guesses;
var randomWord;
var currentWord;
var guessedLtr;

function hangman(){
  
  process.stdout.write('\033c');  // clear output from this application/prevent scrolling
  // console.log(randomWord[0]);
  console.log('***************************');
  console.log('*         HANGMAN         *');
  if (guesses < 10){
    console.log('*     guesses left: ' + guesses + "     *");
  }
  else {
    console.log('*     guesses left: ' + guesses + "    *");
  };
  console.log('***************************');
  // display random word with unguessed letters represented by '_'
  console.log(currentWord.toString()+'\n');
  inquirer
    .prompt([{
      name:'letter',
      type:'input',
      message:'enter a letter'
    }])
    .then(function(input){
      if (currentWord.validGuess(input.letter)){
        currentWord.checkGuess(input.letter)
        guesses--;
      }
      else {        
        console.log('You have already used ' + input.letter + ".");
        setTimeout(function(){console.log('\nGuess again.')
        }, 3000);
      };
  

      if (currentWord.areWeDoneYet() === true){
        process.stdout.write('\033c');
        console.log('***************************');
        console.log('*         HANGMAN         *');
        console.log('*         You win!        *');
        console.log('***************************');
        console.log(currentWord.toString().trim() +'\n');
        // playAgain();
        return;
      }
      
      if (guesses < 1){
        process.stdout.write('\033c');
        console.log('***************************');
        console.log('*         HANGMAN         *');
        console.log('*     No more guesses     *');
        console.log('***************************');
        console.log("The word was '" + randomWord[0] + "'");
        return;
      };

      hangman();  // loop until game ends
      
  });
}

function init(){
  guesses = 15;
  randomWord = [];
  guessedLtr = [];
  /* the random-words module returns an array. */
  randomWord = randomWords({exactly: 1, minLength: 6, maxLength: 12});
  currentWord = new Word(randomWord[0]);
  // initial call to hangman
  hangman();
}

// does nothing right now.  Will not display.  code seems to skip past it
function playAgain(){
  inquirer
  .prompt([{
    name: 'play',
    type: 'list',
    message: 'Play again?',
    choices: ['Yes', 'Quit']
  }])
  .then(function(answer){
    if (answer === 'Yes'){
      hangman();
    }
    else {
      return;
    }
  });
}

init();