// Contains a constructor, Letter. This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. That means the constructor should define:

// * A string value to store the underlying character for the letter

// * A boolean value that stores whether that letter has been guessed yet

// * A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed

// * A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly




var Letter = function (letter) {
        this.placeholder = " _ ",
        //string value to store the underlying character of the letter
        this.letter = letter,
        //boolean value that stores whether or not the letter has been guessed yet
        this.guess = false,
        //A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore)
        // if the letter has not been guessed
        this.guessed = function () {
            if (this.guess) {

                return this.letter
            }
            else {
                return this.placeholder
            }
        },
        // * A function that takes a character as an argument and checks it against the underlying character, 
        //updating the stored boolean value to true if it was guessed correctly
        this.check = function (someLetter) {
            if (toString(someLetter) === toString(this.letter)) {
                this.guess = true
                //does this need to call something or will it need to be called? 
            }
        }

}


module.exports = Letter;