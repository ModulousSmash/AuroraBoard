# AuroraBoard
AuroraBoard is a UI overlay for competitive videogames, it's been mainly designed for competitive fighting games. It runs on top of your favorite streaming software that supports loading webpages, for example OBS or XSplit.
AuroraBoard's default UI is made for netplay tournaments featuring one camera space for commentary, however this can easily be modified, the default UI is also made to be tintable, which means you can set the color of the UI from the software itself, all of this of course, can be customized without limits.

In the default UI there are two animated parts, the character icons that regularly change into the flag of the player and back and the lower right corner where the streamer name fades to the name of whoever is doing the commentary.
## Screenshots
![](http://i.imgur.com/aLwu2ka.png)

![](http://i.imgur.com/z13cXEv.jpg)

## Installing

Installing AuroraBoard is simple, after you download the software and run it you can fill in your data, in the settings menu you can also set the port the program uses to communicate and optionally enable the UI tinting with the HEX color you want.

After you are done configuring the software you can save all your settings with the file menu.

Once you   hit Start Server, a URL will appear in the program, this is the URL you must point your streaming software to in order to embed the UI.

## Modifying the characters, flags and player sponsors
Character, flags and sponsors are saved in three different folders, you will find them under Content\html\img.

After you add your flag to the folder you must also add it to the corresponding .json file, characters.json, flags.json or sponsors.json.
## Adding your own sponsors, logos etc...
Using scoreboard.psd as a base you can overlay your own logos over the stream UI, this is done by editing the file Content\img\nocolor\sponsor.png

## Building
Build  the software normally and then copy the files in the S3/Stuff folder to where the S3.exe has been compiled, this will serve as a starting point.