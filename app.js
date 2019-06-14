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
var active;//active player 1 or 2
newGame();

document.querySelector(".btn-new").addEventListener("click",newGame);

document.querySelector(".btn-roll").addEventListener("click", function(){
	//clicked on roll dice
	var value = Math.floor(Math.random()*6 + 1);
	if(value === 1){
		console.log("encountered 1");
		currentScore[active]=0;
		updateCurrentBox();
		hold();
		return;
	}
	currentScore[active] += value;
	updateDiceImage(value);
	updateCurrentBox();//and also score
	checkWinning();
});

//document.querySelector(".btn-hold").addEventListener("click", hold);

function hold(){
	console.log("hold called");
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
	//now use dom
	document.querySelector("#name-1").innerText = "Player 1";
	document.querySelector("#name-2").innerText = "Player 2";

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
	if(totalScore[active]+currentScore[active] >= 100){
		declareWinner();
	}
}

function declareWinner(){
	totalScore[active] += currentScore[active];
	document.querySelector("#score-"+active).innerText = totalScore[active];
	document.querySelector("#name-"+active).innerText = "⛳ Winner ⛳";
	document.querySelector("#current-score-"+active).innerText = currentScore[active] = 0;
	//disabling the two button 
	document.querySelector(".btn-roll").disabled = true;
	document.querySelector(".btn-hold").removeEventListener("click", hold);
}


