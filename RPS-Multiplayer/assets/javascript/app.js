
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
  var initialValueClicks = 0;
 
  //This is something I will probably use 
  database.ref().on("value", function(snapshot) {
    
   if(!snapshot.val().clickCount){
     clicks = 0;
     console.log("clicks: " + clicks)
     database.ref().set({
      testValue: 0,
      testPlayer: "MonsterMash",
      clickCount: clicks
     })
   }

    clicks = snapshot.val().clickCount;
    console.log("Clicks after snapshot: "+clicks)
    $("#clicks").html(clicks)
    $("#testName").html(snapshot.val().testPlayer)
    $("#testNumber").html(snapshot.val().testValue)
  
    clicks = snapshot.val().clickCount;
  console.log(snapshot)
    })

$("#button").on("click", function() {
 
  // Reduce the clickCounter by 1
  clicks ++
 console.log(clicks)
 //so, if I am SETTING data...it seems it overwrites the database everytime. Which means it if I JUST pass clickCount: clicks I lose all testValue and testPlayer data...
 //Perhaps this is where child attributes come into play..though it MAY not look that way, depending on how jquery works.
 //This has HUGE ramifcations...creating a server side OBJECT to interact with is probably key
  database.ref().set({
    clickCount: clicks,
    testValue: 0,
    testPlayer: "MonsterMash"
  });
  // Alert User and reset the counter
  // if (clicks === 0) {

  //   alert("Phew! You made it! That sure was a lot of clicking.");

    

  // }
})

