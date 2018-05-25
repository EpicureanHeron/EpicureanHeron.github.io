//TODO 

//NEEDS TO BE ADDED:
//DONE: Create another array to store previous computer guesses, and IF the new comptuer guess is in that array, make a new guess
//DONE: Need to create a limit to guesses
//DONE: Need to create a "reset state" function to reset after a win that chooses a new word (cannot be a previous chosen word)...not sure about reseting guesses though...need to reset the usedLettersArr array


//THINGS TO CLEAN UP/IMPROVEMENTS
//1. Make variables and functions more unique to increase readability
//2. Some functions are very multi purpose...which makes it a pain to read, be more concise 
//3. Could use the forEach thing instead of all these darn for loops

//WISHLIST
// STARTED: Add pictures for each element in the computerGuessArray for the characters, use jQuery to update the photos on the screen
//Play a sound clips
//"Shield Strength" as a counter
//CSS animation of the whole screen shaking at 10%, lights flash 
//Make this an object
//DONE: How many guesses ? 6 


//VARIABLES

// Initalizes the userGuess variable which will be assigned after a letter key is pressed
var userGuess;

// Empty array which will have userGuess added to it 
var usedLettersArr = [];

// Array from which the computer choses its mystery word
var computerGuessArray = ["Troi", "Data", "Picard", "Riker", "Worf", "Crusher", "Enterprise", "Borg", "Caradassians", "Romulans", "Vulcans", "Geordi", "Wesley", "Yar", "Guinan", "Klingons"];

// Initalizes the computerGuess, which will store a value from the computerGuessArray 
var computerGuess;

//intilizes the variable guessState which will be updated to an empty array in the makeGuessPopulateGuessState() 
var guessState;

//State of the game
var wonTheGame = false;

//Will be switched to true once a guess is made, will be switched back after a defeat or a correct answer
var computerMadeGuess = false;

//Keeps track of all wrong letter guesses
var wrongGuesses = 0;

//Correct words guessed
var wordsGuessed = 0;

//array to store the correct guesses 
var computerGuessCorrect = [];

//Dictionary to hold the pictures associated with each guess

var pictureDictionary = {
    "Data": "assets/images/Data.jpg",
    "Troi": "assets/images/Troi.jpg",
    "Picard": "assets/images/Picard.jpg",
    "Riker": "assets/images/Riker.jpg",
    "Worf": "assets/images/Worf.jpg",
    "Yar": "assets/images/Yar.jpg",
    "Geordi": "assets/images/Geordi.jpg",
    "Lwaxana": "assets/images/Lwaxana.jpg",
    "Borg" : "assets/images/Borg.jpg", 
    "Caradassians" : "assets/images/Caradassians.jpg",
    "Klingons": "assets/images/Klingons.jpg",
    "Vulcans": "assets/images/Vulcans.jpg",
    "Enterprise" : "assets/images/Enterprise.jpg",
    "Crusher" : "assets/images/Crusher.jpg",
    "Wesley" : "assets/images/Wesley.jpg", 
    "Romulans" : "assets/images/Romulans.jpg",
    "Guinan" : "assets/images/Guinan.jpg"
}
//playAgain is set to false intitally, this comes into play in the reset function
var playAgain = false;

//FUNCTIONS

// Updates guess and adds it to the usedLettersArr array and calls the checkGuess function
//The below is native javascript without jQuery
//document.onkeyup = function newGuess(event) {

//This is jQuery handling the key event
$(document).keyup(function newGuess(event) {
//checks to see if a lowercase letter was pressed
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        if (computerMadeGuess === false) {
            makeGuessPopulateGuessState();
        }
        
        userGuess = event.key;
        //usedLettersArr.push(userGuess);
        // console.log(event.keyCode);
        checkGuess(userGuess);
    }
    else {
        alert("That's not a letter!!!");
    }
})
// creates a computer guess from the array and populates the guess state. 
function makeGuessPopulateGuessState(){
    computerGuess = computerGuessArray[Math.floor(Math.random() * computerGuessArray.length)];
    
    console.log(computerGuess);

    //WORK ON THE BELOW 5/24/2018

    //This should remove the computers guess from the array, so going forward it won't come again
    //However, right now it takes the index of whatever the computer guess is and deletes everything after that in the array...which is not what I want.

    var index = computerGuessArray.indexOf(computerGuess);
    console.log(index);
    
    console.log("this is your current array for guesses" + computerGuessArray + " " + computerGuessArray.length)
    if (index > -1) {
        computerGuessArray.splice(index, 1);
        console.log("removal fired " + computerGuessArray + " " + computerGuessArray.length);
    }


    //Sets the guessState to empty array
    guessState = [];
    //Populates the array with underscores the total length of the computerGuess
    for (i = 0; i < computerGuess.length; i++) {
        guessState.push(" _ ");
    }
    computerMadeGuess = true;

   
}

//checks to see if an element passed to it equals the user's guess, returns true or false
function isMatching(element){
    //changes the computer guess and the user guess to capital letters to bypass case sensitivy 
    var capsComputerLetter = element.toUpperCase();
    var capsUserGuessLetter = userGuess.toUpperCase();

    if (capsComputerLetter == capsUserGuessLetter) {
        return true;

    }
    else {
        return false;
    }
}

//Updates the guess state with the user's guess
function updateGuessState(index) {
    var computerGuessArray = computerGuess.split("");
    guessState[index] = computerGuessArray[index];
    console.log(guessState);
}

//Creates an array out of the computer's guess, and cycles through it using the matching function, 

//THIS IS PROBABLY THE MOST COMPLEX FUNCTION< COULD PROBABLY BE SEVERAL FUNCTIONS? 

function checkGuess(letter){
    //sets the computer's guess to an array
    var computerGuessArray = computerGuess.split("");
    //local variable to determine if the letter pass has matched, gets changed in the for loop if isMatching function returns true
    var isMatched = false;
    //local variable which determines if the guess letter exists in the usedLettersArr, is set to true or false
    var hasNotBeenGuessedBefore = validateGuess(letter);

    //Checks to see if guesses are remaining
    if (wrongGuesses < 5 ) {
            for (j = 0; j < computerGuess.length; j++) {
                //if the isMatching returns true, then the updateGuessState function is called, also switches the isMatched to true which allows it to bypass the if statement lower in this function

                if (isMatching(computerGuessArray[j])) {
                updateGuessState(j);
                isMatched = true
            }   
        }

        //if the letter does not match and has not been used before it counts against the user's guesses
        if (isMatched === false && hasNotBeenGuessedBefore === false) {
            wrongGuesses = wrongGuesses + 1;
        }

        //calls the wonGame function at the end of function to see if the game is over
        wonGame();

        //calls the updatePage function
        updatePage();
    }
    //Tells the user if they lose
    else {
        wrongGuesses = wrongGuesses + 1;
        updatePage();
        playAgain = confirm("You lost! Want to play again?");
        reset(playAgain);
    }
    
}
//Checks to see if user has guessed this letter previously and adds it to the usedLetterArr if they have not, if they have used it, it lets them know
function validateGuess(element){
    if (usedLettersArr.includes(element)) {
        return true;
    }
    else {
        usedLettersArr.push(userGuess);
        return false;
    }
}

// Checks the computer's guess against the guessState to determine if user has won, reset variables and chose a new word.
function wonGame() {
    if (computerGuess === guessState.join("")) {
        wonTheGame = true;
        computerMadeGuess = false;
        console.log("You win! ")
        computerGuessCorrect.push(computerGuess)
        wordsGuessed = wordsGuessed + 1;
        usedLettersArr = [];
        updatePicture(computerGuess);
        makeGuessPopulateGuessState();
    }
}


//Updates the page with the current state of the game

function updatePicture(element) {
    //this checks to see if the element being passed (which should be the computer's last guess) is in the dictionary pictureDictionary
    if (element in pictureDictionary) {
        //this updates the img tag with the id  of pictureOfLastGuessed to change the src to be the value associated with the key 
        $("#pictureOfLastGuessed").attr("src", pictureDictionary[element]);
    }

}

function reset(someBoolean) {
    if (someBoolean) {
        guessState = [];
        usedLettersArr = [];
        computerGuessArray = ["Troi", "Data", "Picard", "Riker", "Worf", "Crusher", "Enterprise", "Borg", "Caradassians", "Romulans", "Vulcans", "Geordi", "Wesley", "Yar", "Guinan", "Klingons"];
        wrongGuesses = 0;
        computerGuessCorrect = []
        wordsGuessed = 0;
        computerMadeGuess = false;
        //need to update picture as well;
        updatePage();
        $("#pictureOfLastGuessed").attr("src", "assets/images/placeholder.png");
    }
    else {
        alert("You suck");
    }
}


function updatePage() {

    var displayGuesses = guessState.join("");
    var displayLettersGuessed = usedLettersArr.join(" ");
    var displayGuessCorrect = computerGuessCorrect.join(" ");
    var displayGuessesRemaining = 6 - wrongGuesses;

    $("#currentState").html(displayGuesses);
    $("#guessedByUser").html(displayLettersGuessed);
    $("#numberOfGuesses").html(displayGuessesRemaining);  
    $("#wordsGuessed").html(wordsGuessed);
    //This should probably be nestled in an if statement checking to see if the computerGuessCorrect array is greater than 0.   
    $("#correctWords").html(displayGuessCorrect);

    // document.getElementById("computersGuess").innerHTML = computerGuess;
    //document.getElementById("currentState").innerHTML =  displayGuesses;
    //document.getElementById("guessedByUser").innerHTML = displayLettersGuessed;
    //document.getElementById("numberOfGuesses").innerHTML = wrongGuesses;
    // document.getElementById("gameStatus").innerHTML = wonTheGame;
    //This jQuery works after the variable flips from false to true...why?
    // $("#gameStatus").html(wonTheGame);
    // document.getElementById("wordsGuessed").innerHTML = wordsGuessed;
    //document.getElementById("correctWords").innerHTML = displayGuessCorrect;
   
}

