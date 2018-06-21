//TODO

//1. Choice based on which user selected the choice needs to pushed to the respective user account on line
//2. Jquery needs to render governed by TURN, so if it is player 1's turn, they have their options, etc. Need lots fo work currently
//3. Upon winning, it shows a winning screen and then it looks like it uses some type of set interval synced to the database?
//4. Wins and Losses are pushed to the respective user account online
//5. Chat feature works on "chat": last chat, probably a PUSH so it has a UID stored to the CHAT object that is created on the database
//6. Disconnect terminates the player's record (probably need to look into documentation) and updates the chat with the disconnect messages. Everything resets from there

    //the SNAPSHOT listening part will have a majority of the logic because that will be what is capturing the data changing 
    //Lots of different functions OUTISDE of the snapshot listening function will alter data, but not EVERYTHING needs to render based on that
    //That is to say, jquery rendering functions should trigger based on logic within that snapshot listen
	
	//How this may work
		//first player navigates to page, enters their name, that generates a Player1 profile on the server.
		//Locally, need to create a variable that is player1 and assign it their name (the name can be held on the server)
		//second player navigates to page, enters their name, that generates a Player2 profile on the server.
		//Locally, using that value.on snapshot function, we can check if player1 exists, if it does, we will set the local variable to player2 = whatever their name is 
		//using the player1 and player2 local variable, we should be able to use that same data snapshot function to capture determine through some if/elses what gets displayed locally via updating through jquery

    

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

var choice1, choice2;

var player1Wins = 0;

var player2Wins = 0;
//inits the local player variables
var localPlayer1, localPlayer2, dataBaseTurn

var lastChatString = "";

var ties = 0;

var playersOnline = 0


 
// renderChoices()

$("#submitPlayer").on("click", function() {
  event.preventDefault();
  playerName = $("#playerName").val().trim()
  console.log(playerName)

  if (playersOnline === 0) {
    
    localPlayer1 = playerName;
    database.ref().set({
      players: {
        player1: {
          losses: 0,
          name: playerName,
          wins: 0
        },
      
      }
      
    })

}
  else if (playersOnline === 1){
    localPlayer2 = playerName
    
    // How update works and this weird file path notation rather than the JSON notation above https://firebase.google.com/docs/database/admin/save-data
    database.ref().update({
      "players/player2/losses": 0,
      "players/player2/name": playerName, 
      "players/player2/wins": 0,
      "turn": 1
    })
    renderChoices()
  }

})


$('body').on('click', '.choice ', function () {

 var whichClicked = $(this).attr("data-type");

console.log("triggered")
  if(dataBaseTurn === 1) {
    database.ref().set({
      "players/player1/choice": whichClicked
    })
  }
  else if(databaseTurn === 2) {
    database.ref().update({
      "players/player1]2/choice": whichClicked
    })

  //SHOULD DECIDE WINNER HERE
}

})


function renderChoices(turn) {
 
  for (i = 0; i < choicesArr.length; i++) {
    var newP = $("<p>");
    newP.attr("data-type", choicesArr[i]);
    newP.addClass("choice");
    newP.html(choicesArr[i]);
    //NEED TO UPDATE

    if(turn === 1) {
      $("#player1").append(newP);
      $("#player1").addClass("currentPlayer");
      $("#player2").removeClass("currentPlayer")
      
      $("#player2").empty()

      database.ref().update({

        "turn": 2
      })


    }
    else if(turn ===2) {
      $("#player2").append(newP)
      $("#player1").empty()
      $("#player2").addClass("currentPlayer");
      $("#player1").removeClass("currentPlayer")
      database.ref().update({

        "turn": 1
      })
    }
  }
}
//CHOICES WILL BE PUSHED UP TO THE PLAYER IN THE DATABASE 
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
//GOING TO NEED A LOT OF IF/ELSE STATEMENTS HERE TO GOVERN WHEN CERTAIN DATA COMES IN FROM THE DATABASE
    //SPECIFICALLY TURN NUMBER SHOULD BE GOVERNED HERE only IF player 1 has made a choice


database.ref().on("value", function(snapshot) {
  //Grabs the current turn IF IT EXISTS
  if(snapshot.child("turn").exists()){
    dataBaseTurn = snapshot.child("turn").val()
  }
//https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
  if(snapshot.child("players/player1").exists()) {
    
    playersOnline = 1
    
  }
  //if both players exist in the database, passes the databaseturn 
  if(snapshot.child("players/player1").exists() && snapshot.child("players/player2").exists()) {
    renderChoices(dataBaseTurn)
  }

  if(snapshot.child("players/player1/choice").exists()){
    console.log(snapshot.child("players/player1/choice").val())
  }
  if(snapshot.child("players/player2/choice").exists()){
    console.log(snapshot.child("players/player2/choice").val())
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