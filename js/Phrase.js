class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    /**
     * Display phrase on gameboard
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
     * Checks if passed letter is in included in the phrase
     */
    checkLetter(guessedletter) {
        let activePhr = game.activePhrase.toLowerCase();
        const phraseLetterArray = activePhr.split("").filter(i => i != " ");
        let letterWasCheacked = phraseLetterArray.includes(guessedletter);
        return letterWasCheacked;
    }

    /**
     * Displays passed letter on screen after a match is found
     */
    showMatchedLetter(l) {

        let letterToBeShown = game.activePhrase.toLowerCase().split("").find(i => i === l);
        let listOfDOMElementLetters = document.getElementsByClassName(letterToBeShown);
        for (let i = 0; i < listOfDOMElementLetters.length; i++) {
            listOfDOMElementLetters[i].className = "show letter " +  letterToBeShown;
        }
    }
}