
///sets up firebase

// HOMEWORK NOTES: Could set up a variable that gets assigned upon clicking and SET  it to something like "active player"

 //active has certain functions which render certain things (choices etc)

 //inactive player cannot do anything 

 //COULD BE A BOOLEAN or a 0/1

 //conforms with whichever BOX is pressed as a trigger? so if the second person joins, they would HAVE to click the 2nd box 


 //DIsconnect? 

 //Remeber that snapshot thing runs on every cycle? 

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

var lastChatString = "";

var ties = 0;

var playersOnline = 0
 
// renderChoices()

$("#submitPlayer").on("click", function() {
  event.preventDefault();
  playerName = $("#playerName").val().trim()
  console.log(playerName)

  if (playersOnline === 0) {

    database.ref().set({
      players: {
        player1: {
          losses: 0,
          name: playerName,
          wins: 0
        }
      }
      
    })

}
  else if (playersOnline === 1){
    console.log('Check')
    // How update works and this weird file path notation rather than the JSON notation above https://firebase.google.com/docs/database/admin/save-data
    database.ref().update({
      "players/player2/losses": 0,
      "players/player2/name": playerName, 
      "players/player2/wins": 0
    })
  }

})


$('body').on('click', '.choice ', function () {

 var whichClicked = $(this).attr("data-type");

console.log("triggered")

//This sends up new data with a UID, I might want to structure this differently, SETTING the active player at some point so I can flip back and forth and hide things
// database.ref().set({
//   choice: whichClicked,
//   playerNumber: activePlayer,
//   dataAdded: firebase.database.ServerValue.TIMESTAMP
// });

if(activePlayer === 1) {
  activePlayer = 2
}
else{
 activePlayer = 1
}


 console.log(whichClicked);
})


function renderChoices() {
 
  for (i = 0; i < choicesArr.length; i++) {
    var newP = $("<p>");
    newP.attr("data-type", choicesArr[i]);
    newP.addClass("choice");
    newP.html(choicesArr[i]);

    if(activePlayer === 1) {
      $("#player1").append(newP);
      $("#player1").addClass("currentPlayer");
      $("#player2").removeClass("currentPlayer")
      
      $("#player2").empty()
    }
    else{
      $("#player2").append(newP)
      $("#player1").empty()
      $("#player2").addClass("currentPlayer");
      $("#player1").removeClass("currentPlayer")
    }
  }
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

database.ref().on("value", function(snapshot) {
  // if(childSnapshot.val().playerNumber === 1) {
  //   choice1 = childSnapshot.val().choice
  // }
  // else if(childSnapshot.val().playerNumber === 2) {
  //   choice2 = childSnapshot.val().choice
  //   decideWinner(choice1, choice2)
  // }
  
//https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
  if(snapshot.child("players/player1").exists()) {
    console.log("triggered!")
    playersOnline = 1
    console.log("this worked")
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

$("#chatSubmitBtn").on("click", function() {

  event.preventDefault();
  
  chatSubmit = $("#chatSubmit").val().trim();
  lastChatString = chatSubmit;
  $("#chatDisplay").prepend("<p>" + chatSubmit + "</p>")
  
  // database.ref().set({
  //   lastChat: chatSubmit
  // })
    
})

// database.ref().on("value", function(snapshot) {
//   console.log(snapshot.val());
  
  
// }, function(errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });