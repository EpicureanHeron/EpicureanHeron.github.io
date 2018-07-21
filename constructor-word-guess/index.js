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


        var wordImport = new wordConst(wordArray[rand])
        //was getting a async issue, so  assigned the word to a globabl
        activeWord = wordImport
        //pass word to word constructor
        wordImport.getLetters(wordArray[rand])
        //should remove the item that is selected from the index

        wordArray.splice(rand, 1)
        // console.log(activeWord.currentWord)
        // console.log(JSON.stringify(activeWord.letterObjArray))
    }
  

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
                    //logic below will need to be updated to check if the letter has already been guessed
                    if (isNaN(value) === true && value.length === 1 && value.match(/[a-z]/i) && lettersGuessed.includes(value) === false) {
                        lettersGuessed.push(value)
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answers) {

            var guessValidation = activeWord.checkGuess(answers.guess)
            if(guessValidation){
                console.log("You guessed correctly! ")
                var gameWon = activeWord.winGame()
                if(gameWon){
                    
                    playAgain()
                }
                else if(!gameWon){
                    playGame()
                }
            }
            else if (!guessValidation){
                console.log("You guessed incorrectly!")
                count++
                playGame()
            }
            
           
        });
      

    }
    else{
        console.log("You lost")
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
        if (answers.playAgain === true) {
            count = 0
            wordChosen = false
            lettersGuessed = []
            playGame()
        }
    });
}
