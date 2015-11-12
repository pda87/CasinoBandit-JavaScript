function checkCombinations(betAmount) {
  
  //ONE BAR - WIN NOTHING
  if(currentImages[0] == "Bar" || currentImages[1] == "Bar" ||
  currentImages[2] == "Bar")
  {
    oneBar();
  }
  
  //THREE SEVEN - WIN 100XBET
  else if(currentImages[0] == "Seven" && currentImages[1] == "Seven" &&
  currentImages[2] == "Seven")
  {
	threeSevens();
  }
  
  //THREE CHERRIES - WIN 4XBET
  else if(currentImages[0] == "Cherry" && currentImages[1] == "Cherry" &&
  currentImages[2] == "Cherry")
  {
	threeCherries();
  }
  
  //TWO CHERRIES - WIN 3XBET
  else if(currentImages[0] == "Cherry" && currentImages[1] == "Cherry"
  || currentImages[0] == "Cherry" && currentImages[2] == "Cherry"
  || currentImages[1] == "Cherry" && currentImages[2] == "Cherry")
  {
	twoCherries();
  }
  
  //ONE CHERRY - WIN 2XBET
  else if(currentImages[0] == "Cherry" || currentImages[1] == "Cherry" ||
  currentImages[2] == "Cherry")
  {
	oneCherry();
  }
  
  playerBankContent.innerHTML = "Player's Money: " + playerBank + ".00";

}

function clearTextBox() {
  var betInput = document.getElementById("betBox");
  betInput.value = "";
}

function displayRandomFruits() {
	
	if(!repeatRandomFruits)
	{
		return;
	}
	
	generateRandomImages();
	setTimeout(function(){displayRandomFruits()},repeatTime);
	
}

function generateRandomImage(reel) {
  var randomNumber = Math.round(Math.random()*(11));
  currentImages.push(images[randomNumber]);
  var reel = document.getElementById(reel);
  var imageString = "ReelImages/" + images[randomNumber] + ".png";
  reel.src = imageString;
}

function generateRandomImages() {
  
  currentImages = [];
  
  generateRandomImage("reel1");
  generateRandomImage("reel2");
  generateRandomImage("reel3");  
}

function oneBar() {
	betStringContent.innerHTML = "You bet: " + betAmount + ".00 and won nothing!";
}

function oneCherry() {
	betStringContent.innerHTML = "You bet: " + betAmount + ".00"
	+ " and won " + (2*betAmount) + ".00!";
	playerBank += 2*betAmount;
}

function pullTheLever() {
  
  repeatRandomFruits = false;
  
  if(playerBank <= 0)
  {
    alert("Bankrupt! :(");
	clearTextBox();
  	return;
  }
  
  var betString = document.getElementById("betBox").value;
  
  betAmount = parseInt(betString);
  
   if(!isNaN(betAmount))
   {    
		if(betAmount > playerBank || betAmount <= 0)
		{
		  alert("Invalid input!");
		  clearTextBox();
		  return;
		}
		
		playerBank -= betAmount;
		betStringContent.innerHTML = "You bet: " + betAmount + ".00";
		playerBankContent.innerHTML = "Player's Money: " + playerBank + ".00";
		generateRandomImages();

		checkCombinations(betAmount);	
    }
}

function reset() {
	repeatRandomFruits = true;
	repeatTime = 100;
	playerBankContent  = document.getElementById("playerBank");
	playerBank = 100;
	playerBankContent.innerHTML = "Player's Money: " + playerBank + ".00";
	betStringContent  = document.getElementById("betString");
	betStringContent.innerHTML = "<br>";
	
	images = [
	"Bar", "Bell", "Cherry", "Clover", "Diamond", "HorseShoe",
	"Lemon", "Orange", "Plum", "Seven", "Strawberry", "Watermelon",
	];
	
	currentImages = [];
	displayRandomFruits();

}

function threeCherries() {
	betStringContent.innerHTML = "You bet: " + betAmount + ".00"
	+ " and won " + (4*betAmount) + ".00!";
	playerBank += 4*betAmount;
}

function threeSevens() {
	betStringContent.innerHTML = "You bet: " + betAmount + ".00"
	+ " and won " + (100*betAmount) + ".00 - JACKPOT!!";
	playerBank += 100*betAmount;
	alert("JACKPOT!");
}

function twoCherries() {
	betStringContent.innerHTML = "You bet: " + betAmount + ".00"
	+ " and won " + (3*betAmount) + ".00!";
	playerBank += 3*betAmount;
}

var betAmount;
var repeatRandomFruits;
var repeatTime;
var playerBankContent;
var playerBank;
var betStringContent;
var images;
var currentImages;

reset();