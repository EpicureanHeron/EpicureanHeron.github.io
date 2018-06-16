
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

var choicesArr = ["rock", "paper", "scissors"]

var activePlayer = 1
 
renderChoices()

$('body').on('click', '.choice ', function () {

 var whichClicked = $(this).attr("data-type");
 database.ref().push({
  choice: whichClicked,
  playerNumber: activePlayer
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
    
    console.log("Done@!");
    if(activePlayer === 1) {
      $("#player1").append(newP)
      $("#player2").empty()
    }
    else{
      $("#player2").append(newP)
      $("#player1").empty()
    }
  
  }
}

function decideWinner (choice1, choice2) {
  
}
