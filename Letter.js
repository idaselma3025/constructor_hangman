/*****************************LETTER.JS********************************* 
Letter is a constructor function that takeS a letter as input and makes
a Letter object.  The Boolean Letter.visible is a switch that is used
to control wheter Letter.letter or a masking character '_' will be returned. */

var Letter = function(letter){
  this.letter = letter;
  this.visible = false;

  /* The method Letter.compareChar takes a string 'ltr' as input.  It 
  compares ltr to Letter.letter.  If they are the same - if the 
  user guessed correctly - then Letter.visible is set to true. */
  this.compareChar = function(ltr){
    // console.log('Letter.js/Letter.compareChar');
    // console.log('guess: ' + ltr + ' this.letter: ' + this.letter);
    if (ltr === this.letter){
      this.visible = true;
      // console.log('this.visible set to true');
      // console.log(this);
    };
  };

  /* The method Letter.returnChar uses the visible boolean value to determine 
  whether to return Letter.letter or an underscore character. */
  this.displayChar = function(){
    // console.log(this);
    if (this.visible) {
      return this.letter;
    } 
    else {
      return '_';
    };
  };

};

module.exports = Letter;
