// eslint-disable-next-line
let game, phrase, hint;


document.getElementById('btn__reset').addEventListener('click', () => {
    resetAll();
    game = new Game;
    game.startGame();
})

const keyboard = document.getElementById("qwerty");
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

        let letterPickedKeyboard = e.key;
        game.handleInteraction(letterPickedKeyboard)
    }
})

keyboard.addEventListener('click', (e) => {
    console.log(e)
    if (e.target.className == "key") {
        // console.log(e.target);
        let letterPicked = e.target.innerHTML;
        game.handleInteraction(letterPicked);
    }
}, false)

/**
 * function helper for a reset te board
 */

let resetAll = () => {
    document.getElementById('phrase').children[0].innerHTML = ``;
    document.querySelectorAll('.key').forEach(element => {
        element.className = "key"
        element.disabled = false;
    });

    Array.prototype.forEach.call(document.getElementsByClassName('tries'), element => {
        element.firstChild.src = "/images/liveHeart.png"
    });
}
//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////custimization // a hint 
//option1 : 1 L  for one live ,but the letter could be already shown
document.querySelector('button.option1').addEventListener('click', () => {
    let allLettersDOMELements = document.getElementsByClassName("letter");
let shownLettersDOMELements = document.getElementsByClassName("show");
    let l = hint.HintOneLetter50_50(game.activePhrase);
    if ((allLettersDOMELements.length - 2) > shownLettersDOMELements.length) {
        game.removeLife();
        const arr = document.querySelectorAll('.key');
        const trueArr = Array.prototype.slice.call(arr);
        const reducer = {};
        for (let i = 0; i < trueArr.length; i += 1) {
            reducer[trueArr[i].firstChild.nodeValue] = i;
        }
        game.handleInteraction(l)

    }
})
// for 2 lives , it s unrevealed letter but it cost 2 lives, 
document.querySelector('button.option2').addEventListener('click', () => {
    let allLettersDOMELements = document.getElementsByClassName("letter");
let shownLettersDOMELements = document.getElementsByClassName("show");
    let l = hint.HintOneLetter100();
    if ((allLettersDOMELements.length - 2) > shownLettersDOMELements.length) {
        game.handleInteraction(l)
        game.removeLife();
        game.removeLife();
    }
})
// will display a statistic of the redundancy of a letter in the current instance
document.querySelector('button.option3').addEventListener('click', () => {
    let a = hint.phraseStat(game.activePhrase);
    let HTMLCodeHint=``;
    for(let key in a[1]){
        HTMLCodeHint += ` <p> The letter  < <strong>${key.toUpperCase()}</strong>  > is repeated  ${a[1][key] > 1 ? (a[1][key] +' times') : 'only one time'}.`;
    }
    document.querySelector('.displayOption3').innerHTML = HTMLCodeHint;

})
// just display the phrase on the bottom of the phrase.
document.querySelector('button.option4').addEventListener('click', () => {
    document.querySelector('.displayOption3').innerHTML = game.activePhrase;
})