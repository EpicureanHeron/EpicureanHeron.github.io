//TODOS

//12.DONE 6/6/2018 UPDATE WRITE LOGIC WITH GAME STATE ARRAY 

//1. DONE 5/27/2018 Make the selectedFighter not selectable again as an enemy...probably remove that class or something??? 
//2. DONE 6/5/2018 Winning is defeating all 3 enemies, so need to add that as a criteria
//3. DONE 5/28/2018 Reset button
//4. DONE 6/2/2018 Add pictures and stuff
//5. DONE 5/27/2018 Add an attribute to all fighters which allows for their attack power to increase 
//6. DONE 6/2/2018 Watch the demo again, it would print the battle out at the bottom, should be easy to do, just something I need to add 
//7. DONE 5/28/2018 Field which lists the battle info with attack strength and HP, is written each time. Also is cleared by the reset button
//8. Style buttons 
//9. Make the page look cleaner
//10. DONE 6/5/2018 make it so the hero that is clicked is no longer clickable (can have them fight themselves right now...)
//11. Rewatch the video, go over criteria again

    //DONE 6/6/2018 Only display HP, no more attack points
    //DONE 6/5/2018 hitting attack when no enemy present, update attack area with message "no one here"
    //DONE 6/6/2018 check logic on counter attack, if a counter attack would have killed my character, it doesn't matter cause I already won
    //DONE 6/6/2018 sUpdate page if enenmy is not there


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
    currentHP: 80,
    maxHP: 80,
    attack: 6,
    currentAttack: 6,
    attackMod: 2
};

//object which will be one of the fighters
var fighter2 = {
    displayArea: ".fighter2",
    class: "fighter2",
    name: "Bossk",
    imageSrc: "assets/images/bossk.gif",
    currentHP: 150,
    maxHP: 150,
    attack: 8,
    currentAttack: 8,
    attackMod: 3
};

//object which will be one of the fighters
var fighter3 = {
    displayArea: ".fighter3",
    class: "fighter3",
    name: "IG-88",
    imageSrc: "assets/images/ig88.jpg",
    currentHP: 90,
    maxHP: 90,
    attack: 5,
    currentAttack: 5,
    attackMod: 4
};

//object which will be one of the fighters
var fighter4 = {
    displayArea: ".fighter4",
    class: "fighter4",
    name: "Boba Fett",
    imageSrc: "assets/images/BobaFett.jpg",
    currentHP: 120,
    maxHP: 120,
    attack: 15,
    currentAttack: 15,
    attackMod: 1
};

var fightersArr = [fighter1, fighter2, fighter3, fighter4];

//This is used to determine what is the index number in the fightersArr when one of the div blocks are selected. It associated with a piece of data in the <div> tag
var fightersArrIndex;


//This will take one of the 6 game states and will be used to write the page appropriately
var gameState;


//array which has all the fighters in it, used to populate the page through a for loop


//initiliazes the power of jQuery
$(document).ready(function() {
    //updates all the fighter's information   
	
	// sets the initial game state to be to indicate that no fighter is selected 
	gameState = "noFighterSelected";
	writePage();
	//function which updates the page 
    function writePage() {
		
		console.log(gameState)
        //cycles through the fighter array to append the fighter's stat to their respective blocks with some light formatting
        for (i = 0; i < fightersArr.length; i++) {
            var newImg = $("<img>");
            var imgSrc = fightersArr[i].imageSrc 
            newImg.attr("src", imgSrc);
            newImg.addClass("fighterImage");
            $(fightersArr[i].displayArea).html("<p class ='fighterStats'>"+ fightersArr[i].name +  "</p>");
            $(fightersArr[i].displayArea).append(newImg);
            $(fightersArr[i].displayArea).append("<p class ='fighterStats'> Current HP: " + fightersArr[i].currentHP +"</p>")
            }
            //only triggers if both a fighter and an enemy is selected, it updates the battlelog and the counterattack log


            //the below if/else if/else if/ else statement is...messy, maybe set up a variable to help regulate this for different "states" of the game
            //ie state = heroSelected, enemyDefeated, newEnemySelected, battle, lose, win

            //the above is what I should do to handle the different states rather than relying on a hodgepodge of settings! 
		//Trigers after an enemy is selected
        if (gameState === "fighterSelected") {
            $(".battleLog").html("You have chosen " + selectedFighter.name + "! Good luck! ")
			gameState = "noEnemy"
        }
		
		else if (gameState === "newEnemy") {
			$(".battleLog").html(selectedFighter.name + " is fighting " + currentEnemy.name );
            gameState = "battle"
            console.log(gameState)
		}
        
        else if (gameState === "battle") {
			
            $(".battleLog").html(selectedFighter.name + " did " + selectedFighter.currentAttack + " damage to " + currentEnemy.name );
            $(".counterAttackLog").html(currentEnemy.name + " counterattacked for " + currentEnemy.currentAttack + " damage to " + selectedFighter.name )
            }
            
        //only triggers if wins are greater than 0, so an enemy has been defeated, and no enemy has been selected (which is flipped off by the death of an enemy)
        else if  (gameState === "defeatedEnemy") {
           // $(".battleLog").html(selectedFighter.name + " defeated "  + currentEnemy.name + ". Select a new enemy!" );
		   console.log("DEFEATED ENEMY TRIGGERED")
		   $(".battleLog").html(selectedFighter.name + " defeated "  + currentEnemy.name + "!")
            $(".counterAttackLog").empty();
			
            if (wins === 3) {
                $(".battleLog").html(selectedFighter.name + " defeated "  + currentEnemy.name + "!");
                $(".counterAttackLog").html(selectedFighter.name + " has defeated all challengers! They are victorious! To play again, click the reset button");
            }
			
		else if (gameState === "wonGame") {
			$(".battleLog").html(selectedFighter.name +" has defeated all challengers! Hit RESET to play again" );
            $(".counterAttackLog").empty();

			}
        }
        
        else if (gameState === "heroDead") {
            $(".battleLog").html(selectedFighter.name +" has been defeated by " + currentEnemy.name +"!");
            $(".counterAttackLog").html("Hit the reset button to try again");


        }
        
        
        else {
            $(".battleLog").empty();
            $(".counterAttackLog").empty();
        }
		

    }

    //apparenlty with jQuery, this listens for any .chooseable element that was created with the page loaded
    //which didn't work when I was hitting reset
   // $(".chooseable").click(function() {  

   //this one is something about "delegating" which works now with the reset function and the rewritten fighters that appear (YES THEY ARE CLICKABLE)
    $('body').on('click', '.chooseable', function () {
        //if the user has not selected a fighter yet, this triggers
        if (gameState === "noFighterSelected") {
			//updates the game state to be "fighterSelected" which will be used to write to the document
			gameState = "fighterSelected"
            console.log("hero chosen!")

            //isFighterSelected = true;
            
            //grabs the index number passed from the html 
            fightersArrIndex = $(this).attr("fightersArrIndex");

            $(this).addClass("hero")
            $(this).removeClass("chooseable");
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
        else if ((gameState === "noEnemy") || (gameState === "defeatedEnemy")) {
            console.log("This is the game state before it gets reset in the else if " +gameState)
            gameState = "newEnemy";
            console
             //grabs the index number passed from the html 
            
            fightersArrIndex = $(this).attr("fightersArrIndex");

            $(this).addClass("currentEnemy")

            //grabs the object from the array based off of that piece of passed data
            currentEnemy = fightersArr[fightersArrIndex];

            //checks to make sure whatever is clicked is not the same div as selected as the selectedFighter
            
            //if it is not the same block, it actually updates the page
            
            $("#chosenEnemy").append($(this));
    
            console.log("The enemy's name is: " + currentEnemy.name);
			
			writePage(); 
            

        }         
      
    })

    $(".attack").click(function() {
     

		if (gameState === "battle") {
		
				//should nestle these calculations in some type of if/else ... if the enemy HP drops below 0 they should probably die

			//updates the HP of the enemy
			currentEnemy.currentHP = currentEnemy.currentHP - selectedFighter.currentAttack;
			//updates the HP of the fighter
			
				
			//adds attack modifer after attack
			selectedFighter.currentAttack += selectedFighter.attackMod;
			
			if (currentEnemy.currentHP <= 0) {
               
				gameState = "defeatedEnemy";
				//makes the enemy disappear if they go below 0 HP which makes their display: none 
				$(currentEnemy.displayArea).addClass("dead");
				
				wins += 1;
				console.log(wins);
			}
			
			else {
				selectedFighter.currentHP = selectedFighter.currentHP - currentEnemy.currentAttack;
				
				if (selectedFighter.currentHP <= 0){
				
				console.log("hero dead")

                gameState = "heroDead"
                

				}
			}	
			writePage();
		 
                }	
                
        else if (gameState === "heroDead") {
            return
        }
		else {
			$(".battleLog").html("You need to chose an enemy" );
			$(".counterAttackLog").empty()
			}
		        
    })
	
    $(".reset").click(function() { 
        console.log("reset has been hit");

        //empties the area on the screen
        $("#chosenFighter, #chosenEnemy, #enemiesToSelect, .battleLog, .counterAttackLog,  .fighterDisplay").empty();
       
        //resets the two booleans which govern which area of the page a fighter is placed
 		gameState = "noFighterSelected"
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
//closes the document.ready function
})
