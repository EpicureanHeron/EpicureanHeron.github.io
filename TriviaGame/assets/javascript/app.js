//TODOS
//1. Create a buffer page between questions
	//This may need its own setInterval() thing...not sure yet, perhaps a while loop within the count function to delay updating the screen which is switched when the setInterval returns a certain value to proceed?
//2. Rewatch the video

var questionNumber = 0;

var timerValue = 30
//variable to be used after the answer is submitted
var correctGuesses = 0;

var incorrectGuesses = 0;

var question0 = createQuestionObj("Who was the king before Robert Baratheon?", ["Aerys Targaryen", "Jaehaerys II Targaryen", "Joffrey Lannister", "Aegon I Targaryen"], 0)

var question1 = createQuestionObj("Which of the following names is NOT one of the Stark children's direwolve? ", ["Ghost", "Spring", "Lady", "Grey Wind"], 1)

//https://awoiaf.westeros.org/index.php/Free_Cities
var question2 = createQuestionObj("Which of the following is NOT a free city of Essos ", ["Qohor", "Myr", "Lantum", "Lys"], 2)

//http://gameofthrones.wikia.com/wiki/Assassination_of_Jon_Arryn
var question3 = createQuestionObj("Who killed Jon Arryn?", ["Peter 'Littlefinger' Baelish", "Varys", "Ceresi Lannister", "Lysa Arryn"], 3)

var question4 = createQuestionObj("Which character has never been a eunuch?", ["Theon Greyjoy", "Varys", "Grey Worm", "Tyrion Lannister"], 3)




var questionArray = [question0, question1, question2, question3, question4]

var currentQuestion = 0



//starts the timer which calls the count function 
function startTimer() {
	//probably should set this to a variable so that I can refer back to it and reset it ? 
    setInterval(count, 1000);
	updatePage(question0)
  }
  
function count() {
	//counts down and updates the screen
	timerValue = timerValue-1
	$(".timer").html(timerValue)
	
	if (timerValue === 25) {
		whichRadioChecked()
		currentQuestion ++
	
		$("form").empty()
		timerValue = 30;

		//passes the current question (as selected by the question array) to the update page function 
		updatePage(questionArray[currentQuestion])
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
		 correctIndex: correctGuessIndex
	}
	//updates the question number
	questionNumber ++ 
	//returns the new object
	return newObject
}
 //takes a question (which needs to be an object) as a parameter and writes it to the page
function updatePage(question) {
	//displays question
	$(".question").html(question.mainQuestion)
	//displays all options
	for (i = 0; i < question.options.length; i ++) {		
		//updates the optionNumber
		var optionNumber = i 
		$("form").append("<input type='radio' name='option' value='" + i + "' class='" + optionNumber + "'>" + question.options[i] + "<br>")	
	}
} 

function whichRadioChecked() {
	//sets the correctAnswer to the current question's correct index number + the string 'optionNumber' so it looks like optionNumber1

	var correctAnswer = "." + questionArray[currentQuestion].correctIndex
	console.log("whichRadioChecked triggered " + correctAnswer)
	//checks to see if optionNumber1
	if ($(correctAnswer).prop("checked")) {
		correctGuesses++
		$(".result").html("You guessed correctly! You have guessed " + correctGuesses +  " correctly and " + incorrectGuesses + " incorrectly. " )

	}
	else {
		incorrectGuesses ++
		$(".result").html("You guessed poorly! You have guessed " + correctGuesses + " correctly and " + incorrectGuesses + " incorrectly. " )

		//would be good to add logic here to see if NO option was checked...but not necessary
	}
	
}


startTimer()


