//TODOS
//1.DONE 6/8/2018 Create a buffer page between questions
	//This may need its own setInterval() thing...not sure yet, perhaps a while loop within the count function to delay updating the screen which is switched when the setInterval returns a certain value to proceed?
//2. DONE 6/8/2018 Rewatch the video
	//1. DONE 6/8/2018 not radio buttons, but DIVs that are clickable, probably with sometype of attr data-value which I need to check (see notes from 6/7/2018)
		//A. DONE 6/8/2018 these divs are clickable which are probably an onclick object which then checks if the question is right or wrong
		//B.DONE 6/8/2018  further logic to check if timer is at 0 
	//2 DONE 6/8/2018 Start screen and a "start button" which kicks offs the game ( main timer). AFter a click start ANOTHER timer before calling the next question (probably 3 seconds) then loads next question
	//3 DONE 6/8/2018 show the correct answer and appropriate message (time's up! or You're right! Or You're Wrong! )
	//4 DONE 6/8/2018 start over resets the game
		//A. DONE Need to build a check on the currentQuestion which stops the interval and writes to the page with a div that asks "Click here to play again" and also displays their record



//VARIABLES
//used in creating a question...might be superflous 
var questionNumber = 0;
//intial timer value
var timerValue = 30;
//below 2 variables to be used after the answer is submitted
var correctGuesses = 0;

var incorrectGuesses = 0;
//variable to cycle through the current questions
var currentQuestion = 0;
//this is an interval which gets set (setInterval())
var interval = "";
//this is a delay (setInterval())
var delay = "";

//BELOW ARE ALL THE QUESTIONS 
//These are created by call the createQuestionObj function which takes a question, an array of options, and the correct answer's index from that array
var question0 = createQuestionObj("Who was the king before Robert Baratheon?", ["Aerys Targaryen", "Jaehaerys II Targaryen", "Joffrey Lannister", "Aegon I Targaryen"], 0);

var question1 = createQuestionObj("Which of the following names is NOT one of the Stark children's direwolves? ", ["Ghost", "Spring", "Lady", "Grey Wind"], 1);

//https://awoiaf.westeros.org/index.php/Free_Cities
var question2 = createQuestionObj("Which of the following is NOT a free city of Essos ", ["Qohor", "Myr", "Lantum", "Lys"], 2);

//http://gameofthrones.wikia.com/wiki/Assassination_of_Jon_Arryn
var question3 = createQuestionObj("Who killed Jon Arryn?", ["Petyr 'Littlefinger' Baelish", "Varys", "Ceresi Lannister", "Lysa Arryn"], 3);

var question4 = createQuestionObj("Which character has never been a eunuch?", ["Theon Greyjoy", "Varys", "Grey Worm", "Tyrion Lannister"], 3);

var question5 = createQuestionObj("Which character survived the Red Wedding?", ["Robb Stark", "Edmure Tully", "Catelyn Stark", "Grey Wind"], 1);
//http://gameofthrones.wikia.com/wiki/Valyrian_steel
var question6 = createQuestionObj("Who has never owned a Valyrian steel weapon?", ["Joffrey Lannister", " Petyr 'Littlefinger' Baelish", "Robb Stark", "Jaime Lannister"], 2);
//http://gameofthrones.wikia.com/wiki/Dragons
var question7 = createQuestionObj("Which is one of Daenerys Targaryen's dragons' name?", ["Rhaegal", "Dragon", "Vhagar", "Smaug"], 0);
//http://gameofthrones.wikia.com/wiki/Cyvasse
var question8 = createQuestionObj("Which is not a piece in cyvasse?", ["Elephant", "Queen", "King", "Trebuchet"], 1);

var question9 = createQuestionObj("Which is a kingdom in Westeros?", ["The Westerlands", "The East", "Kingdom of the Flowers", "The Wall"], 0);

//QUESTION ARRAY
var questionArray = [question0, question1, question2, question3, question4, question5, question6, question7, question8, question9 ];

//FUNCTIONS 

//starts the magic of jquery
$( document ).ready(function() {
    //forces jquery to listen to the whole body any time a .choices is clicked (helpful because I empty the questions area every question)
	 $('body').on('click', '.choices', function ()  {
		//Calls renderAnswer which grabs the current question from the question array, the clicked thing's value (that is the magic of attr("value")) and the value of the timer
		renderAnswer(questionArray[currentQuestion], $(this).attr("value"), "null");
		});
	//forces jquery to listen to the start click
	$('body').on('click', '#start', function ()  {
		//hides the start option once clicked using display:none in CSS
		$("#start").addClass("hide")
		//begins the game
		startTimer();

	});
});

//this starts the timer
function startTimer() {
	//probably should set this to a variable so that I can refer back to it and reset it ? 
	interval = setInterval(count, 1000);
	//passes the first question
	updatePage(question0);
  }
  
function count() {
	//counts down and updates the screen
	//increases the time 
	timerValue = timerValue - 1;
	//updates the time left
	$(".timer").html("Time Left: " + timerValue);
	//checks to see if the time is out
	if (timerValue === 0) {
		//sets the variable to expired to expired...which might be...redundant
		var expired = "expired";
		//Passes the current question, no answer, and the variable expired
		renderAnswer(questionArray[currentQuestion], "null", expired);
		
	}
}

//Creates and returns objects that are questions, it takes a question that is a string
//Takes an array that are the guess options
//and a number that refers to the array's correct guess
function createQuestionObj(questionString, guessArr, correctGuessIndex) {	
	newObject = {
		 //questionNumber is a global variable
		 number: questionNumber,
		 //Main question 
		 mainQuestion: questionString,
		 //options for the quesiton
		 options: guessArr,
		 //sets the value for correct guess based of a passed in value, correctGuessIndex which refers back to the guessArr
		 correctIndex: correctGuessIndex,
		 //sets the value of correctOption to be the value held in the guess array
		 correctOption: guessArr[correctGuessIndex]
	}
	//updates the question number
	questionNumber ++ 
	//returns the new object
	return newObject
}
 //takes a question (which needs to be an object) as a parameter and writes it to the page
function updatePage(question) {
	//updates the timer's count on page
	$(".timer").html("Time Left: " + timerValue);
	//removes anything in the id="start", important for initailizing the game, but is pointless after that happens 
	$("#start").empty()
	//updates 
	$(".result").empty()
	$("#displayOptions").empty();
	//have to clearInterval here for delay because it is called within that delay function
	clearInterval(delay)
	//displays question
	$(".question").html(question.mainQuestion);
	//displays all options
	for (i = 0; i < question.options.length; i ++) {		
		//updates the optionNumber
		
		$("#displayOptions").append("<div class='choices' value='" + question.options[i] + "'>" + question.options[i] + "</div");	
	}
} 
//renderAnswer does A LOT of things, it does render the answer, buit also does things to the the delay
function renderAnswer(question, clickValue, timer) {
	//empties the display options
	$("#displayOptions").empty();
	//shows the the correct answer
	$("#displayOptions").append("<h2> The correct answer is: " + question.correctOption + "</h2>");
	
	
	//checks to see if the timer has expired, which is passed through the last parameter
	if (timer === "expired") {
		incorrectGuesses ++
		$(".result").html("Out of time! You have guessed " + correctGuesses +  " correctly and " + incorrectGuesses + " incorrectly. " );
		$("#displayOptions").append("<img src='https://media.giphy.com/media/KEPQfFa3CtzCE/giphy.gif'>");
	}
	//if the timer is not expired, then we move to check if answer is correct!
	else {
		if (clickValue === question.correctOption) {
			correctGuesses++
			// clapping renly
			$("#displayOptions").append("<img src='https://media.giphy.com/media/1tGN00iMCj3Mc/giphy.gif'>");
			$(".result").html("You guessed correctly! You have guessed " + correctGuesses +  " correctly and " + incorrectGuesses + " incorrectly. " );
		}
		else {
			//no nothing gif
			$("#displayOptions").append("<img src='https://media.giphy.com/media/KEPQfFa3CtzCE/giphy.gif'>");
			incorrectGuesses ++
			$(".result").html("You guessed incorrectly! You have guessed " + correctGuesses +  " correctly and " + incorrectGuesses + " incorrectly. " );
		
		}
	}
	//update the currentQuestion number
	currentQuestion ++;

	//stops the timerValue
	clearInterval(interval);
	//sets up the delay
	delay = setInterval(function() {
		//checks to see if the last question has been used
		if (currentQuestion === 10 ){
			//updates the page with the end of the 
			renderEndGame()
		}
		else { 
			//resets the timerValue
			timerValue = 30
			//restarts the interval after 3 seconds 
			interval = setInterval(count, 1000);
			//calls updates page which also clears the interval on delay
			updatePage(questionArray[currentQuestion])
		}
		//delay is 3 seconds
	}, 3000)
			
}
//renders the end game and resets variables to play again
function renderEndGame() {
	//resets the currentQuestion, correctGuesses, and incorrectGuesses
	currentQuestion = 0;

	//stops the delay
	clearInterval(delay)
	//displays the start again by removing the css class
	$("#start").removeClass("hide");
	$("#start").append("<h1>Thanks for playing!</h1>")
	$("#start").append("<h2>Click here to try again</h2>")
	$("#displayOptions").empty();
	$(".timer").empty()
	$(".result").empty()
	$(".question").empty()
	$(".result").html("Final Score! <br> You have guessed " + correctGuesses +  " correctly <br> You have guessed " + incorrectGuesses + " incorrectly. " );

	correctGuesses = 0;
	incorrectGuesses = 0;

}



