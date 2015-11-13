function createPage() {
	getHeaderAndNavigation();
	getTitleAndGlyphicons();
	getPageTitle();
	getFooter();
	fadeIn();
	clockFunction();
 }

function fadeIn() {
	$(document).ready(function(){
	
	$('#fade-me').fadeIn(2000);
	});
}
 
function getFooter() {
	var dateNow = new Date();
	var currentYear =  dateNow.getFullYear();
		
	var footerDiv = document.getElementById("pagefooter");
	footerDiv.innerHTML = "<small>PETERARDEN.NET " +  currentYear + "©</small>";
}

function getHeaderAndNavigation() {
	var headerAndNavigationDiv = document.getElementById("headerandnavigationdiv");
	headerAndNavigationDiv.innerHTML = "<div class=\"page-header\"><div class=\"btn-group btn-group-justified\" id=\"headerbuttons\"><a href=\"http://www.peterarden.net\" class=\"btn btn-primary\">Home</a><a href=\"http://www.peterarden.net/code.html\" class=\"btn btn-primary\">Code</a><a href=\"http://www.peterarden.net/contact.html\" class=\"btn btn-primary\">Contact</a><a href=\"http://www.peterarden.net/photography.html\" class=\"btn btn-primary\">Photography</a><a href=\"http://github.com/pda87\" target=\"_blank\" class=\"btn btn-primary\">Github</a></div></div>";

 }

function getPageTitle() {
	var titleDiv = document.getElementById("websitetitle");
	var websiteURLArray = document.location.pathname.split('/');
	var arrayLength = websiteURLArray.length;
	var index = arrayLength - 1;
	titleDiv.innerHTML = "peterarden.net/" + websiteURLArray[index];
}

function getTitleAndGlyphicons() {
	var titleAndContactEnvelope = document.getElementById("titleandcontactenvelope");
	titleAndContactEnvelope.innerHTML = "<div class=\"page-header\"><h1 class=\"text-uppercase\"><p id=\"websitetitle\">peterarden.net/</p><div><a href=\"http://www.peterarden.net\"><span title=\"Home\" class=\"glyphicon glyphicon-home\" id=\"greenglyphicons\"></span></a><a href=\"http://www.peterarden.net/code.html\"><span title=\"Code\" class=\"glyphicon glyphicon-hdd\" id=\"greenglyphicons\"></span></a><a href=\"http://www.peterarden.net/contact.html\"><span title=\"Contact\" class=\"glyphicon glyphicon-envelope\" id=\"greenglyphicons\"></span></a><a href=\"http://www.peterarden.net/photography.html\"><span title=\"Photography\" class=\"glyphicon glyphicon-camera\" id=\"greenglyphicons\"></span></a></a><a href=\"http://github.com/pda87\" target=\"_blank\"><span title=\"Github\" class=\"glyphicon glyphicon-link\" id=\"greenglyphicons\"></span></a></h1></div></div><div id=\"timehere\"></div>";

}
  
function padStringsOut(stringToPad) {
	if(stringToPad.length === 1)
	{
		stringToPad = "0" + stringToPad;
		return stringToPad;
	}
	
	else
	{
		return stringToPad;
	}
}
 
function clockFunction() {
var dateTime = new Date();

var timeHereDiv = document.getElementById("timehere");

hours = dateTime.getHours();
minutes = dateTime.getMinutes();
seconds = dateTime.getSeconds();

if(seconds < 10)
{
	seconds = "0" + seconds;
}

if(minutes < 10)
{
	minutes = "0" + minutes;
}

if(hours < 10)
{
	hours = "0" + hours;
}

timeHereDiv.innerHTML = "";
timeHereDiv.innerHTML = "<p>" + dateTime.toDateString() + " " + hours.toString() + ":" + minutes.toString() + ":" + seconds.toString() + "</p>";

setTimeout("clockFunction()", 1000);
}

var hours;
var minutes;
var seconds;

createPage();