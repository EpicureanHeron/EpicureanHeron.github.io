// **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

// * Randomly selects a word and uses the `Word` constructor to store it
        //an array of words which gets passed to word.js 

// * Prompts the user for each guess and keeps track of the user's remaining guesses
        //inquirer 

// 3. `Letter.js` *should not* `require` any other files.

// 4. `Word.js` *should only* require `Letter.js`




var inquirer = require("inquirer")
var wordConst = require("./word.js")

var wordImport = new wordConst()


var count = 0;

playGame()

function playGame() {
    //randomly choses a word
    //pass word to word constructor
    //guesses remaining ?
    if (count < 5) {
        inquirer.prompt([
            {
                name: "guess",
                message: "Guess a letter: ",
                validate: function (value) {
                    //logic below will need to be updated to check if the letter has already been guessed
                    if (isNaN(value) === true) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answers) {
            count ++ 
            console.log(answers.guess)
            playGame()
        });
        //wordImport.wordValue()

    }
    else{
        console.log("you lost!")
        inquirer.prompt([
            
                {
                    type:"confirm",
                    name: "playAgain",
                    message:"Play again?"
                }
        ]).then(function (answers) {
            if(answers.playAgain === true){
                count = 0
               
                playGame()
            }
        });
        //wordImport.wordValue()
    }
}
