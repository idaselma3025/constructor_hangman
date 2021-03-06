

var inquirer = require('inquirer');
var randomWords = require("random-words");
var colors = require('colors');
var Word = require('./Word.js');

// GLOBALS
var guesses;      // number of guesses remaining
var randomWord;   /* holds the array returned by the randomWords module.  it will be an array with one element so randomWord[0] */
var currentWord;  // a word object
var indent;       // these two variables are used in formatting the display
var offset;


function hangman(){
  clearScreen();
  mainScreen();
  // display random word with unguessed letters represented by '_'
  console.log(colors.yellow(indent + currentWord.toString()+'\n'));
  // display letter already guessed 
  console.log(colors.magenta('     ALREADY GUESSED: ' + colors.magenta(currentWord.showGuesses()) + '\n'));

  // get user input (a letter)
  inquirer
  .prompt([{
    name:'letter',
    type:'input',
    message:'   Enter a letter'.cyan,
    validate: function(value) {
      var pass = value.match(
        /^[a-zA-Z]?$/i
      );
      if (pass) {
        return true;
      }
      else {
        return 'Please enter a letter';
      }
    }
  }])
  .then(function(input){
    input.letter = input.letter.toLowerCase();  // random-words only returns lowercase
    if (currentWord.validGuess(input.letter)){  // if this letter has not already been tried
      currentWord.checkGuess(input.letter);  // see if it matches any of the letters in the current word
      guesses--;  // decrement the number of guesses left
      clearScreen(); // clear the screen to make it ready to display main, win or lose screen
    };
    // Win?
    if (currentWord.areWeDoneYet() === true){
      winScreen();
      console.log(colors.yellow(indent + currentWord.toString().trim() +'\n'));  // show the word
      // init();
      process.exit();// end
    }
    // Lose?
    if (guesses < 1){
      loseScreen();
      console.log("       The word was '".red + colors.red(randomWord[0]) + "'".red);  // show the word
      // init();
      process.exit(); // end
    };
    // Continue
    hangman();  // loop until game ends      
  });
}

/* this is broken out for use in 'play again' functionality.  If I ever get that to work, I will need to reset the game here */
function init(){
  // clearScreen();  
  guesses = 15;
  randomWord = [];
  guessedLtrs = [];
  randomWord = randomWords({exactly: 1, minLength: 6, maxLength: 12});
  currentWord = new Word(randomWord[0]);
  offset = 18 - randomWord[0].length;
  indent = "";
  for (i=0; i<offset; i++){
    indent += " ";
  };
  
  // console.log("INIT APP");
  // this would be good to have but need to figure the problem with async
  // clearScreen();
  // inquirer
  // .prompt({
  //   name:'stay_or_go',
  //   type: 'list',
  //   message: "Play Hangman?",
  //   choices: ['PLAY','QUIT']
  // })
  // .then(function(answer){
  //   // console.log(answer);
  //   if (answer.stay_or_go === 'PLAY'){
  //     clearScreen();
  //     hangman();
  //   }
  //   else {
  //     process.exit();
  //   }
  // });
  
  // initial call to hangman
  hangman();
}

function mainScreen(){
  // main game screen
  console.log('\n\n     ***************************'.rainbow);
  console.log('     *         '.rainbow + 'HANGMAN'.red + '         *'.rainbow);
  if (guesses < 10){
    console.log('     *     '.rainbow + colors.cyan('Guesses Left: ' + (guesses)) + "     *".rainbow);
  }
  else {
    console.log('     *     '.rainbow + colors.cyan('guesses left: ' + (guesses)) + "    *".rainbow);
  };
  console.log('     ***************************'.rainbow);
};

function winScreen(){
clearScreen();
console.log('\n\n    ***************************'.rainbow);
console.log('    *         '.rainbow + 'HANGMAN'.red + '         *'.rainbow);
console.log('    *         '.rainbow + 'You Win!'.yellow + '        *'.rainbow);
console.log('    ***************************'.rainbow);
};

function loseScreen(){
clearScreen();
console.log('\n\n    ***************************'.rainbow);
console.log('    *         '.rainbow + 'HANGMAN'.red + '         *'.rainbow);
console.log('    *     '.rainbow + 'No more guesses'.red + '     *'.rainbow);
console.log('    ***************************'.rainbow);
};

function clearScreen(){
    // clear output from this application/prevent scrolling
    process.stdout.write('\033c'); 
}

init();