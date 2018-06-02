//TODOS
//1. DONE 5/27/2018 Make the selectedFighter not selectable again as an enemy...probably remove that class or something??? 
//2. Winning is defeating all 3 enemeys, so need to add that as a criteria
//3. DONE 5/28/2018 Reset button
//4. DONE 6/2/2018 Add pictures and stuff
//5. DONE 5/27/2018 Add an attribute to all fighters which allows for their attack power to increase 
//6. DONE 6/2/2018 Watch the demo again, it would print the battle out at the bottom, should be easy to do, just something I need to add 
//7. DONE 5/28/2018 Field which lists the battle info with attack strength and HP, is written each time. Also is cleared by the reset button



//boolean value to determine if fighter has been selected 

var isFighterSelected = false;

//boolean value to determine if an enemey is currently selected
var isEnemySelected = false;

//initalizes the selectedFighter variable which will be assigned one of the 4 objects below
var selectedFighter;

var currentEnemy;

var wins = 0;


//object which will be one of the fighters
var fighter1 = { 
    displayArea: ".fighter1",
    class: "fighter1",
    name: "Thrawn",
    imageSrc: "assets/images/Thrawn.jpg",
    currentHP: 50,
    maxHP: 50,
    attack: 50,
    currentAttack: 50,
    attackMod: 5
};

//object which will be one of the fighters
var fighter2 = {
    displayArea: ".fighter2",
    class: "fighter2",
    name: "Bossk",
    imageSrc: "assets/images/bossk.gif",
    currentHP: 150,
    maxHP: 150,
    attack: 60,
    currentAttack: 60,
    attackMod: 5
};

//object which will be one of the fighters
var fighter3 = {
    displayArea: ".fighter3",
    class: "fighter3",
    name: "IG-88",
    imageSrc: "assets/images/ig88.jpg",
    currentHP: 100,
    maxHP: 100,
    attack: 5,
    currentAttack: 5,
    attackMod: 5
};

//object which will be one of the fighters
var fighter4 = {
    displayArea: ".fighter4",
    class: "fighter4",
    name: "Boba Fett",
    imageSrc: "assets/images/BobaFett.jpg",
    currentHP: 1000,
    maxHP: 1000,
    attack: 20,
    currentAttack: 20,
    attackMod: 5
};

var fightersArr = [fighter1, fighter2, fighter3, fighter4];

//This is used to determine what is the index number in the fightersArr when one of the div blocks are selected. It associated with a piece of data in the <div> tag
var fightersArrIndex;
//Different states the game could be in 
var gameStateArr = ["fighterSelected", "currentEnemyDead", "battle", "newEnemy", "win", "lose"]
//This will take one of the 6 game states and will be used to write the page appropriately
var gameState;


//array which has all the fighters in it, used to populate the page through a for loop


//initiliazes the power of jQuery
$(document).ready(function() {
    //updates all the fighter's information   
    function writePage() {
        //cycles through the fighter array to append the fighter's stat to their respective blocks with some light formatting
        for (i = 0; i < fightersArr.length; i++) {
            var newImg = $("<img>");
            var imgSrc = fightersArr[i].imageSrc 
            newImg.attr("src", imgSrc);
            newImg.addClass("fighterImage");
            $(fightersArr[i].displayArea).html("<p class ='fighterStats'>"+ fightersArr[i].name + "<br>" +"HP: " + fightersArr[i].currentHP + "<br>" +"attack: " + fightersArr[i].currentAttack  + "<br>" + "</p>");
            $(fightersArr[i].displayArea).append(newImg);
            }
            //only triggers if both a fighter and an enemy is selected, it updates the battlelog and the counterattack log


            //the below if/else if/else if/ else statement is...messy, maybe set up a variable to help regulate this for different "states" of the game
            //ie state = heroSelected, enemyDefeated, newEnemySelected, battle, lose, win
        if ((isFighterSelected) && (isEnemySelected === false) && wins === 0) {
            $(".battleLog").html("You have chosen " + selectedFighter.name + "! Good luck! ")
        }
        
        else if ((isFighterSelected) && (isEnemySelected)) {

            $(".battleLog").html(selectedFighter.name + " did " + selectedFighter.currentAttack + " damage to " + currentEnemy.name );
            $(".counterAttackLog").html(currentEnemy.name + " counterattacked for " + currentEnemy.currentAttack + " damage to " + selectedFighter.name )
            }
            
        //only triggers if wins are greater than 0, so an enemy has been defeated, and no enemy has been selected (which is flipped off by the death of an enemy)
        else if  (wins > 0 && isEnemySelected === false) {
            $(".battleLog").html(selectedFighter.name + " defeated "  + currentEnemy.name + ". Select a new enemy!" );
            $(".counterAttackLog").empty();

        }
        else {
            $(".battleLog").empty();
            $(".counterAttackLog").empty();
        }
    }

    writePage();

    //apparenlty with jQuery, this listens for any .chooseable element that was created with the page loaded
    //which didn't work when I was hitting reset
   // $(".chooseable").click(function() {  

   //this one is something about "delegating" which works now with the reset function and the rewritten fighters that appear (YES THEY ARE CLICKABLE)
    $('body').on('click', '.chooseable', function () {
        //if the user has not selected a fighter yet, this triggers
        if (isFighterSelected === false) {

            console.log("hero chosen!")

            isFighterSelected = true;
            
            //grabs the index number passed from the html 
            fightersArrIndex = $(this).attr("fightersArrIndex");

            $(this).addClass("hero")
                     
            //grabs the object from the array based off of that piece of passed data
            selectedFighter = fightersArr[fightersArrIndex];
            
            //updates the screen by moving the clicked fighter to the chosen fighter area
            $("#chosenFighter").append($(this));
            //updates the screen by appending all the other characters to the enemiesToSelect area
            for (i = 0; i < fightersArr.length; i++){
                if (fightersArr[i] !== selectedFighter) {
                    var enemy = $(fightersArr[i].displayArea)
                    $("#enemiesToSelect").append(enemy);
                }
            }
           
            console.log("The heroe's name: " + selectedFighter.name);
            writePage();     
        }
        else if (isEnemySelected === false) {
            isEnemySelected = true

             //grabs the index number passed from the html 
            
            fightersArrIndex = $(this).attr("fightersArrIndex");

            $(this).addClass("currentEnemy")

            //grabs the object from the array based off of that piece of passed data
            currentEnemy = fightersArr[fightersArrIndex];

            //checks to make sure whatever is clicked is not the same div as selected as the selectedFighter
            if (selectedFighter.name === currentEnemy.name) {
                //sets currentEnemy to an empty string
                currentEnemy = "";
                //sets isEnemySelected to false so the next time a div is pressed, IT will become the enemy
                isEnemySelected = false;
            }
            //if it is not the same block, it actually updates the page
            else {
                $("#chosenEnemy").append($(this));
    
                console.log("The enemy's name is: " + currentEnemy.name);
            }

        }         
        else {
            alert("You have all you need");
        }
    })

    $(".attack").click(function() {
        //only works if both the fighter and enemy is selected
        console.log("Attack!!!")
        if ((isEnemySelected) && (isFighterSelected)) {
    
            //should nestle these calculations in some type of if/else ... if the enemy HP drops below 0 they should probably die

        //updates the HP of the enemy
        currentEnemy.currentHP = currentEnemy.currentHP - selectedFighter.currentAttack;
        //updates the HP of the fighter
        selectedFighter.currentHP = selectedFighter.currentHP - currentEnemy.currentAttack;
            
        //adds attack modifer after attack
        selectedFighter.currentAttack += selectedFighter.attackMod;
        
            if (currentEnemy.currentHP <= 0) {
                
                //makes the enemy disappear if they go below 0 HP which makes their display: none 
                $(currentEnemy.displayArea).addClass("dead");
                isEnemySelected = false;
                wins += 1;
                console.log(wins);
                
            }
            else if (selectedFighter.currentHP <= 0){
                
                console.log("hero dead")

                alert("you lose!")
            }
          
            }
            writePage();
    })
    $(".reset").click(function() { 
        console.log("reset has been hit");

        //empties the area on the screen
        $("#chosenFighter, #chosenEnemy, #enemiesToSelect, .battleLog, .counterAttackLog,  .fighterDisplay").empty();
       
        //resets the two booleans which govern which area of the page a fighter is placed
        isFighterSelected = false;
        isEnemySelected = false;
        wins = 0;
        //cycles through the fightersArr
        for (i = 0; i < fightersArr.length; i ++) {
            //restores the objects HP to the max
            fightersArr[i].currentHP = fightersArr[i].maxHP;
            //restores the objects attack to its normal level
            fightersArr[i].currentAttack = fightersArr[i].attack;

            //creates a new div
            var newDiv = $("<div>");
            //grabs the class from the object and adds the other two classes
            var classesToBeAdded = fightersArr[i].class + " character chooseable";

            //adds the classes to the dive
            newDiv.addClass(classesToBeAdded);
            //adds the fightersArrIndex based on the iteration
            newDiv.attr("fightersArrIndex", i);
            //adds the div to the display
            $(".fighterDisplay").append(newDiv);
        
        }
        //updates the new divs with the fighter's info
        writePage();
    })


})
