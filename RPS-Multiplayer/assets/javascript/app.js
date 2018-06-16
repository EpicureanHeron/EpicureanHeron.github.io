
///sets up firebase

var config = {
    apiKey: "AIzaSyDodLNiFVaqhkd_Baj-raci3HdpDeu2Ens",
    authDomain: "rps-multiplayer-d57ed.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-d57ed.firebaseio.com",
    projectId: "rps-multiplayer-d57ed",
    storageBucket: "",
    messagingSenderId: "817451184793"
  };
  firebase.initializeApp(config);

//Creates a database variable which is linked to firebase
var database = firebase.database();

var choicesArr = ["rock", "paper", "scissors"];

var activePlayer = 1;

var choice1, choice2;

var player1Wins = 0;

var player2Wins = 0;

var ties = 0
 
renderChoices()

$('body').on('click', '.choice ', function () {

 var whichClicked = $(this).attr("data-type");
 database.ref().push({
  choice: whichClicked,
  playerNumber: activePlayer,
  dataAdded: firebase.database.ServerValue.TIMESTAMP
});

if(activePlayer === 1) {
  activePlayer = 2
}
else{
 activePlayer = 1

}
renderChoices()

 console.log(whichClicked);
})


function renderChoices() {
 
  for (i = 0; i < choicesArr.length; i++) {
    var newP = $("<p>");
    newP.attr("data-type", choicesArr[i]);
    newP.addClass("choice");
    newP.html(choicesArr[i]);

    if(activePlayer === 1) {
      $("#player1").append(newP)
      
      $("#player2").empty()
    }
    else{
      $("#player2").append(newP)
      $("#player1").empty()
    }
  }
  // $("#player1").prepend("<h3>Player 1</h3>")
  // $("#player2").prepend("<h3>Player 2</h3>")
  // $("#results").prepend("<h3>Results</h3>")
 
}

function decideWinner (choice1, choice2) {
  if(choice1 === choice2) {
    console.log("tie!")
    ties ++
  }
  else if(choice1 === "rock" && choice2 ==="scissors"){
    console.log("player1 Wins!")
    player1Wins ++
  }
  else if(choice1 === "rock" && choice2 ==="paper"){
    console.log("player2 wins!")
    player2Wins ++
  }
  else if(choice1 === "paper" && choice2 ==="rock"){
    console.log("player1 wins!")
    player1Wins ++
  }
  else if(choice1 === "paper" && choice2 === "scissors"){
    console.log("player2 wins!")
    player2Wins++
  }
  else if(choice1 === "scissors" && choice2 === "paper"){
    console.log("player1 wins!")
    player1Wins++
  }
  else if(choice1 === "scissors" && choice2 === "rock"){
    console.log("player2 wins!")
    player2Wins++

  }

  renderResults()
}

database.ref().on("child_added",function(childSnapshot) {
  if(childSnapshot.val().playerNumber === 1) {
    choice1 = childSnapshot.val().choice
  }
  else if(childSnapshot.val().playerNumber === 2) {
    choice2 = childSnapshot.val().choice
    decideWinner(choice1, choice2)
  }
})

function renderResults() {
  $("#results").empty()
  var newP = $("<p>");
  newP.html("Player 1 wins: " +player1Wins)
  $("#results").append(newP)
  var newP = $("<p>");
  newP.html("Player 2 wins: " + player2Wins)
  $("#results").append(newP)
  var newP = $("<p>");
  newP.html("ties: " + ties)
  $("#results").append(newP)
  // $("#results").prepend("<h3>Results</h3>")
}