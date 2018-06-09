//TODOS
//1.DONE 6/8/2018 Create a buffer page between questions
	//This may need its own setInterval() thing...not sure yet, perhaps a while loop within the count function to delay updating the screen which is switched when the setInterval returns a certain value to proceed?
//2. DONE 6/8/2018 Rewatch the video
	//1. DONE 6/8/2018 not radio buttons, but DIVs that are clickable, probably with sometype of attr data-value which I need to check (see notes from 6/7/2018)
		//A. DONE 6/8/2018 these divs are clickable which are probably an onclick object which then checks if the question is right or wrong
		//B.DONE 6/8/2018  further logic to check if timer is at 0 
	//2 DONE 6/8/2018 Start screen and a "start button" which kicks offs the game ( main timer). AFter a click start ANOTHER timer before calling the next question (probably 3 seconds) then loads next question
	//3 DONE 6/8/2018 show the correct answer and appropriate message (time's up! or You're right! Or You're Wrong! )
	//4 start over resets the game
		//A. Need to build a check on the currentQuestion which stops the interval and writes to the page with a div that asks "Click here to play again" and also displays their record

var questionNumber = 0;

var timerValue = 30;
//variable to be used after the answer is submitted
var correctGuesses = 0;

var incorrectGuesses = 0;

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

var questionArray = [question0, question1, question2, question3, question4, question5, question6, question7, question8, question9 ];

var currentQuestion = 0;

var interval = "";

var delay = "";

//starts the magic of jquery
$( document ).ready(function() {
    //forces jquery to listen to the whole body any time a .choices is clicked (helpful because I empty the questions area every question)
	 $('body').on('click', '.choices', function ()  {
	
		renderAnswer(questionArray[currentQuestion], $(this).attr("value"), "null");
		});
	$('body').on('click', '#start', function ()  {
		$("#start").addClass("hide")
		startTimer();

		
	});
});

//starts the timer which calls the count function 
function startTimer() {
	//probably should set this to a variable so that I can refer back to it and reset it ? 
    interval = setInterval(count, 1000);
	updatePage(question0);
  }
  
function count() {
	//counts down and updates the screen
	timerValue = timerValue - 1;
	$(".timer").html("Time Left: " + timerValue);
	
	if (timerValue === 0) {
		var expired = "expired";
		renderAnswer(questionArray[currentQuestion], "null", expired);
		
	}
}

//Creates and returns objects that are questions


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
		 //
		 correctOption: guessArr[correctGuessIndex]
	}
	//updates the question number
	questionNumber ++ 
	//returns the new object
	return newObject
}
 //takes a question (which needs to be an object) as a parameter and writes it to the page
function updatePage(question) {
	$(".timer").html("Time Left: " + timerValue);
	$("#start").empty()
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

function renderAnswer(question, clickValue, timer) {
	$("#displayOptions").empty();
	$("#displayOptions").append("<h2> The correct answer is: " + question.correctOption + "</h2>");
	
	
	
	if (timer === "expired") {
		incorrectGuesses ++
		$(".result").html("Out of time! You have guessed " + correctGuesses +  " correctly and " + incorrectGuesses + " incorrectly. " );
		$("#displayOptions").append("<img src='https://media.giphy.com/media/KEPQfFa3CtzCE/giphy.gif'>");
	}
	
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
		
	currentQuestion ++;

	//stops the timerValue
	clearInterval(interval);
	//sets up the delay
	delay = setInterval(function() {
		if (currentQuestion === 1 ){
			renderEndGame()
		}
		else { 
			timerValue = 30
			//restarts the interval after 3 seconds 
			interval = setInterval(count, 1000);
			//calls updates page which also clears the interval on delay
			updatePage(questionArray[currentQuestion])
		}
		
	}, 3000)
			
}

function renderEndGame() {
	clearInterval(delay)
	$("#start").removeClass("hide");
	$("#start").append("<h1>Thanks for playing!</h1>")
	$("#start").append("<h2>Click here to try again</h2>")
	$("#displayOptions").empty();
	$(".timer").empty()
	$(".result").empty()
	$(".question").empty()
	$(".result").html("Final Score! <br> You have guessed " + correctGuesses +  " correctly <br> You have guessed " + incorrectGuesses + " incorrectly. " );

}



