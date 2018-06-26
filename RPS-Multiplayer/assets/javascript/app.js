//TODOs LEFT as of 6/25/2018

//6. I played around with onDisconnect for a day, could not figure out how to make it trigger based on the client's number, so currently that is being left out...or I can clear the entire database.
//3.Upon a win, an interval is used to time out the screen to show the winner. I attempted this but the interval was also hitting firebase, so it created 2000+ calls. Left function in but I do not call it
    

//DONE 6/22/2018 1. Choice based on which user selected the choice needs to pushed to the respective user account on line
//DONE 6/22/2018 2. Jquery needs to render governed by TURN, so if it is player 1's turn, they have their options, etc. Need lots fo work currently
//DONE 6/23/2018 7. Show user name upon entry, also clear out the submit value locally
//DONE 6/24/2018 4.  Wins and Losses are pushed to the respective user account online
//DONE 6/25/2018 5. Chat feature works on "chat": last chat, probably a PUSH so it has a UID stored to the CHAT object that is created on the database


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

var player1Losses = 0;

var player2Wins = 0;

var player2Losses = 0;
//inits the local player variables
var localPlayer, dataBaseTurn

var lastChatString = "";

var ties = 0;

var playersOnline = 0

var localPlayerServerPath;

var interval = "";

var player1Name;

var player2Name;



 
// renderChoices()

$("#submitPlayer").on("click", function(event) {
  event.preventDefault();
  playerName = $("#playerName").val().trim()
  console.log(playerName)
  $("#playerName").val("");
  //if no players are online, update the database with the creation of player1. 
  //playersOnline is triggered at the database snapshot listening portion by checking if player1 exists
  if (playersOnline === 0) {
    //sets the localPlayer variable
    localPlayer = 1;
    localPlayerServerPath = "players/player1"

    //this could all be done with the "object/object" notation rather than JSON for consistenscy and readablity
    //
    database.ref().update({
      "players/player1/losses": 0,
      "players/player1/name": playerName, 
      "players/player1/wins": 0,
      "players/player1/onlineState": true,

      "turn": 1
    })
}
  else if (playersOnline === 1){
    localPlayer = 2
    localPlayerServerPath =  "players/player1"
    
    // How update works and this weird file path notation rather than the JSON notation above https://firebase.google.com/docs/database/admin/save-data
    database.ref().update({
      "players/player2/losses": 0,
      "players/player2/name": playerName, 
      "players/player2/wins": 0,
      "players/player2/onlineState": true,
      "turn": 1
    })
   
  }
  
})


$('body').on('click', '.choice ', function () {

 var whichClicked = $(this).attr("data-type");

  if(dataBaseTurn === 1) {
    database.ref().update({
      "players/player1/choice": whichClicked,
      "turn": 2
    })
  }

  else if(dataBaseTurn === 2) {
    database.ref().update({
      "players/player2/choice": whichClicked,
      "turn": 0
    })
  }
})



function renderChoices(turn) {
  //clearInterval(interval)
  //clears both areas
  $("#player1").empty()
  $("#player2").empty()
  //runs through each choice


  if(turn === 1 && localPlayer === 2) {
    var nonPlayerP = $("<p>")
    nonPlayerP.html("Waiting for the other player!")
    $("#player2").append(nonPlayerP)
  
  }

  if(turn === 2 && localPlayer === 1 ) {
    var nonPlayerP = $("<p>")
    nonPlayerP.html("Waiting for the other player!")
    $("#player1").append(nonPlayerP)
  
  }

  for (i = 0; i < choicesArr.length; i++) {
    var newP = $("<p>");
    newP.attr("data-type", choicesArr[i]);
    newP.addClass("choice");
    newP.html(choicesArr[i]);

    if(turn === 1 && localPlayer === 1) {
      $("#player1").append(newP);
     
    }
    else if (turn=== 2 && localPlayer ===2){
      $("#player2").append(newP);
    }

  }
}

//CHOICES WILL BE PUSHED UP TO THE PLAYER IN THE DATABASE 
function decideWinner (choice1, choice2) {


  if(choice1 === choice2) {
    console.log("tie!")
    ties ++
    database.ref().update({
      "turn": 1,
      "ties": ties
    })
    
  }

  else if(choice1 === "rock" && choice2 ==="scissors"){
    //player 1 should win
   
    player1Wins ++ 
    player2Losses ++
    database.ref().update({
      "players/player1/wins": player1Wins,
     "turn": 1,
      "players/player2/losses": player2Losses
    })
   // setWinnerTimer(player1Name, choice1)
  }
  else if(choice1 === "rock" && choice2 ==="paper"){
    //player 2 should win
    
    player2Wins ++ 
    player1Losses ++
    database.ref().update({
      "players/player2/wins": player2Wins,
      "turn": 1,
      "players/player1/losses": player1Losses
    })
   // setWinnerTimer(player2Name, choice2)
  }
  else if(choice1 === "paper" && choice2 ==="rock"){
    //player 1 should win
    
    player1Wins ++ 
    player2Losses ++
    database.ref().update({
      "players/player1/wins": player1Wins,
      "turn": 1,
      "players/player2/losses": player2Losses
    })
   // setWinnerTimer(player1Name, choice1)
  }
  else if(choice1 === "paper" && choice2 === "scissors"){
    //player 2 should win 

    player2Wins ++ 
    player1Losses ++
    database.ref().update({
      "players/player2/wins": player2Wins,
      "turn": 1,
      "players/player1/losses": player1Losses
    })
   // setWinnerTimer(player2Name, choice2)
  }
  else if(choice1 === "scissors" && choice2 === "paper"){
    //player 1 should win

    player1Wins ++ 
    player2Losses ++
    database.ref().update({
      "players/player1/wins": player1Wins,
      "turn": 1,
      "players/player2/losses": player2Losses
    })
   // setWinnerTimer(player1Name, choice1)
  }
  else if(choice1 === "scissors" && choice2 === "rock"){
      //player 2 should win 

    player2Wins ++ 
    player1Losses ++
    database.ref().update({
      "players/player2/wins": player2Wins,
      "turn": 1,
      "players/player1/losses": player1Losses
      
    })
    //setWinnerTimer(player2Name, choice2)
  }
  renderResults()
}

function setWinnerTimer(player, choice){
  $("#results").empty()
  var winnerH1 = $("<h1>")
  winnerH1.html(player +" wins!")
  var choiceP = $("<p>")
  choiceP.html(choice)
  
  $("#results").append(winnerH1)
  
  $("#results").append(choiceP)
  //COULD DO AN INTERVAL HERE, ATTEMPTED BUT IT JUST CONSTANTLY UPDATED MY FIREBASE.
  


}

database.ref().on("value", function(snapshot) {
  //Grabs the current turn IF IT EXISTS
  if(snapshot.child("turn").exists()){
    dataBaseTurn = snapshot.child("turn").val()
  }

//https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
  if(snapshot.child("players/player1").exists()) {
    
    playersOnline = 1
    $("#player1Name").html(snapshot.child("players/player1/name").val())
    //Could be unnecessary if onDisconnect is figured out
   
  }

  //if both players exist in the database, passes the databaseturn 
  if(snapshot.child("players/player1").exists() && snapshot.child("players/player2").exists()) {
    $("#player2Name").html(snapshot.child("players/player2/name").val())
    renderChoices(dataBaseTurn)
  }
  
  if(snapshot.child("players/player1/choice").exists()){
    console.log(snapshot.child("players/player1/choice").val())
    choice1 = snapshot.child("players/player1/choice").val()
  }
  if(snapshot.child("players/player2/choice").exists()){
    console.log(snapshot.child("players/player2/choice").val())
    choice2 = snapshot.child("players/player2/choice").val()
  }
  if(snapshot.child("turn").val() === 0) {
    player1Name = snapshot.child("players/player1/name").val()
    player2Name = snapshot.child("players/player2/name").val()
    player1Wins = snapshot.child("players/player1/wins").val()
    player1Losses = snapshot.child("players/player1/losses").val()
    player2Wins = snapshot.child("players/player2/wins").val()
    player2Losses = snapshot.child("players/player2/losses").val()

    decideWinner(choice1, choice2)

  }
  else if(snapshot.child("turn").val() === 1) {
    $("#player1").addClass("currentPlayer");
    $("#player2").removeClass("currentPlayer")
    console.log("turn 1 triggered!")
  }
  else if (snapshot.child("turn").val() === 2) {
  $("#player2").addClass("currentPlayer");
  $("#player1").removeClass("currentPlayer")
  }

  




})
//CHAT
database.ref("chat").on("child_added",function(childSnapshot) {
  var chat = childSnapshot.val().chat
  var whoSpoke = childSnapshot.val().playerChat
  //apparenlty the time stamp from firebase returns MILLISECONDS, so I need to divide that value by 1000
  var timeStamp = childSnapshot.val().dataAdded/1000
  var convertedTime = moment.unix(timeStamp).format("MM/DD/YYYY, HH:mm:ss");

  $("#chatDisplay").prepend("<p>"+ convertedTime + "       "+ whoSpoke +": " + chat + "</p>")

})
//attempting ondisconnect stuff

//this could be done by listening to WHICH player's online state is changed
//once you know that, we can get rid of that branch on the server
//set all scores to 0
//this is probably some sort of "reset" function

//NEED TO TEST THIS

//THIS CUOLD BE PAIRED WITH A LISTENING FUNCTION if Player1 but not player 2 and vice versa...?  Right now clears everytnhing out and both players have to leave

function disconnected(localPlayer) {
  if(localPlayer === 2) {
    database.ref().onDisconnect().update({
      "players/player1/losses": 0,
      "players/player1/name": "", 
      "players/player1/wins": 0,
      chat: "",
      turn: 0
    });
  }
}
//currenlty clears everything
database.ref().onDisconnect().update({
  players: "",
  turn: 1,
  chat: "",
  ties: 0
})

// database.ref().onDisconnect().push({
//   "chat/chat": "Player Disconnected!",
//   "chat/dataAdded": firebase.database.ServerValue.TIMESTAMP,
// })


 
//NEED TO TO TIE THIS TO SOME "DECIDE WINNER PARAMETER PROBABLY"
function renderResults() {

  $("#results").empty()

  var newP = $("<p>");
  newP.html(player1Name +  " chose " + choice1)
  $("#results").append(newP)
  var newP = $("<p>");
  newP.html(player2Name +  " chose " + choice2)
  $("#results").append(newP)
 

  var newP = $("<p>");
  newP.html(player1Name + "'s score:  " + player1Wins)
  $("#results").append(newP)
  var newP = $("<p>");
  newP.html(player2Name + "'s score:  " + player2Wins)
  $("#results").append(newP)
  var newP = $("<p>");
  newP.html("ties: " + ties)
  $("#results").append(newP)
 

  // $("#results").prepend("<h3>Results</h3>")
  database.ref().update({
    "turn": 1
  })

}



$("#chatSubmitBtn").on("click", function(event) {

  event.preventDefault();
  
  chatSubmit =  $("#chatSubmit").val().trim();
  $("#chatSubmit").val("")

  
  
  database.ref("chat").push({
    chat: chatSubmit,
    dataAdded: firebase.database.ServerValue.TIMESTAMP,
    playerChat: playerName
  })

})
