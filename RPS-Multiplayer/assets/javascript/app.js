
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

  database.ref().set({
    testValue: 0,
    testPlayer: "MonsterMash"
  });
  //This is something I will probably use 
  database.ref().on("value", function(snapshot) {

    $("#testName").html(snapshot.val().testPlayer)
    $("#testNumber").html(snapshot.val().testValue)

  console.log(snapshot)
    })
    
