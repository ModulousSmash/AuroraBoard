# AuroraBoard
AuroraBoard is a UI overlay for competitive videogames, it's been mainly designed for competitive fighting games. It runs on top of your favorite streaming software that supports loading webpages, for example OBS or XSplit.
AuroraBoard's default UI is made for presential tournaments featuring two cameras players, however this can easily be modified, the default UI is also made to be tintable, which means you can set the color of the UI from the software itself, all of this of course, can be customized without limits.

The default UI also includes Melee stuff, including but not limited to a picture of the king of the mews.

In the default UI there are two animated parts, the character icons that regularly change into the flag of the player and back and the lower right corner where the streamer name fades to the name of whoever is doing the commentary.
## Screenshots
![](http://i.imgur.com/aLwu2ka.png)

![](http://i.imgur.com/xuOvFzo.jpg)

## Installing

#OBS

Run the program, set it up and then click start server, a URL will appear, copy it to your clipboard.

Install the CLR Browser plugin and add the source to your scene.

![](http://i.imgur.com/OffF67T.png)

Make the dimensions be 1920x1080 and paste the URL that the program gives you.

![](http://i.imgur.com/Z8mzZyW.png)

Hit ok, and you are done.

![](http://i.imgur.com/RpTZ4Dw.png)

Optionally, if you are going to customize, to make testing easier enable advanced properties and disable ApplicationCache and PageCach, this will prevent OBS from caching the stream images so you can test tints and stuff.

#XSplit
Although OBS is the recommended software XSplit works too.

First add the Webpage URL source.

![](http://i.imgur.com/4VPl84d.png)

Paste the URL that software gives you

![](http://i.imgur.com/hKSOQ3l.png)

Hit ok, and in the source settings disable scrollbars and set the resolution to a 1920x1080.



![](http://i.imgur.com/Cnch0yY.png)

And you are done.

![](http://i.imgur.com/Rv6ZLwg.jpg)

## Modifying the characters, flags and player sponsors
Character, flags and sponsors are saved in three different folders, you will find them under Content\html\img.

After you add your flag to the folder you must also add it to the corresponding .json file, characters.json, flags.json or sponsors.json.

## Adding your own sponsors, logos etc...
Using scoreboard.psd as a base you can overlay your own logos over the stream UI, this is done by editing the file Content\img\nocolor\sponsor.png

## Building
Build  the software normally and then copy the files in the S3/Stuff folder to where the S3.exe has been compiled, this will serve as a starting point.