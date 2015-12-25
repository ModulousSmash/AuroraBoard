function updateInformation()
{
	$.get('http://127.0.0.1:8081/getCurrentValues', function (json) {
		$('#player1Text').text(json.Player1.name);
		$("#sponsorImgP1").attr('src', json.Player1.SponsorIcon);
		$('#player2Text').text(json.Player2.name);
		$('#player1Score').text(json.Player1.score.toString());
		$('#player2Score').text(json.Player2.score.toString());
		$("#sponsorImgP2").attr('src', json.Player2.SponsorIcon);
		$("#round").text(json.round);
		$("#casterText").text(json.caster);
		$("#streamerText").text(json.streamer);
		$("#tournamentName").text(json.tournamentName);
		$('#characterIMGP1').attr('src', "img/characters/" + json.Player1.character.icon);
		$('#characterIMGP2').attr('src', "img/characters/" + json.Player2.character.icon);
		$('#flagIMGP1').attr('src', "img/flags/" + json.Player1.flag.icon);
		$('#flagIMGP2').attr('src', "img/flags/" + json.Player2.flag.icon);
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
	setTimeout("updateInformation()", 50);
}
var nextFade = "caster";
var nextFlagFade = "country";
function fades()
{
	if(nextFade == "caster")
	{
		nextFade = "streamer"
		$('#microphone').fadeOut(1000, function() { fadeEnd(); });
		setTimeout("fades()", 10000);
	}
	else
	{
		nextFade = "caster"
		$('#streamer').fadeOut(1000, function() { fadeEnd(); });
		setTimeout("fades()", 10000);
	}
}
function flagFades()
{
	if(nextFlagFade == "country")
	{
		nextFlagFade = "character"
		$('#characterIMGP1').fadeOut(2000);
		$('#flagIMGP1').fadeIn(2000);
		$('#characterIMGP2').fadeOut(2000);
		$('#flagIMGP2').fadeIn(2000);
		setTimeout("flagFades()", 7000);
	}
	else
	{
		nextFlagFade = "country"
		$('#flagIMGP1').fadeOut(2000);
		$('#characterIMGP1').fadeIn(2000);
		$('#flagIMGP2').fadeOut(2000);
		$('#characterIMGP2').fadeIn(2000);
		setTimeout("flagFades()", 7000);
	}
}
function fadeEnd()
{
	if(nextFade == "caster")
	{
		$('#microphone').fadeIn(1000);
	}
	else
	{
		$('#streamer').fadeIn(1000);
	}
}
$(document).ready(function() {
	updateInformation();
	$('#microphone').fadeOut(0);
	$('#flagIMGP1').fadeOut(0);
	$('#flagIMGP2').fadeOut(0);
	fades();
	setTimeout("flagFades()", 3000);

});