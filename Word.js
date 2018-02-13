
/************************WORD.JS*************************
get the constructor from Letter.js */
var Letter = require('./Letter.js');

/* WORD CONSTRUCTOR Takes a word as input and builds a Word object utilizing the Letter constructor exported in Letter.js 
*/
var Word = function(word){
  this.word = word;   // current word
  this.lettArr = [];  // an array of Letter objects
  this.guessArr = []; // an array of guessed letters used for validation

  /* loop through the letters of current word and create a Letter object for each.  Push these object onto the lettArr array.*/
  for (i=0; i<word.length; i++){
    this.letter = new Letter(word.charAt(i))
    this.lettArr.push(this.letter);
  };

  /* make a string from the object in lettArr array.  call the Letter.returnChar method to get a letter or an underscore depending on whether the object's visible property is true or not. 
  */
  this.toString = function(){
    string = "";
    for (i=0; i<this.lettArr.length; i++){
      string = string + ' ' + this.lettArr[i].displayChar();
    };
    return string;
  }

  // compare the guessed letter to the letters in the array.  
  this.checkGuess = function(guessLtr){
    for (i=0; i<this.lettArr.length; i++){
      this.lettArr[i].compareChar(guessLtr);
    }
  }

  // validate the guessed letter before using it
  this.validGuess = function(guessLtr){
    if (this.guessArr.indexOf(guessLtr) === -1){;
      this.guessArr.push(guessLtr);
      return true;
    }
    else {
      return false;
    };
  };

  /* loop through the lettArr array and check the 'visible' value for each object.  We have won if all are visible=true. if any are display=false, then we continue the game. 
  */
  this.areWeDoneYet = function(){
    for (i=0; i<this.lettArr.length; i++){
      if (this.lettArr[i].visible === false){ // not done
        return false;
      };
    };
    return true;  // done
  };

}

module.exports = Word;