"use strict;"
import { randInt, randElem } from "../helper.js";



// ---------------------------
// - - - - - CLASSES - - - - -
// ---------------------------

class NounPair {
    hasPlural;
    singular;
    plural;

    constructor(singular, plural = "default") {
        this.singular = singular;

        if (plural == "default" || singular == plural) {
            this.plural = singular;
            this.hasPlural = false;
        }
        else {
            this.plural = plural;
            this.hasPlural = true;
        }
    
        Object.defineProperties(this, {
            "full":      { 
                get()  { 
                    if (hasPlural)
                        return `${this._singular} / ${this._plural}`; 
                    else
                        return this._singular;
        }}});
    }

    compareTo(other) {
        return singular.compareTo(other.singular);
    }
}

class WordFamily {
    name;
    items;

    constructor(name) {
        this.name = name;
        this.items = [];
    
        Object.defineProperties(this, {
            "count": { get() { items.count; } }
        });
    }
}

class EdgyName {
    style;
    tempAdj;
    tempNounA;
    tempNounB;

    constructor(firstWord, secondWord, style) {
        this.style = style;

        if (style == "AdjNoun") {
            this.tempAdj = firstWord;
            this.tempNounB = secondWord;
        }
        else {
            this.tempNounA = firstWord;
            this.tempNounB = secondWord;
        }
    
        Object.defineProperties(this, {
            "firstWord": {
                get() {
                    if (this.style == "AdjNoun") { return this._tempAdj;   }
                    else                         { return this._tempNounA; }
                },
                set(val) {
                    if (this.style == "AdjNoun") { this.tempAdj = val; }
                    else                    { this.tempNounA = val; }
                }
            },
            "secondWord": {
                get()    { return this.tempNounB;    },
                set(val) { this.tempNounB = val;    }
            },
            "full": {
                get() {
                        if (this.style == "AdjNoun")       { return `${this.tempAdj} ${this.tempNounB.singular}`;              }
                        else if (this.style == "NounNoun") { return `${this.tempNounA.singular} ${this.tempNounB.singular}`;   }
                        else if (this.style == "PosNoun")  { return `${this.tempNounA.singular}'s ${this.tempNounB.singular}`; }
                }
            }
        });
    }

    cycleStyle() {
        if (this.style == "NounNoun")     { this.style = "PosNoun";  }
        else if (this.style == "PosNoun") { this.style = "NounNoun"; }
    }

    swapNouns() {
        if (this.style != "AdjNoun") {
            let extremelyTempNoun = this.tempNounA;
            this.tempNounA = this.tempNounB;
            this.tempNounB = extremelyTempNoun;
        }
    }
}

class EdgyTitle {
    style;
    tempAdj;
    tempNounA;
    tempNounB;

    constructor(firstWord, secondWord, style) {
        this.style = style;

        if (style == "TheAdjNoun") {
            this.tempAdj = firstWord;
            this.tempNounB = secondWord;
        }
        else if (style == "NounOfTheAdj") {
            this.tempNounA = firstWord;
            this.tempAdj = secondWord;
        }
        else {
            this.tempNounA = firstWord;
            this.tempNounB = secondWord;
        }
    
        Object.defineProperties(this, {
            "firstWord": {
                get() {
                    if (this.style == "TheAdjNoun") { return this.tempAdj;   }
                    else                            { return this.tempNounA; }
                },
                set(val) {
                    if (this.style == "TheAdjNoun") { this.tempAdj = val; }
                    else                            { this.tempNounA = val; }
                }
            },
            "secondWord": {
                get() {
                    if (this.style == "NounOfTheAdj") { return this.tempAdj;   }
                    else                              { return this.tempNounB; }
                },
                set(val) {
                    if (this.style == "NounOfTheAdj") { this.tempAdj = val;   }
                    else                              { this.tempNounB = val; }
                }
            },
            "full": {
                get() {
                    switch (this.style) {
                        case "TheAdjNoun":
                            return `The ${this.tempAdj} ${this.tempNounB.singular}`;
    
                        case "TheNounNoun":
                            return `The ${this.tempNounA.singular} ${this.tempNounB.singular}`;
    
                        case "ThePosNoun":
                            if (this.tempNounA.hasPlural)  { return `The ${this.tempNounA.singular}'s ${this.tempNounB.singular}`; }
                            else                           { return `${this.tempNounA.singular}'s ${this.tempNounB.singular}`;     }
    
                        case "NounOfTheNoun":
                            if (this.tempNounB.hasPlural)  { return `${this.tempNounA.singular} of the ${this.tempNounB.singular}`; }
                            else                           { return `${this.tempNounA.singular} of ${this.tempNounB.singular}`;     }
    
                        case "TheNounOfTheNoun":
                            if (this.tempNounB.hasPlural)  { return `The ${this.tempNounA.singular} of the ${this.tempNounB.singular}`; }
                            else                           { return `The ${this.tempNounA.singular} of ${this.tempNounB.singular}`;     }
    
                        case "NounOfPlur":
                            if (this.tempNounB.hasPlural)  { return `${this.tempNounA.singular} of ${this.tempNounB.plural}`;   }
                            else                           { return `${this.tempNounA.singular} of ${this.tempNounB.singular}`; }
    
                        case "NounOfThePlur":
                            if (this.tempNounB.hasPlural)  { return `${this.tempNounA.singular} of the ${this.tempNounB.plural}`;   }
                            else                           { return `${this.tempNounA.singular} of the ${this.tempNounB.singular}`; }
    
                        case "TheNounOfPlur":
                            if (this.tempNounB.hasPlural)  { return `The ${this.tempNounA.singular} of ${this.tempNounB.plural}`;   }
                            else                           { return `The ${this.tempNounA.singular} of ${this.tempNounB.singular}`; }
    
                        case "NounOfTheAdj":
                            return `${this.tempNounA.singular} of the ${this.tempAdj}`;
                    }
                }
            }
        });
    }

    cycleStyle() {
        if (this.style == "TheAdjNoun") {
            this.tempNounA = this.tempNounB;
            this.tempNounB = null;
            this.style = "NounOfTheAdj";
        }
        else if (this.style == "NounOfTheAdj") {
            this.tempNounB = this.tempNounA;
            this.tempNounA = null;
            this.style = "TheAdjNoun";
        }
        else if (this.style == "TheNounNoun")      { this.style = "ThePosNoun";       }
        else if (this.style == "ThePosNoun")       { this.style = "NounOfTheNoun";    }
        else if (this.style == "NounOfTheNoun")    { this.style = "TheNounOfTheNoun"; }
        else if (this.style == "TheNounOfTheNoun") { this.style = "NounOfPlur";       }
        else if (this.style == "NounOfPlur")       { this.style = "NounOfThePlur";    }
        else if (this.style == "NounOfThePlur")    { this.style = "TheNounOfPlur";    }
        else if (this.style == "TheNounOfPlur")    { this.style = "TheNounNoun";      }
    }

    swapNouns() {
        if (this.style != "TheAdjNoun" && this.style != "NounOfTheAdj") {
            let extremelyTempNoun = this.tempNounA;
            this.tempNounA = this.tempNounB;
            this.tempNounB = extremelyTempNoun;
        }
    }
}



// ---------------------------
// - - - - - VARIABLES - - - - 
// ---------------------------

const adjFams = [];
const nounFams= [];
const edgyRoot = document.querySelector("#edgy").shadowRoot;
const nameElem = edgyRoot.querySelector("#edgy-name");
const titleElem = edgyRoot.querySelector("#edgy-title");
let edgyName = new EdgyName(new NounPair("Shadow", "Shadows"), new NounPair("Demise"), "PosNoun");
let edgyTitle = new EdgyTitle(new NounPair("Prince", "Princes"), new NounPair("Darkness"), "NounOfTheNoun");



// -------------------------------
// - - - - - MAIN SCRIPT - - - - -
// -------------------------------

init();



// -----------------------------------
// - - - - - EVENT LISTENERS - - - - -
// -----------------------------------

edgyRoot.querySelector("#edgy-random-btn").onclick = () => { 
    edgyName = genEdgyName();
    edgyTitle = genEdgyTitle();
    updateButtons();
    nameElem.innerHTML = edgyName.full;
    titleElem.innerHTML = edgyTitle.full;
};
edgyRoot.querySelector("#edgy-name-random-btn").onclick = () => { 
    edgyName = genEdgyName();
    updateButtons();
    nameElem.innerHTML = edgyName.full;
};
edgyRoot.querySelector("#edgy-title-random-btn").onclick = () => { 
    edgyTitle = genEdgyTitle();
    updateButtons();
    titleElem.innerHTML = edgyTitle.full;
};
edgyRoot.querySelector("#edgy-name-a-random-btn").onclick = () => {
    if (edgyName.style == "AdjNoun")
        edgyName.firstWord = randElem(randElem(adjFams).items);
    else
        edgyName.firstWord = randElem(randElem(nounFams).items);

    nameElem.innerHTML = edgyName.full;
};
edgyRoot.querySelector("#edgy-name-b-random-btn").onclick = () => { 
    edgyName.secondWord = randElem(randElem(nounFams).items);

    nameElem.innerHTML = edgyName.full;
};
edgyRoot.querySelector("#edgy-title-a-random-btn").onclick = () => {
    if (edgyTitle.style == "TheAdjNoun")
        edgyTitle.firstWord = randElem(randElem(adjFams).items);
    else
        edgyTitle.firstWord = randElem(randElem(nounFams).items);

    titleElem.innerHTML = edgyTitle.full;
};
edgyRoot.querySelector("#edgy-title-b-random-btn").onclick = () => {
    if (edgyTitle.style == "NounOfTheAdj")
        edgyTitle.secondWord = randElem(randElem(adjFams).items);
    else
        edgyTitle.secondWord = randElem(randElem(nounFams).items);
    
    titleElem.innerHTML = edgyTitle.full;
};

edgyRoot.querySelector("#edgy-name-cycle-btn").onclick = () => {
    edgyName.cycleStyle();
    updateButtons();
    nameElem.innerHTML = edgyName.full;
};
edgyRoot.querySelector("#edgy-title-cycle-btn").onclick = () => {
    edgyTitle.cycleStyle();
    updateButtons();
    titleElem.innerHTML = edgyTitle.full;
};

edgyRoot.querySelector("#edgy-name-swap-btn").onclick = () => {
    edgyName.swapNouns();
    nameElem.innerHTML = edgyName.full;
};
edgyRoot.querySelector("#edgy-title-swap-btn").onclick = () => {
    edgyTitle.swapNouns();
    titleElem.innerHTML = edgyTitle.full;
};



// -----------------------------
// - - - - - FUNCTIONS - - - - -
// -----------------------------

function init() {
    loadAdjs();
    loadNouns();
    nameElem.innerHTML = edgyName.full;
    titleElem.innerHTML = edgyTitle.full;
}

function loadAdjs() {
    const url = "media/projects/edgy_name_generator/edgy-adjs.csv";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => { 
        const text = e.target.responseText;

        const lines = text.split("\r\n");
        for (let line of lines) {
            line = line.split(",");
            let newFam = new WordFamily(line[0]);

            for (let i = 2; i < line.length; i++)
                newFam.items.push(line[i]);

            adjFams.push(newFam);
        }
    };
    
    // These are important
    xhr.open("GET", url);
    xhr.send();
};

function loadNouns() {
    const url = "media/projects/edgy_name_generator/edgy-nouns.csv";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => { 
        const text = e.target.responseText;

        const lines = text.split("\r\n");
        for (let line of lines) {
            line = line.split(",");
            let newFam = new WordFamily(line[0]);

            for (let i = 2; i < line.length; i++) {
                let splitLine = line[i].split("/");
                let newNoun = new NounPair(splitLine[0], splitLine[1]);
                newFam.items.push(newNoun);
            }

            nounFams.push(newFam);
        }
    };
    
    // These are important
    xhr.open("GET", url);
    xhr.send();
};

function updateButtons(){
    if (edgyName.style == "AdjNoun") {
        edgyRoot.querySelector("#edgy-name-swap-btn").disabled = true;
        edgyRoot.querySelector("#edgy-name-cycle-btn").disabled = true;
    }
    else {
        edgyRoot.querySelector("#edgy-name-swap-btn").disabled = false;
        edgyRoot.querySelector("#edgy-name-cycle-btn").disabled = false;
    }

    if (edgyTitle.style == "TheAdjNoun" || edgyTitle.style == "NounOfTheAdj")
        edgyRoot.querySelector("#edgy-title-swap-btn").disabled = true;
    else
        edgyRoot.querySelector("#edgy-title-swap-btn").disabled = false;
}

// Make sure vocab is loaded before you use this???
function genEdgyName() {
    // Legend:
    // ADJ  - Adjective
    // SING - Singular noun (hasPlural == true)
    // NOUN - Singular noun (hasPlural == false)

    // All possible combinations:
    // ADJ SING - ADJ NOUN
    // SING SING - SING NOUN - SING's SING - SING's NOUN
    // NOUN SING - NOUN NOUN - NOUN's SING - NOUN's NOUN

    // All of these are used at some point
    let famA;
    let famN;
    let tempAdj;
    let tempNounA;
    let tempNounB;

    let roll = randInt(2); // Roll a D2
    // The name building tree
    switch (roll) {
        case 1:
            // Generate first word
            famA = randElem(adjFams);
            tempAdj = randElem(famA.items);

            // Generate second word
            famN = randElem(nounFams);
            tempNounB = randElem(famN.items);

            // Construct full title
            return new EdgyName(tempAdj, tempNounB, "AdjNoun");

        case 2:
            // Generate first word
            famN = randElem(nounFams);
            tempNounA = randElem(famN.items);

            // Generate second word
            famN = randElem(nounFams);
            tempNounB = randElem(famN.items);

            // Construct full title
            roll = randInt(3); // Roll a D3
            if (roll == 1)
                return new EdgyName(tempNounA, tempNounB, "PosNoun");
            else
                return new EdgyName(tempNounA, tempNounB, "NounNoun");
    }
}

function genEdgyTitle() {
    // Legend:
    // ADJ  - Adjective
    // SING - Singular noun (hasPlural == true)
    // PLUR - Plural noun (hasPlural == true)
    // NOUN - Singular noun (hasPlural == false)
    // VERB - Singular noun (verbBased == true)

    // All possible combinations:
    // the ADJ SING - the ADJ NOUN
    // the SING SING - the SING NOUN
    // the NOUN SING - the NOUN NOUN
    // the SING's SING - the SING's NOUN
    //     NOUN's SING -     NOUN's NOUN
    // SING of the SING - SING of PLUR - the SING of PLUR - SING of NOUN - the SING of NOUN
    // NOUN of the SING - NOUN of PLUR - the NOUN of PLUR - NOUN of NOUN - the NOUN of NOUN 
    // SING of the ADJ - NOUN of the ADJ

    // All of these are used at some point
    let famA;
    let famN;
    let tempAdj;
    let tempNounA;
    let tempNounB;

    let roll = randInt(5); // Roll a D5

    // The title building tree
    switch (roll) {
        case 1:
            // Generate first word
            famA = randElem(adjFams);
            tempAdj = randElem(famA.items);

            // Generate the second word
            famN = randElem(nounFams);
            tempNounB = randElem(famN.items);

            // Construct full title
            return new EdgyTitle(tempAdj, tempNounB, "TheAdjNoun");

        case 2:
            // Generate the first word
            famN = randElem(nounFams);
            tempNounA = randElem(famN.items);

            // Generate the second word
            famN = randElem(nounFams);
            tempNounB = randElem(famN.items);

            // Construct full title
            return new EdgyTitle(tempNounA, tempNounB, "TheNounNoun");

        case 3:
            // Generate the first word
            famN = randElem(nounFams);
            tempNounA = randElem(famN.items);

            // Generate the second word
            famN = randElem(nounFams);
            tempNounB = randElem(famN.items);

            // Construct full title
            return new EdgyTitle(tempNounA, tempNounB, "ThePosNoun");

        case 4:
            // Generate the first word
            famN = randElem(nounFams);
            tempNounA = randElem(famN.items);

            // Generate the second word
            famN = randElem(nounFams);
            tempNounB = randElem(famN.items);

            roll = randInt(5); // Roll a D5
            if (roll == 0)
                return new EdgyTitle(tempNounA, tempNounB, "NounOfTheNoun");
            else if (roll == 1)
                return new EdgyTitle(tempNounA, tempNounB, "TheNounOfTheNoun");
            else if (roll == 2)
                return new EdgyTitle(tempNounA, tempNounB, "NounOfPlur");
            else if (roll == 3)
                return new EdgyTitle(tempNounA, tempNounB, "NounOfThePlur");
            else
                return new EdgyTitle(tempNounA, tempNounB, "TheNounOfPlur");

        case 5:
            // Generate the first word
            famN = randElem(nounFams);
            tempNounA = randElem(famN.items);

            // Generate the second word
            famA = randElem(adjFams);
            tempAdj = randElem(famA.items);

            // Construct full title
            return new EdgyTitle(tempNounA, tempAdj, "NounOfTheAdj");
    }
}
