# Hangman V2
### A new version of Hangman using Node.js, various npm modules, object constructors and multiple JavaScript files.

### **How to play CLI Hangman**

Enter `node hangman` from the command line to begin the game.

![Hangman Main](assets/images/main.jpg)

Hangman will generate a new random word each time you play.  Enter a single letter to play.

If you guess a letter correctly, the screen will show its place in the word.  Letter guesses are added to the list below the word.  The user is not allowed to enter a letter that has already been used.  The number of guesses left will decrease with each guess.

![Hangman Mid](assets/images/mid_game.jpg)

You will either win...

![Hangman Win](assets/images/win.jpg)
... or lose.

![Hangman Lose](assets/images/lose.jpg)


### **How CLI Hangman was built**

CLI Hangman uses two object constructors, Letter and Word.  They are each in their own JavaScript file and utilized using exports and requires.  

**Letter.js** holds the  **Letter** constructor which takes a single letter as input.  A letter object has two properties, *letter* and *visible*.  `Letter` holds the alphabetic character and `visible` holds a Boolean value indicating whether the letter should be displayed or a masking character should be displayed.

In addition, Letter has two methods,   
* *compareChar* will test a guessed letter against the letter value and change the visible property to true if they match.  
* *displayChar* will return either the letter value or '_' depending on the value of visible.

**Word.js** requires **Letter.js**.  Word.js holds the **Word** constructor which takes a word as input.  A `Word` object has three properties, *word*, *lettArr* and *guessArr*.  `word` holds the input word.  `lettArr` is an array of Letter objects.  `guessArr` is an array of guessed letters used for validation.

The **Word** object has four methods.  
* *toSTring* uses the Letter object's `displayChar` method to return a string letters or underscores depending on the Letter object's `visible` value.

* *checkGuess* compares a guessed letter to the letters in the array of Letter objects.  It calls the Letter objects `compareChar` method to do this.

* *validGuess* compares the guessed letter to the contents of `guessArr` and returns true if it has not been stored there yet.

* *areWeThereYet* loops through the array of Letter objects checking each object's `visible` property.  If all of the objects has been set to visible=true, then the user has correctly guessed all of the letters in the word and 'true' is returned.  If any objects are visible=false, then the method returns 'false'.

**hangman.js** requires **Word.js*.  The main game function hangman() is called recursively until the count in `guesses` reaches zero or `areWeThereYet()' returns 'true'.  

### npm modules used

* **enquirer** - used to prompt the user for input.
* **random-words** - generates a random word for each instance of the game.
* **colors** - formats the CLI with colored text.

## To Do

* **Validation** - add validation to the enquirer prompt to ensure the user only gives it an alphabetic character.

* **Play Again** - Allow the user to choose between playing another round or gracefully exiting to the command line.

