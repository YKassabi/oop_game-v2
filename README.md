# oop_game-v2
phrase Hunter
______________________
** Game Features **


_ standard version
* guess a phrase, that was picked from a list.

_ 2 min version
* the same as the standard vertion just need to guess it right before 120 seconds.

_ E.U Capitals cities version
* the plyer need to guess what is the name of a Europian capital city.(list was grabed by API)

_All version comes with a helper, a hint options
* 1 letter for 1 life, just it could be already shown.
* 1 letter for 2 lives, just the letter was never revieled before.
* consonne and voyelles , rapport 0 lives.
* an easy option to just display the phrase.
___________________________

** the game is in modular formal, compose of : 4 major classes:**
* Game : handles the logic of verification and checking for win/loose
* Phrase : handles the resource, picking a phrase from a list and displaying it on the board
* Hinthelp: give hints, in form of letter or stats, 
* Chrono: helps with setting feature;timed for 2 min,  and calculate the duration of a winning game.

** Also two js files: **
* app that will be used for any UI interaction
* api that will be used for grabing the EU coutry information

** HTML && CSS   and assets **
