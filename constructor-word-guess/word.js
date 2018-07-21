// Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

//   * An array of `new` Letter objects representing the letters of the underlying word

//   * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

//   * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)




var letterConst = require("./letter.js")




var Word = function (currentWord) {
 
    

//function with for loop ? that calls the letter.check then letter.guessed methods then console.logs them 
//could be we split the word initially, then run through the letter.guessed (since everthing should default false)
//

    this.currentWord = currentWord,
    this.currentWordArray = currentWord.split(""),
    this.letterObjArray = [],
    
    
    this.getLetters = function(){
        this.currentWordArray.forEach(element => {
            var letterImport = new letterConst(element)
            this.letterObjArray.push(letterImport)
        });
    }

    this.displayString = function(){
        var arrayToShow = []

        this.letterObjArray.forEach(element => {
            arrayToShow.push(element.guessed())
        })

        console.log(arrayToShow.join(" "))
    }

    this.checkGuess = function(userInput) {
        this.letterObjArray.forEach(element => {
            console.log(element.letter)
            console.log(userInput)
            //THIS IS CAUSING ALL SORTS OF ISSUES
            //this use to be toString(userInput) === toString(element.letter) and was always being true. Removed dthe toString and works as expected
            if(userInput === element.letter){
                console.log(element.letter + " = " + userInput)
                element.guess = true
            }

        })
        this.displayString()
    }
    

}



module.exports = Word;