/* eslint-disable no-undef */
/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
// eslint-disable-next-line no-unused-vars
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    /**
     * Display phrase on game board
     */
    addPhraseToDisplay() {
        // const p = this.phrase;
        let phraseToLetters = [...game.activePhrase];
        let htmlPhrase = ``;
        phraseToLetters.forEach((i) => {
            htmlPhrase += `<li class="hide ${i !== " " ? "letter": "space"} ${i}">${i}</li>`
            // htmlPhrase += `<li class="hide "letter" ${i}"></li>`
        })
        document.getElementById('phrase').children[0].innerHTML = htmlPhrase;
    }

    /**
     * Checks if passed letter is in phrase
     * @-param (string) letter - Letter to check
     */
    checkLetter(guessedletter) {
        // checks to see if the letter selected matches a letter in the phrase
        let activePhr = game.activePhrase.toLowerCase();
        console.log('_+_+_');
        const phraseLetterArray = activePhr.split("").filter(i => i != " ");
        // console.log(phraseLetterArrayRaw);

        let letterWasCheacked = phraseLetterArray.includes(guessedletter);
        console.log(letterWasCheacked);
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
        // console.log(listOfDOMElementLetters);
        for (let i = 0; i < listOfDOMElementLetters.length; i++) {
            // console.log(listOfDOMElementLetters[i]);
            listOfDOMElementLetters[i].className = "show letter " +  letterToBeShown;
        }
    }
}




// Includes constructor that receives a phrase parameter and initializes a phrase property set to the phrase

// Includes addPhraseToDisplay() method which adds the phrase to the gameboard

// Includes checkLetter() method which checks if a letter is in the phrase

// Includes showMatchedLetter() method which reveals the letter(s) on the board that matches the player's selection