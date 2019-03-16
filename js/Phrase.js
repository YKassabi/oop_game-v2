// eslint-disable-next-line no-unused-vars
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    /**
     * Display phrase on game board
     */
    addPhraseToDisplay() {
        let phraseToLetters = [...this.phrase];
        let htmlPhrase = ``;
        phraseToLetters.forEach((i) => {
            htmlPhrase += `<li class="hide ${i !== " " ? "letter": "space"} ${i}">${i}</li>`
        })
        document.getElementById('phrase').children[0].innerHTML = htmlPhrase;
    }

    /**
     * Checks if passed letter is in phrase
     * @-param (string) letter - Letter to check
     */
    checkLetter(guessedletter) {
        let activePhr = game.activePhrase.toLowerCase();
        const phraseLetterArray = activePhr.split("").filter(i => i != " ");

        let letterWasCheacked = phraseLetterArray.includes(guessedletter);
        return letterWasCheacked;
    }
    /**
     * Displays passed letter on screen after a match is found
     * @-param (string) letter - Letter to display
     */
    showMatchedLetter(l) {
        // reveals the letter on the board that matches the player selection.
        // To reveal the matching letter(s), select all of the letter DOM elements that have a CSS class name that matches the selected letter and
        // replace each selected element's `hide` CSS class with the `show` CSS class.

        let letterToBeShown = game.activePhrase.toLowerCase().split("").find(i => i === l);
        let listOfDOMElementLetters = document.getElementsByClassName(letterToBeShown);
        for (let i = 0; i < listOfDOMElementLetters.length; i++) {
            listOfDOMElementLetters[i].className = "show letter " +  letterToBeShown;
        }
    }
}




// Includes constructor that receives a phrase parameter and initializes a phrase property set to the phrase

// Includes addPhraseToDisplay() method which adds the phrase to the gameboard

// Includes checkLetter() method which checks if a letter is in the phrase

// Includes showMatchedLetter() method which reveals the letter(s) on the board that matches the player's selection