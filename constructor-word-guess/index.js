// **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

// * Randomly selects a word and uses the `Word` constructor to store it
        //an array of words which gets passed to word.js 

// * Prompts the user for each guess and keeps track of the user's remaining guesses
        //inquirer 

// 3. `Letter.js` *should not* `require` any other files.

// 4. `Word.js` *should only* require `Letter.js`




var inquirer = require("inquirer")
var wordConst = require("./word.js")



var wordArray = ["monster", "dark", "spooky"]

var wordChosen = false;

var activeWord;

var count = 0;


playGame()

function playGame() {
      //randomly choses a word if a word has not been chosen 
    if(!wordChosen){ 
        //sets the wordChosen  
        wordChosen = true  
        var rand = Math.floor(Math.random() * wordArray.length);


        var wordImport = new wordConst(wordArray[rand])
        //was getting a async issue, so  assigned the word to a globabl
        activeWord = wordImport
        //pass word to word constructor
        wordImport.getLetters(wordArray[rand])
        console.log(activeWord.currentWord)
        console.log(JSON.stringify(activeWord.letterObjArray))
    }
  

    activeWord.displayString()
    
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
            activeWord.checkGuess(answers.guess)
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
