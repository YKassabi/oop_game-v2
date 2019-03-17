/////////////////////////////////////////////////////////////////////////////////////////
// time manipulation, working to calculate the duration of a party
// time manipulation, setting a 2min games
/////////////////////////////////////////////////////////////////////////////////////////

class Chrono {
    constructor() {
        this.timeOfStart = this.startGameChrono(); //stores t0, beginning
        this.game2min = 125; // time in seconds
    }

    /////////////////////////////////////////////////////////////////////////////////////////
    // useful methods to calculate the duration of the game.
    /**
     * simply getting the current time in seconds
     */
    startGameChrono() {
        let time = new Date();
        return time.getTime()
    }
    /**
     * will envoked at the end of the game,
     * returns a int of the difference in miliseconds
     */
    get runningTimeSinceGameStarted() {

        let startTime = this.timeOfStart;
        const currentTime = new Date();
        const difference = currentTime - startTime;
        return (difference);
    }
    /**
     * converting the milisecond into time minutes:seconds
     */
    msToTime() {
        let duration = this.runningTimeSinceGameStarted;
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return `${minutes} min  and   ${seconds} second(s) `;
    }

/////////////////////////////////////////////////////////////////////////////////////////
// the 2 min game chronometre,
/**
 * setinterval for every second, for 120 seconds;
 * need to check if the game is won, and call game.gameOver and clear the Timer.//1
 * if all the lives are lost, and call game.gameOver, and clear the Timer//2
 * otherwise need to display the time and display the result if number of lives is less than 5//3
 * && the 120 seonds passed. and clear the interval.
 */
    gameChronoTwoMin() {
        let myinterval;
        this.resetChrono(myinterval);
        let t = this.game2min;
        myinterval = setInterval(() => {
                if (game.checkForWin()) {//1
                    this.resetChrono(myinterval);
                    game.gameOver(game.checkForWin());
                } else {
                    if (game.missed === 5) {//2
                        console.log("missed 5 time")
                        game.gameOver(game.checkForWin());
                        this.resetChrono(myinterval);
                    } else if (t > 5 && !game.checkForWin()) {//3
                        document.querySelector('.chrono2minbutton').innerHTML = `<span style="color:red">${t-5} s</span>`
                        t -= 1;
                    } else if (t <= 5 && t > 0 && !game.checkForWin()) {//3
                        document.querySelector('h2.header').innerHTML = `<p style="background:lightgrey;color=lightblue;padding:2px;border-radius:10%">${game.activePhrase}</p>`;
                        console.log(game.activePhrase);
                        t -= 1;
                    } else {//3
                        document.querySelector('h2.header').innerHTML = `PHRASE HUNTER`;
                        game.checkForWin();
                        game.gameOver();
                        this.resetChrono(myinterval);
                    }
                }
            },
            1000);
    }
    /**
     * will reset the interval once it s called 
     */
    resetChrono(i) {
        clearInterval(i);
        document.querySelector('.chrono2minbutton').innerHTML = `2 min`;
        // console.log("it s cleared :)")//to test if all is good
    }



}