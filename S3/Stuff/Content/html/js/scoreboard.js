var pollingSpeed = 1000;//in ms
var fadeSpeed = 3500; // in ms
var fadeAnimationSpeed = 500;
var informationBarSpeed = 6000;
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
		$('#characterIMGP1').attr('src', "img/characters/" + json.Player1.character.icon);
		$('#characterIMGP2').attr('src', "img/characters/" + json.Player2.character.icon);
		//flags
		$('#flagIMGP1').attr('src', "img/flags/" + json.Player1.flag.icon);
		$('#flagIMGP2').attr('src', "img/flags/" + json.Player2.flag.icon);
		//hide unnecesary stuff
		if(json.Player1.sponsor.name == 'None')
		{
			$('#sponsorImgP1').hide();
		}
		else
		{
			$('#sponsorImgP1').show();
			$("#sponsorImgP1").attr('src', 'img/sponsors/' + json.Player1.sponsor.icon);
		}
		if(json.Player2.sponsor.name == 'None')
		{
			$('#sponsorImgP2').hide();
		}
		else
		{
			$('#sponsorImgP2').show();
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
$(document).ready(function() {
	updateInformation();
	$('#microphone').fadeOut(0);
	$('#flagIMGP1').fadeOut(0);
	$('#flagIMGP2').fadeOut(0);
	fades();
	setTimeout("flagFades()", fadeSpeed);

});