// eslint-disable-next-line
let game, phrase, hint, time;
/////////////////////////////////////////////////////////////////////////////////////////
//reusable code
/////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener('load', () => {
    displayHideAndShow();//preparing the UI,hiding the extra featurs
});

let resetAll = () => {
    document.getElementById('phrase').children[0].innerHTML = ``;
    document.querySelectorAll('.key').forEach(element => {
        element.className = "key"
        element.disabled = false;
    });

    Array.prototype.forEach.call(document.getElementsByClassName('tries'), element => {
        element.firstChild.src = "/images/liveHeart.png"
    });
    //next 2 lines are for extra featured
    displayHideAndShow();//all Extra reset
    startGameWithCapitalCities = false;// see api.js

}

let domInteraction = function (theSelector, messageTobeDisplayed) {
    document.querySelector(theSelector).innerHTML = messageTobeDisplayed
}


/////////////////////////////////////////////////////////////////////////////////////////
// Functional and Featured code : the standard Version.
/////////////////////////////////////////////////////////////////////////////////////////
/**
 * inititing a new game, and recording time(t0)
 */
document.getElementById('btn__reset').addEventListener('click', () => {
    resetAll();
    game = new Game;
    game.startGame();
    time.startGameChrono();
})

/////////////////////////////////////////////////////////////////////////////////////////
// using the keyboard UI

/**
 * On Screen Keyboard interaction
 */
document.getElementById("qwerty").addEventListener('click', (e) => {
    if (e.target.className == "key") {
        let letterPicked = e.target.innerHTML;
        game.handleInteraction(letterPicked);
    }
}, false)
/////////////////////////////////////////////////////////////////////////////////////////
// using the OI keyboard (physical)

/**
 * Physical Keyboard interaction 
 */
document.addEventListener('keyup', (e) => {
    if (!document.querySelector('#overlay').getAttribute('style')) { // null or display:none
        if (e.keyCode === 13) {
            resetAll();
            game = new Game;
            game.startGame();
        }
    } else {
        if (e.keyCode >= 65 && e.keyCode <= 90) { // keycode 65 to 90 are the alphabets lowercap
            let letterPickedKeyboard = e.key;
            game.handleInteraction(letterPickedKeyboard)
        }
    }
}, false)


/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////
//  EXTRA Feature : adding hinter to the game on all version.
//  EXTRA Feature : adding chronometre, computing the duration of a won game,
//  EXTRA Feature : adding timer, limiting the duration of a party to 2 min.
//  EXTRA Feature : calling on API to grab E.U. Capitals , to provide a list,
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////
// reusable code for all Extras

/**
 * will hide all the unrelavent UI to reset to the original view.
 */
let displayHideAndShow = () => {
    document.querySelector('#hinter').style.display = "none";
    document.querySelector('.chrono2minbutton').style.display = 'none';
    domInteraction('.buttonHelp', 'Hint');
    domInteraction('.displayOption', '');
    domInteraction('h2.header', 'PHRASE HUNTER');
}
/////////////////////////////////////////////////////////////////////////////////////////
// Hinter Section
/**
 * the hint button will togle the section of hint
 */
document.querySelector('.buttonHelp').addEventListener('click', () => {
    let el = document.querySelector('#hinter');
    if (el.style.display == 'none') {
        el.style.display = 'block'
    } else {
        el.style.display = "none"
    }
})


/////////////////////////////////////////////////////////////////////////////////////////
// there are 4 options of hint; by clicking on the option's button, you get a hint, 
//you may loose or not a life, that s depend on the option
//see hintHelp.js

/**
 * option 1 : One Letter  for one life ,but the letter could be already shown, 
 * it s less than 100% chance, exept in the first try.
 * will add letter automatically to the board.
 * with 2 letter to guess or 1 life reming no more hint
 */
document.querySelector('button.option1').addEventListener('click', () => {
    let allLettersDOMELements = document.getElementsByClassName("letter");
    let shownLettersDOMELements = document.getElementsByClassName("show");
    let l = hint.HintOneLetter50_50(game.activePhrase);

    if ((allLettersDOMELements.length - 2) > shownLettersDOMELements.length && game.missed < 4) {
        game.removeLife();
        const arr = document.querySelectorAll('.key');
        const trueArr = Array.prototype.slice.call(arr);
        const reducer = {};
        for (let i = 0; i < trueArr.length; i += 1) {
            reducer[trueArr[i].firstChild.nodeValue] = i;
        }
        game.handleInteraction(l)
        domInteraction('.buttonHelp', `<span style='color:red'> ${l.toUpperCase()} </span>`);
    } else {
        domInteraction('.displayOption', `<span style='color:red'> You can not ask for new a letter if you have only one life left or there is 2 letters to be guessed </span>`)

    }
});

/**
 * option 2 : One Letter  for tow lives ,but the letter will 100% never revieled
 * will add letter automatically to the board.
 * with 2 letter to guess or 1 life reming no more hint
 */
document.querySelector('button.option2').addEventListener('click', () => {
    let allLettersDOMELements = document.getElementsByClassName("letter");
    let shownLettersDOMELements = document.getElementsByClassName("show");
    let l = hint.HintOneLetter100();
    if ((allLettersDOMELements.length - 2) > shownLettersDOMELements.length && game.missed < 4) {
        game.handleInteraction(l)
        game.removeLife();
        game.removeLife();
        domInteraction('.buttonHelp', `<span style='color:red;backgorund:black'> ${l.toUpperCase()} </span>`)
    } else {
        domInteraction('.displayOption', `<span style='color:red'> You can not ask for new a letter if you have only one life left or there is 2 letters to be guessed </span>`)
    }
})

/**
 * option 3 : will display a redundancy of a consonnes and voyelles in the current instance
 * will display it on the top of the hint section.
 */

document.querySelector('button.option3').addEventListener('click', () => {
    let a = hint.phraseStat(game.activePhrase);
    let HTMLCodeHint = ``;
    for (let key in a[0]) {
        HTMLCodeHint += ` <p>   < <strong>${key.toUpperCase()}</strong>  >   ${a[0][key] > 1 ? ('are repeated ' + a[0][key] +' times') : 'is repeatedonly one time'}.`;
    }
    domInteraction('.displayOption', HTMLCodeHint);

})
/**
 * option 4 : will show the phrase like it.
 *  * will display it on the top of the hint section.
 */
document.querySelector('button.option4').addEventListener('click', () => {
    domInteraction('.displayOption', game.activePhrase);
})

/////////////////////////////////////////////////////////////////////////////////////////
// Time Manipulation Section
/////////////////////////////////////////////////////////////////////////////////////////
// Setting a challaging guess game no more than 2 min. in response to click on the button 2'Game Chrono
document.querySelector('#button2min').addEventListener('click', () => {
    resetAll();
    document.querySelector('.chrono2minbutton').style.display = 'block';//will show the cercular button.for the countdown
    domInteraction('h2.header', 'Hunt it!! in 2 min');
    game = new Game;
    game.startGame();
    //next 2 lines see Chrono.js for declations and logic.
    time.startGameChrono();
    time.gameChronoTwoMin();
})

/////////////////////////////////////////////////////////////////////////////////////////
// E.U Capitales for a hunt.
//see api.js for function definition
document.querySelector('#ButtonCapitalCities').addEventListener('click', () => {
    resetAll();
    startGameWithCapitalCities = true;//will be used to choose a list in game.phrase in the game.js
    game = new Game;
    game.startGame();
    time.startGameChrono();
    domInteraction('h2.header', 'EU Capital City');
    //next 2 line will be used for hint, founding the key contry abrevation of 3 letter.
    const key = Object.keys(CountryCapitalObj).find(key => CountryCapitalObj[key] == game.activePhrase);
    domInteraction('.displayOption', `${key}`);
}, false)