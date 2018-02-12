var inquirer = require('inquirer');
var fs = require('fs');
var randomWords = require("random-words");
var Word = require('./Word.js');

// GLOBALS
var guesses;
var randomWord;
var currentWord;
var guessedLtr;
var indent; 
var offset;

function hangman(){

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
  console.log(indent + currentWord.toString()+'\n');
  // display letter already guessed 
  if (guessedLtr.length > 0){
    console.log('already guessed: ' + guessedLtr + '\n');
  };
  // get user input
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
        guessedLtr.push(input.letter);
      // clear output from this application/prevent scrolling
        process.stdout.write('\033c');  
      };
  
      if (currentWord.areWeDoneYet() === true){
        process.stdout.write('\033c');
        console.log('***************************');
        console.log('*         HANGMAN         *');
        console.log('*         You win!        *');
        console.log('***************************');
        console.log(indent + currentWord.toString().trim() +'\n');
        // playAgain();
        return;
      }
      
      if (guesses < 1){
        process.stdout.write('\033c');
        console.log('***************************');
        console.log('*         HANGMAN         *');
        console.log('*     No more guesses     *');
        console.log('***************************');
        console.log("   The word was '" + randomWord[0] + "'");
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
  offset = 13 - randomWord[0].length;
  indent = "";
  for (i=0; i<offset; i++){
    indent += " ";
  };
  // initial call to hangman
  hangman();
}

init();