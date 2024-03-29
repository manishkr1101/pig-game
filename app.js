/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var totalScore= [];
var currentScore = [];
var prevScore, winningScore;
var active;//active player 1 or 2
//newGame();

document.querySelector(".btn-new").addEventListener("click",newGame);

document.querySelector(".btn-roll").addEventListener("click", function(){
	//clicked on roll dice
	var value = Math.floor(Math.random()*6 + 1);
	changeFavicon(value);
	if(value === 1 || (value===prevScore && value===6)){
		value==1?console.log("encountered 1"):console.log("encountered two 6 in a row");
		currentScore[active]=0;
		
		updateCurrentBox();
		hold();
		return;
	}
	currentScore[active] += value;
	updateDiceImage(value);
	updateCurrentBox();//and also score
	checkWinning();
	prevScore = value;
});

//document.querySelector(".btn-hold").addEventListener("click", hold);

function hold(){
	console.log("hold called");
	prevScore = 0;
	//change status of current player
	totalScore[active] += currentScore[active];
	document.querySelector("#score-"+active).innerText = totalScore[active];
	document.querySelector("#current-score-"+active).innerText = currentScore[active] = 0;//setting current score of active player to 0

	//switch players
	document.querySelector(".player-"+active+"-panel").classList.remove("active");
	active = active%2 + 1;
	document.querySelector(".player-"+active+"-panel").classList.add("active");
	console.log("players has been switched");
}


function newGame(){
	//alert('new game started');
	totalScore[1] = totalScore[2] = 0;
	currentScore[2] = currentScore[1] = 0;
	active = 1;
	prevScore = 0;
	//now use dom
	var x = document.querySelector("input").value;
	winningScore = x==0?100:x;

	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-2-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.add("active");

	document.querySelector("#name-1 span").textContent = "Player 1";
	document.querySelector("#name-2 span").textContent = "Player 2";

	document.querySelectorAll(".player-score")[0].innerText="00";
	document.querySelectorAll(".player-score")[1].innerText="00";
	document.querySelectorAll(".player-current-score")[0].innerText="00";
	document.querySelectorAll(".player-current-score")[1].innerText="00";
	
	document.querySelector(".dice-image").setAttribute("src","dice-5.png");

	document.querySelector(".btn-roll").disabled = false;
	document.querySelector(".btn-hold").addEventListener("click", hold);

}

function updateDiceImage(value){

	document.querySelector(".dice-image").setAttribute("src","dice-"+value+".png");
}

function updateCurrentBox(){
	console.log("currentScore is updated");
	document.querySelector("#current-score-"+active).innerText = currentScore[active];
}

function checkWinning(){
	if(totalScore[active]+currentScore[active] >= winningScore){
		declareWinner();
	}
}

function declareWinner(){
	totalScore[active] += currentScore[active];
	document.querySelector("#score-"+active).innerText = totalScore[active];
	document.querySelector("#name-"+active+" span").innerText = "⛳ Winner ⛳";
	document.querySelector("#current-score-"+active).innerText = currentScore[active] = 0;
	//disabling the two button 
	document.querySelector(".btn-roll").disabled = true;
	document.querySelector(".btn-hold").removeEventListener("click", hold);
}

function changeFavicon(dice){
	document.querySelector("#favicon").setAttribute("href","dice-"+dice+".png");
}



/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
 (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the 
predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a 
good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when 
one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for 
the first one.)
*/















