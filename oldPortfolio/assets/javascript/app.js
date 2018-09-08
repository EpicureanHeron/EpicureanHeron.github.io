// Initialize Firebase
var config = {
    apiKey: "AIzaSyAObF7pzOaD-SbUp-Kcr7Yw3ZB6BzpXAk4",
    authDomain: "epiher-71844.firebaseapp.com",
    databaseURL: "https://epiher-71844.firebaseio.com",
    projectId: "epiher-71844",
    storageBucket: "",
    messagingSenderId: "937973386355"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $('body').on('click', '#contactSubmit', function () {
    event.preventDefault();    
   var name  = $("#name").val().trim();
   var email  = $("#email").val().trim();
   var message  = $("#message").val().trim();

   database.ref("contacts").push({
    name: name,
    email: email,
    message: message,
    dataAdded: firebase.database.ServerValue.TIMESTAMP

  })

   $(".formContact").empty()
    $(".mainContent").html("<p> Thanks! I will be in contact with you shortly.<p> <br> <p>In the meantime, check out some of the projects I built on my <a href='portfolio.html' >portfolio page.</a>")
   });