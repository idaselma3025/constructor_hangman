
/************************WORD.JS*************************
get the constructor from Letter.js */
var Letter = require('./Letter.js');

/* WORD CONSTRUCTOR Takes a word as input and builds a Word object from that utilizes the Letter constructor exported in Letter.js */
var Word = function(word){
  this.word = word;
  this.lettArr = [];
  this.guessArr = [];

  /* loop through the letters of current word and create a Letter object for each one.  Push each object onto the lettArr array.*/
  for (i=0; i<word.length; i++){
    this.letter = new Letter(word.charAt(i))
    this.lettArr.push(this.letter);
  };
  // console.log('The array of letters: '+ this.lettArr);

  /* make a string from the object in lettArr array.  call the Letter.returnChar method to get a letter or an underscore depending on whether the object's visible property is true or not. */
  this.toString = function(){
    string = "";
    for (i=0; i<this.lettArr.length; i++){
      string = string + ' ' + this.lettArr[i].displayChar();
    };
    return string;
  }

  // compare the guessed letter to the letters in the array.  
  this.checkGuess = function(guessLtr){
    // console.log('Word.js/checkGuess() guessLtr: ' + guessLtr);
    for (i=0; i<this.lettArr.length; i++){
      this.lettArr[i].compareChar(guessLtr);
    }
  }

  // validate the guessed letter before using it
  this.validGuess = function(guessLtr){
    if (this.guessArr.indexOf(guessLtr) === -1){
      console.log('pushing');
      this.guessArr.push(guessLtr);
      console.log('Guessed letters: ' + this.guessArr);
      return true;
    }
    else {
      console.log('You have already guessed ' + guessLtr + ". Guess again.");
      return false;
    };
  };

  /* loop through the lettArr array and check the 'visible' value for each object.  We have won if all are visible=true. if any are display=false, then we continue the game. */
  this.areWeDoneYet = function(){
    for (i=0; i<this.lettArr.length; i++){
      if (this.lettArr[i].visible === false){
        return false;
      };
    };
    return true;
  };

}

module.exports = Word;