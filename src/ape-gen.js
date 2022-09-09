import { randElem } from "./helper.js";

// --------------------------
// - - - - - FIELDS - - - - -
// --------------------------

const preCon = ["b", "f", "g", "h", "j", "k", "m", "p", "r", "t", "w", "y", "z", "ch"];
const vowel = ["a", "e", "i", "o", "u"];
const sufCon = ["h", "l", "m", "n"];

const species = ["chimpanzee", "gorilla", "orangutan", "bonobo", "gibbon"];
const sex = ["male", "female"];



// -----------------------------
// - - - - - FUNCTIONS - - - - -
// -----------------------------

// Generates a random syllable
const genSyllable = () => {
    // Declare empty string
    let syllable = "";

    // 10% chance to NOT have a beginning consonant
    if (Math.random() < .9)
        syllable += randElem(preCon);

    // Always have a vowel
    syllable += randElem(vowel);

    // 60% chance to NOT have an ending consonant
    if (Math.random() < .4)
        syllable += randElem(sufCon);

    // Return generated string
    return syllable;
};

// Generates a random name
const genName = () => {
    // Declare some variables
    let name = "";
    let goodToGo = false;

    // Run generation loop
    while (!goodToGo) {
        // Declare name with two random syllables
        name = genSyllable() + genSyllable();

        // 20% chance to add a vowel at the beginning
        if (Math.random() < .2)
            name = randElem(vowel) + name;

        // Check for bad words
        if (name != "rape" && name != "anal")
            goodToGo = true;
    }
    
    // Return generated name
    return name;
};

// Generates a random species
const genSpecies = () => {
    return randElem(species);
};

// Generates a random sex
const genSex = () => {
    return randElem(sex);
};

// Generates a random ape
const genApe = () => {
    return {
        name: genName(),
        species: genSpecies(),
        sex: genSex()
    };
};



// Exports
export {
    genName,
    genSpecies,
    genSex,
    genApe
};