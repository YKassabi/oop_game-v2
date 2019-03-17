/////////////////////////////////////////////////////////////////////////////////////////
//loose one life for a letter maybe a already revieled
//loose two lives for 100% chance to get new letter
// keep Only on life, and get a stat about how many and whitch voyelle and consonnes there are.
// simply cheat and reviel the phrase
/////////////////////////////////////////////////////////////////////////////////////////
class Hinthelp {
    /**
     * picked a random letter from raw phrase regardless if it  was already pick or not.
     */
    HintOneLetter50_50(p) { //guess one letter and it could be already displayed
        let currentPhrase = p.split("").filter(i => i != " ");
        return this.randomLetter(currentPhrase);
    }

    /**
     * picks one new letter  never been guessed.
     */
    HintOneLetter100() {
        let arrOfHiddenLetter = []
        document.querySelectorAll(".hide.letter").forEach(i => arrOfHiddenLetter.push(i.innerHTML));
        return this.randomLetter(arrOfHiddenLetter);
    }

    /**
     * random letter generator
     * may need refactoring the same functionality is on phrase Class
     */
    randomLetter(phraseArray) {
        let num = Math.floor(Math.random() * phraseArray.length);
        return phraseArray[num];
    }
    /**
     * 
     * help by displaying number of vowels and consones
     */

    phraseStat() {
        const voyelles = [..."aeiou"];
        const voyelleVsConsonne = {};//{voyelles:2,consonnes:5}
        let currentPhrase = phrase.phrase.split("").filter(i => i != " ");
        // variable object, will display how many letter is repeared, how many times{a:2, d:1, e:1....}
        // it s computed but never user yet,
        // may be use in future features.
        let detailedStat = currentPhrase.reduce((acc, currentValue) => {
            acc[currentValue] = acc[currentValue] ? (acc[currentValue] + 1) : 1
            return acc;
        }, {})
        for (let key in detailedStat) {
            // console.log(key);
            if (voyelles.includes(key)) {
                voyelleVsConsonne['voyelles'] = voyelleVsConsonne['voyelles'] ? (voyelleVsConsonne['voyelles'] + 1) : 1;
            } else {
                voyelleVsConsonne["consones"] = voyelleVsConsonne["consones"] ? (voyelleVsConsonne["consones"] + 1) : 1
            }
        }
        return [voyelleVsConsonne, detailedStat];//
    }
}