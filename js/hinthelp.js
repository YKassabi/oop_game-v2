class Hinthelp {
    askForHelp() {
        //loose one life for a letter maybe a already revieled
        //loose two lives for 100% chance to get new letter
        // keep Only on life, and get a stat about how many and whitch voyelle and consonnes there is.
        // simple cheat and reviel the phrase
    }
    /**
     * picked a random letter from raw phrase regardless if it  was already pick or not,
     * and cause one life
     */
    HintOneLetter50_50(p) { //guess one letter and it could be already displyed
        let currentPhrase = p.split("").filter(i => i != " ");
        return this.randomLetter(currentPhrase);
    }
    /**
     * picks one new letter been guessed and cause 2 lifes, 
     */
    HintOneLetter100() {
        let arrOfHiddenLetter = []
        document.querySelectorAll(".hide.letter").forEach(i => arrOfHiddenLetter.push(i.innerHTML));
        return this.randomLetter(arrOfHiddenLetter);
    }
    randomLetter(phraseArray) {
        let num = Math.floor(Math.random() * phraseArray.length);
        return phraseArray[num];
    }
    /**
     * 
     * help by displaying number of vowels and consones
     */
   
    phraseStat(p) {
        const voyelles = [..."aeiou"];
        const voyelleVsConsonne= {};
        let currentPhrase = phrase.phrase.split("").filter(i => i != " ")
        let detailedStat = currentPhrase.reduce((acc, currentValue) => {
            acc[currentValue] = acc[currentValue] ? (acc[currentValue] + 1) : 1
            return acc;
        }, {})
        for(let key in detailedStat){
            // console.log(key);
            if(voyelles.includes(key)){
                voyelleVsConsonne['voyelles'] = voyelleVsConsonne['voyelles'] ? (voyelleVsConsonne['voyelles'] + 1): 1;
            }else{
                voyelleVsConsonne["consones"] = voyelleVsConsonne["consones"] ? (voyelleVsConsonne["consones"]+1) : 1
            }
        }
        // console.log(detailedStat)
        // console.log(voyelleVsConsonne);
        return [voyelleVsConsonne,detailedStat];
    }
}