class Game {
    constructor() {
        this.missed = 0;
        /** custum notes
         * startGameWithCapitalCities bool & capitalList (array)
         * definition on the api.js, 
         */
        this.phrases = startGameWithCapitalCities ? capitalList : this.createPhrases();
        this.activePhrase = null;
    }

    /**
     * Creates phrases to be guessed
     * returns {array} An array of phrases thatcould be used in the game
     */
    createPhrases() {
        const listPhrases = [];
        listPhrases.push('life is ');
        listPhrases.push('Well Done is Better Than Well Said');
        listPhrases.push('Art is an emotion in motion');
        listPhrases.push('Beauty is in the eye of the beholder');
        listPhrases.push('Where there are tears there is hope');
        listPhrases.push('Live Long and Prosper');
        listPhrases.push('Have you tried turning it off and on again');
        listPhrases.push('veni vidi vici');
        return listPhrases;
    }

    /**
     * Begins game by selecting a random phrase and displaying it in UI
     * picks new phrase and initiliace new phrase , new Chrono, New Hinter
     */
    startGame() {
        document.getElementById('overlay').style.display = "none";
        this.activePhrase = this.getRandomPhrases();
        phrase = new Phrase(this.activePhrase);
        hint = new Hinthelp(); //hinthelp Class,
        time = new Chrono; // Chrono Class ,
        phrase.addPhraseToDisplay();
        /** 
         * for  testing // uncomment the next line to see the picked phrase in the console//
         */
        // console.log(`the current Phrase is : ${ phrase.phrase }`)
    }

    /**
     * picks a entry for a list;
     */
    getRandomPhrases() {
        let num = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[num];
    }

    /**
     * Handles onscreen keyboard button clicks
     * @-param (HTMLButtonElement) button - The clicked button element
     */
    handleInteraction(button) {
        // preparing the html code to be used for the feed back of the check
        const arr = document.querySelectorAll('.key');
        const trueArr = Array.prototype.slice.call(arr);
        //next 5 lines will generate an object with letter and it index.to be use for htmlcode array to grab the html tags, DOM Elements.
        const reducer = {};
        for (let i = 0; i < trueArr.length; i += 1) {
            reducer[trueArr[i].firstChild.nodeValue] = i;
        }
        let htmlcode = document.querySelectorAll('.key')[reducer[button]];
        //
        htmlcode.disabled = true;
        if (phrase.checkLetter(button)) {
            htmlcode.classList.add('chosen');
            phrase.showMatchedLetter(button);
            this.checkForWin();
        } else {
            htmlcode.classList.add('wrong');
            // the removeLife method will automatically call gameOver if player run out of life 'this.missed < 4 ', that s the only way to loose in strandard version.
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
            return true;
        } else {
            //Did not have to call gameOver, it s called from lost life.
            //maybe need  refactering,adding gameOver, to be easier in the timed featured.
            return false;
        }
    }

    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        const triesArray = document.getElementsByClassName('tries');//the hearts dom element
        this.missed < 4 ? triesArray[this.missed].firstChild.src = "../images/lostHeart.png" : this.gameOver(false);
        this.missed += 1;
    }

    /**
     * Displays game over message
     * @-param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(bool) {
        let backG = document.querySelector("#overlay");
        let title = document.querySelector("#game-over-message");
        let gameChronoDuration = time.msToTime();//will set the end of time for the game see Chrono.js
        backG.style.display = "block";
        if (bool) {//if it s a win
            //gameChronoDuration was set in Chrono.js file, (starting time) - (ending time)
            title.innerHTML = " NICE !! WELL DONE , the game lasted " + gameChronoDuration;
            // backG.classList = "win" ; //this was required by the assanement.uncomment it and comment the next line.
            backG.style.background= "linear-gradient( 45deg, blue, red )"

        } else {
            title.innerHTML = " Best Luck next time !";
            // backG.classList = "lose"; // was required, same as above
            backG.style.background = "linear-gradient( 45deg, black, white )"
        }
    }
}