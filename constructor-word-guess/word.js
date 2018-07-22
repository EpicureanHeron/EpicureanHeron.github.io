// Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

//   * An array of `new` Letter objects representing the letters of the underlying word

//   * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

//   * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)




var letterConst = require("./letter.js")




var Word = function (currentWord) {



    //function with for loop ? that calls the letter.check then letter.guessed methods then console.logs them 
    //could be we split the word initially, then run through the letter.guessed (since everthing should default false)
    //

     //stores current word
    this.currentWord = currentWord,

    //an array of the word split into an array
    this.currentWordArray = currentWord.split(""),

    //empty array for all the letter objects which will be populated by the getLetters() method
    this.letterObjArray = [],

    //populates the letterObjArray using the letter constructor 
    this.getLetters = function () {

        //goes through each element in the split word 
        this.currentWordArray.forEach(element => {
            //creates a new letter object from the constructor for each element passed
            var letterImport = new letterConst(element)
            //populates the letterObjArray with the new object
            this.letterObjArray.push(letterImport)
        });
    },

    //displays the current state of the word based on user guesses
    this.displayString = function () {
        //values of whether or not a letter constructed object is guessed (and that returned value) is pushed to 
        var arrayToShow = []

        //cycling through the letterObjArray
        this.letterObjArray.forEach(element => {
            //if the element is a space, pass it to the array as such and set that element to true 
            //I do this manually here because spaces are weird, never should the user have to guess there is a space
            if (element.letter === " ") {
                arrayToShow.push(" ")
                element.guess = true
            }
            else {
                //leveraging the letter method guessed which checks if the value is true or false and displaces either the letter or a "_" and populate the array with the return
                arrayToShow.push(element.guessed())

            }
        })
        //after creating that array, join all the elements with a " " and display to the user
        console.log(arrayToShow.join(" "))
    },

    //checks the users guess against the letter objs
    this.checkGuess = function (userInput) {
        //variable which is scoped to this method to communicate back to index.js whether or not a correct guess was made    
        //this is probably not optimal, but it is functional
        var correctGuess = false

        //cycling through the letter obj array
        this.letterObjArray.forEach(element => {
            //leveraging the letter object's check function which returns true or false and passing it the user's input 
            if(element.check(userInput)) {
                correctGuess = true
            }
            // if (userInput === element.letter) {
            //     correctGuess = true
            //     element.guess = true

            // }
        })

        //this logic governs whether or not to increment the guesses remaining down or not 
        if (correctGuess) {
            this.displayString()
            return true
        }
        else {
            this.displayString()
            return false
        }
    },

    //determine if the word has been completely guessed, this function could possibliy be moved somewhere else, such as the checkGuess method
    this.winGame = function () {
        //local variable which is keeping track of how many true returns are happening 
        var countOfTrue = 0
        //gets the length of the word/phrase
        var lengthOfWord = this.letterObjArray.length

        this.letterObjArray.forEach(element => {
            if (element.guess) {
                countOfTrue++
            }
        })
        //if the count of true is the same as the length of the word, then the game has been won, returns either true or false
        if (countOfTrue === lengthOfWord) {
            return true
        }
        else {
            return false
        }
    }

}



module.exports = Word;