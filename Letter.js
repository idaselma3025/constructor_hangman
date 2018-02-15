/*****************************LETTER.JS********************************* 
Letter is a constructor function that takes a letter as input and makes a Letter object from it.  The Boolean Letter.visible is a switch that is used to control wheter Letter.letter or a masking character '_' will be returned.
*/

var Letter = function(letter){
  this.letter = letter;
  this.visible = false;

};

/* The method compareChar takes a single letter string as input.  It compares it to the value ofletter.  If they are the same - if the user guessed correctly - then visible is set to true.
*/
Letter.prototype.compareChar = function(ltr){
  if (ltr === this.letter){
    this.visible = true;
  };
}

/* The method returnChar uses the 'visible' boolean value to determine whether to return the letter value or an underscore character. 
*/
Letter.prototype.displayChar = function(){
  if (this.visible) {
    return this.letter;
  } 
  else {
    return '_';
  };
}

module.exports = Letter;
