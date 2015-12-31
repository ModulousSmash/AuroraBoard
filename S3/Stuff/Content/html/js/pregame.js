var pollingSpeed = 1000;//in ms
var fadeSpeed = 3500; // in ms
var fadeAnimationSpeed = 500;
var informationBarSpeed = 6000;
var enterAnimationDuration = 1000;
var player1HasSponsor = false;
var player2HasSponsor = false;
function updateInformation()
{
	$.get('http://127.0.0.1:8081/getCurrentValues', function (json) {
		//player names
		$('#player1Text').text(json.Player1.name);
		$('#player2Text').text(json.Player2.name);
		//scores
		$('#player1Score').text(json.Player1.score.toString());
		$('#player2Score').text(json.Player2.score.toString());
		//sponsors
		$("#sponsorImgP1").attr('src', json.Player1.SponsorIcon);
		$("#sponsorImgP2").attr('src', json.Player2.SponsorIcon);
		//topbar
		$("#round").text(json.round);
		$("#tournamentName").text(json.tournamentName);
		//information bar
		$("#casterText").text(json.caster);
		$("#streamerText").text(json.streamer);

		//playercamtext
		$('#player1streamname').text(json.Player1.name);
		$('#player2streamname').text(json.Player2.name);
		//character images
		$('#imgLeft').attr('src', "img/pregame/characters/" + json.Player1.character.icon);
		$('#imgRight').attr('src', "img/pregame/characters/" + json.Player2.character.icon);
		//flags
		$('#flagIMGP1').attr('src', "img/flags/" + json.Player1.flag.icon);
		$('#flagIMGP2').attr('src', "img/flags/" + json.Player2.flag.icon);
		//hide unnecesary stuff
		if(json.Player1.sponsor.name == 'None')
		{
			player1HasSponsor = false;
		}
		else
		{
			player1HasSponsor = true;
			$("#sponsorImgP1").attr('src', 'img/sponsors/' + json.Player1.sponsor.icon);
		}
		if(json.Player2.sponsor.name == 'None')
		{
			player2HasSponsor = false;
		}
		else
		{
			player2HasSponsor = true;
			$("#sponsorImgP2").attr('src', 'img/sponsors/' + json.Player2.sponsor.icon);
		}
	}, 'json');
	//poll stuff periodically
	setTimeout("updateInformation()", pollingSpeed);
}
var nextFade = "caster";
var nextFlagFade = "country";
function fades()
{
	if(nextFade == "caster")
	{
		nextFade = "streamer"
		$('#microphone').fadeOut(fadeAnimationSpeed, function() { fadeEnd();	/* makes sure one has been faded first */ });
		setTimeout("fades()", informationBarSpeed);
	}
	else
	{
		nextFade = "caster"
		$('#streamer').fadeOut(fadeAnimationSpeed, function() { fadeEnd(); /* makes sure one has been faded first */ });
		setTimeout("fades()", informationBarSpeed);
	}
}
function flagFades()
{
	if(nextFlagFade == "country")
	{
		nextFlagFade = "character"
		$('#characterIMGP1').fadeOut(fadeAnimationSpeed);
		$('#flagIMGP1').fadeIn(fadeAnimationSpeed);
		$('#characterIMGP2').fadeOut(fadeAnimationSpeed);
		$('#flagIMGP2').fadeIn(fadeAnimationSpeed);
		setTimeout("flagFades()", fadeSpeed);
	}
	else
	{
		nextFlagFade = "country"
		$('#flagIMGP1').fadeOut(fadeAnimationSpeed);
		$('#characterIMGP1').fadeIn(fadeAnimationSpeed);
		$('#flagIMGP2').fadeOut(fadeAnimationSpeed);
		$('#characterIMGP2').fadeIn(fadeAnimationSpeed);
		
		setTimeout("flagFades()", fadeSpeed);
	}
}
var whiteFadeoutSpeed = 250;
function fadeEnd()
{
	if(nextFade == "caster")
	{
		$('#microphone').fadeIn(fadeAnimationSpeed);
	}
	else
	{
		$('#streamer').fadeIn(fadeAnimationSpeed);
	}
}
function whiteFadeOut()
{
	$("#white").fadeOut(whiteFadeoutSpeed);
}
function enterAnimationEnd()
{
	var brightness = "brightness(100%)";
	$("#imgLeft").css("webkitFilter", brightness);
	$("#imgRight").css("webkitFilter", brightness);
	var fadeInSpeed = 0;
	var whiteFadeInSpeed = 0;
	$("#uiLeft").fadeIn(fadeInSpeed);
	$("#uiRight").fadeIn(fadeInSpeed);
	$("#player1Text").fadeIn(fadeInSpeed);
	$("#player2Text").fadeIn(fadeInSpeed);
	if(player1HasSponsor)
	{
		$("#sponsorImgP1").show();

		$("#sponsorImgP1").fadeIn(fadeInSpeed);
	}

	if(player2HasSponsor)
	{
		$("#sponsorImgP2").show();
		$("#sponsorImgP2").fadeIn(fadeInSpeed);
	}
	$("#white").fadeIn(whiteFadeInSpeed);
	$("#tournament").fadeIn(fadeInSpeed);
	$("#round").fadeIn(fadeInSpeed);
	setTimeout("whiteFadeOut()", whiteFadeInSpeed);
}
$(document).ready(function() {
	updateInformation();
	$('#microphone').fadeOut(0);
	$('#flagIMGP1').fadeOut(0);
	$('#flagIMGP2').fadeOut(0);
	$("#sponsorImgP1").hide();
	$("#sponsorImgP2").hide();
	fades();
	setTimeout("flagFades()", fadeSpeed);
	setTimeout("enterAnimationEnd()", enterAnimationDuration);
	$("#uiLeft").hide();
	$("#uiRight").hide();
	$("#player1Text").hide();
	$("#player2Text").hide();
	$("#white").hide();
	$("#tournament").hide();
	$("#round").hide();
});