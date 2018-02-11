// Letter is a constructor function that take a letter as input and make
// a Letter object.  The Boolean Letter.visible determines if Letter.letter will
// be shown or a masking character '_' will be shown.  That happens in 
// the Letter.returnChar() method.

var Letter = function(letter){
  this.letter = letter;
  this.visible = false;
  this.returnChar = function(){
    if (this.visible) {
      return this.letter;
    } 
    else {
      return '_';
    };
  };
};

module.exports = Letter;
