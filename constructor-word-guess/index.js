// **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

// * Randomly selects a word and uses the `Word` constructor to store it
        //an array of words which gets passed to word.js 

// * Prompts the user for each guess and keeps track of the user's remaining guesses
        //inquirer 

// 3. `Letter.js` *should not* `require` any other files.

// 4. `Word.js` *should only* require `Letter.js`




var inquirer = require("inquirer")
var wordConst = require("./word.js")


//selection of DND monsters
var wordArray = ["beholder", "gelatinous cube", "lich", "owlbear", "displacer beast", "mind flayer", "rust monster", "drow", "kobold", "dragon", "orc"]

var wordChosen = false;

var activeWord;

var count = 0;
//saving each letter guessed so that the user cannot guess it again 
var lettersGuessed = []

//kicks off the game
playGame()

function playGame() {
      //randomly choses a word if a word has not been chosen 
    if(!wordChosen){ 
        //sets the wordChosen  
        if(wordArray.length === 0){
            return console.log("YOU GUESSED ALL THE WORDS!!!")
        }
        wordChosen = true  
        var rand = Math.floor(Math.random() * wordArray.length);

        //this could be done better with the below line
        var wordImport = new wordConst(wordArray[rand])
        //was getting a async issue, so  assigned the word to a globabl
        activeWord = wordImport
        //pass word to word constructor
        wordImport.getLetters(wordArray[rand])
        //should remove the item that is selected from the index

        wordArray.splice(rand, 1)
      
    }
  
    //uses the word objects display string function to show the current state of the string
    activeWord.displayString()
    
    //guesses remaining ?
    if (count < 5) {

        var guessesRemaining = 5-count
        console.log("Guesses remaining: " + guessesRemaining )

        inquirer.prompt([
            {
                name: "guess",
                message: "Guess a letter: ",
                validate: function (value) {
                    //logic to limit the user to a single letter guess which has not been guess before
                    if (isNaN(value) === true && value.length === 1 && value.match(/[a-z]/i) && lettersGuessed.includes(value) === false) {
                        //adds the letter to the lettersGuessed array
                        lettersGuessed.push(value)
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answers) {
            //leverages the word objects check guess method (which in turns uses letter objects method) to determine if the letter has been guessed 
            var guessValidation = activeWord.checkGuess(answers.guess.toLowerCase())
            if(guessValidation){
                console.log("You guessed correctly! ")
                //if guess was correct, check to see if game is won 
                var gameWon = activeWord.winGame()
                if(gameWon){
                    //if game won, prompts user to play again
                    console.log("You succesfully guessed that the word was "+ activeWord.currentWord + "! Well done!")
                    playAgain()
                }
                else if(!gameWon){
                    //continues game
                    playGame()
                }
            }
            else if (!guessValidation){

                console.log("You guessed incorrectly!")
                //iterates the count which is tied to guesses remaining
                count++
                playGame()
            }
            
           
        });
      

    }
    else{

        console.log("You lost")
        console.log("The word was "+ activeWord.currentWord)
        //if out of guesses, prompt user to play again
        playAgain()
    }
}
function playAgain() {
    // activeWord.displayString()
    inquirer.prompt([

        {
            type: "confirm",
            name: "playAgain",
            message: "Play again?"
        }
    ]).then(function (answers) {
        //if playing again, some global variables are rest 
        if (answers.playAgain === true) {
            count = 0
            wordChosen = false
            lettersGuessed = []
            playGame()
        }
    });
}
