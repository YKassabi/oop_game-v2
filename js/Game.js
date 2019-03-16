/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
     * Creates phrases to be guessed
     * returns {array} An array of phrases thatcould be used in the game
     */
    createPhrases() {
        const listPhrases = [];
        listPhrases.push('life is ');
        // listPhrases.push('Well Done is Better Than Well Said');
        // listPhrases.push('Art is an emotion in motion');
        // listPhrases.push('Beauty is in the eye of the beholder');
        // listPhrases.push('Where there is tears there is hope');
        // listPhrases.push('Live Long and Prosper');
        // listPhrases.push('Have you tried turning it off and on again');
        listPhrases.push('veni vidi vici');
        return listPhrases;

    }
    getRandomPhrases() {
        let num = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[num];
    }

    /**
     * Begins game by selecting a random phrase and displaying it to user
     */
    startGame() {
        document.getElementById('overlay').style.display = "none";
        this.activePhrase = this.getRandomPhrases();
        phrase = new Phrase(this.activePhrase);
        hint = new Hinthelp();//hinter section

        phrase.addPhraseToDisplay();
        /** 
         * for corrector testing// will display the phrase on the console
         */
        console.log(phrase)
    }
    /**
     * Handles onscreen keyboard button clicks
     * @-param (HTMLButtonElement) button - The clicked button element
     */

    // handleInteraction(button, htmlcode) {
    handleInteraction(button) {
        ////
        const arr = document.querySelectorAll('.key');
        const trueArr = Array.prototype.slice.call(arr);
        const reducer = {};
        for (let i = 0; i < trueArr.length; i += 1) {
            reducer[trueArr[i].firstChild.nodeValue] = i;
        }
        // console.log(reducer);
        let htmlcode = document.querySelectorAll('.key')[reducer[button]];
        // console.log(htmlcode)
        
        ////
        htmlcode.disabled = true;
        if (phrase.checkLetter(button)) {
            htmlcode.classList.add('chosen');
            phrase.showMatchedLetter(button);
            this.checkForWin();
        } else {
            htmlcode.classList.add('wrong');
            // the removeLife method will automatically call gameOver if player run out of life, that s the only way to loose.
            this.removeLife();
        }
    }
    /**
    * Checks for winning move
    * @-return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        let allLettersDOMELements = document.getElementsByClassName("letter");
        let shownLettersDOMELements = document.getElementsByClassName("show");

        if (allLettersDOMELements.length === shownLettersDOMELements.length) {
            this.gameOver(true);
        }
    }
    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {

        const triesArray = document.getElementsByClassName('tries');
        this.missed < 4 ? triesArray[this.missed].firstChild.src = "/images/lostHeart.png" : this.gameOver(false);
        this.missed += 1;
    }
    /**
     * Displays game over message
     * @-param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(bool) {
        // will display the original start screen and update updates the overlay `h1` element with a
        // friendly win or loss message, and replaces the overlay’s `start` CSS class with
        // either the `win` or `lose` CSS class.

        document.getElementById('overlay').style.display = "block";
        let title = document.querySelector("#game-over-message");
        let backG = document.querySelector("#overlay")
        if (bool) {
            title.innerHTML = " NICE !! WELL DONE ";
            backG.style.background = "linear-gradient( 45deg, blue, red )"

        } else {
            title.innerHTML = " 🤪 Best Luck next time !"
            backG.style.background = "linear-gradient( 45deg, black, white )"
        }
    }
}












// Includes a constructor that initializes a missed property set to 0, a phrases property set to an array of five Phrase objects, and an activePhrase property set to null initially

// Phrases added to the game only include letters and spaces
//////////////////
// Includes startGame() method that hides the start screen overlay, sets the activePhrase property to a random phrase, and calls the addPhraseToDisplay() method on the active phrase

// Includes getRandomPhrase() method that randomly retrieves one phrase from the phrases array

// Includes handleInteraction() method that:

// Disables the selected letter's onscreen keyboard button
// If the phrase does not include the guessed letter, the wrong CSS class is added to the selected letter's keyboard button and the removeLife() method is called
// If the phrase includes the guessed letter, the chosen CSS class is added to the selected letter's keyboard button, the showMatchedLetter() method is called on the phrase, and the checkForWin() method is called. If the player has won the game, the gameOver() method is called
// Includes checkForWin() method that checks if the player has revealed all of the letters in the active phrase

// Includes a removeLife() method that removes a life from the scoreboard (one of the liveHeart.png images is replaced with a lostHeart.png image), increments the missed property, and if the player has lost the game calls the gameOver() method

// Includes gameOver() method that displays a final "win" or "loss" message by showing the original start screen overlay styled with either the win or lose CSS class