// eslint-disable-next-line
let game, phrase;


document.getElementById('btn__reset').addEventListener('click', () => {
    resetAll()
    game = new Game;
    game.startGame()
})

const keyboard = document.getElementById("qwerty");
document.addEventListener('keyup', (e) => {
    // console.dir(e.keyCode)
    // console.log(document.querySelectorAll('.key'))
    const arr = document.querySelectorAll('.key');
    const trueArr = Array.prototype.slice.call(arr);
    console.log(trueArr);
    const reducer = {};
    for (let i = 0; i < trueArr.length; i += 1) {
        reducer[trueArr[i].firstChild.nodeValue] = i;
    }
    // console.log(reducer);
    // console.log(reducer[e.key]);

    let keyDOMElementKeyboard = document.querySelectorAll('.key')[reducer[e.key]];
    // console.log(keyDOMElementKeyboard);
    let letterPickedKeyboard = e.key;
// let keyDOMElementKeyboard = document.querySelector('key[2]')
    game.handleInteraction(letterPickedKeyboard, keyDOMElementKeyboard)
})

keyboard.addEventListener('click', (e) => {
    console.log(e)
    if (e.target.className == "key") {
        // console.log(e.target);
        let keyDOMElement = e.target;
        let letterPicked = e.target.innerHTML;
        console.log(keyDOMElement);
        game.handleInteraction(letterPicked, keyDOMElement);
    }
}, false)

/**
 * function helper for a reset
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