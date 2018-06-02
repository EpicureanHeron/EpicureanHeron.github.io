//TODO

//Tried to sort the combantantArr by init like I do with the PlayerArr, but for whatever reason the sorting is not working, it seems randomly out of order.

//Need to generate a new <div> with its own placement when an enemey is created

//Not sure if I can create multiple enemies with the "constructor" I am using



//all of the below are player character objects
var dinty = {
    name: "Dinty",
    playerID: "#dinty",
    init: 0,
}

var dymby = {
    name: "Dymby",
    playerID: "#dymby",
    init: 0
}

var tarkus = {
    name: "Tarkus",
    playerID: "#tarkus",
    init: 0
}

var magthar = {
    name: "Magthar",
    playerID: "#magthar",
    init: 0
}

var sheldon = {
    name: "Sheldon",
    playerID: "#sheldon",
    init: 0
}

//array featuring just the PC objects

var playerArr = [dinty, dymby, tarkus, magthar, sheldon]

//initializes the combantantArr which is an empty array
var combantantArr = [];

//hopefully will work with the create enemy button which will iterate this up so we can create object enemy1, enemy2, etc
var enemyCounter = 0;

//has sort been pressed? 
var sortPressed = false;
//variable that gets added to, hopefully used in the nextCharacter()
var activePlayerIndex = 0;



//initiliazes the power of jQuery
$(document).ready(function() {
    //updates the page with the PC stats in blocks
    documentWrite()

    //listens to clicks on the divs with a class of chooseable
    $('body').on('click', '.chooseable', function () {
       
       //each .chooseable also has an attribute of playerArrIndex which is associated with whatever is chosen
       var index = $(this).attr("playerArrIndex");

       //asks the user for a new init number
       var newInit = prompt("What is the characters init?");

       //sets the init from the prompt on to the PC inits in the PC array
       playerArr[index].init = newInit

       //updates the combantantArr with the updated PC arr
       //FOR WHATEVER REASON, THIS IS NOT WORKING THE WAY I THINK WORKS

       documentWrite()
    })
    //clicking the sort button sorts the PCs by init and then generates that order on screen
    $("#sort").click(function() {
        sortPressed = true;
        sortByInit();
        console.log(playerArr)

        populateOrder()
        // documentWrite()


    })
    $("#newEnemy").click(function(){
        
        //prompts user for name of enemy and saves it 
        var newname=  prompt("name for enemy")
       //prompts user for the initiative of enemy
        var init = prompt("init?")
        //constructs a new enemy based on the class Enemy

        var uniqueID = "enemy" + enemyCounter;

        var Enemy = new NewEnemy(newname, init, uniqueID);
        
        playerArr.push(Enemy)

        console.log(Enemy)

        console.log(playerArr)

        var newDiv = $("<div>");

        newDiv.addClass("enemy");

        

        newDiv.attr("id", uniqueID);

        newDiv.html(Enemy.name +"<br>" +Enemy.init);

        $("#fighterDisplay").append(newDiv);

        enemyCounter ++;

        console.log(Enemy)
       


    })

    $("#nextTurn").click(nextCharacter)
});

function documentWrite() {
  
        for (i = 0; i < playerArr.length; i++) {
            $(playerArr[i].playerID).html("<p>"+ playerArr[i].name + "<br>" +"init: " + playerArr[i].init + "</p>");
    }
   
}
//this is a SHOULD be a class
function NewEnemy(name, init, playerID) {
    this.name = name;
    this.init = init;
    this.playerID = "#" + playerID;
    
}




function sortByInit() {
    console.log(playerArr)
    //found the code here http://www.javascriptkit.com/javatutors/arraysort2.shtml
    playerArr.sort(function(a, b){
        return a.init-b.init
    })
}
//updates the state of the screen so whoever is in the index[1] spot of the screen is moved to the [0] spot and the index [0] is moved to the back
function nextCharacter() {
    var currentTop = playerArr[0]
    
   
    playerArr.splice(0,1)
    playerArr.push(currentTop)
    $("#fighterDisplay").append($(currentTop.playerID))

    console.log(playerArr[0])

    
   
}
//removes character from the queue (with options that it comes back, this is probably a "revive " function)
function killCharacter(character) {

}

//Create an enenmy NPC
function newEnemy(name, init) {




}
//orders the figherArr based on init 
function populateOrder() {
    //method which reverses the order of the array
    playerArr.reverse()
    for (i = 0; i < playerArr.length; i++) {
        
        var divToMove = $(playerArr[i].playerID)

        $("#fighterDisplay").append(divToMove)

    }
}