"use strict";

const isOverflown = (scrollHeight, clientHeight) => {
    return scrollHeight > clientHeight;
}

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}

// Gets a random element from an array
function randElem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Gets a random integer between 1 and input
function randInt(int) {
    return Math.ceil(Math.random() * int);
}

// Decrease font size until word fits
// white-space should be set to "nowrap"
// This might be wonky on account of px values instead of vw
function fitText(textElem, text, fontSize) {
    textElem.style.fontSize = fontSize;      // Set font size to default
    textElem.innerHTML = "...";              // Set text to something tiny (so it doesn't stretch column width)
    const idealWidth = textElem.clientWidth; // Get ideal column width
    console.log(`Ideal Width: ${idealWidth}`);
    textElem.innerHTML = text;             // Set text back to what it should be
  
    let goodEnough = false; // Conditional for while loop
      while (!goodEnough) {
        let currentWidth = textElem.clientWidth;                                      // Get current column width
        console.log(`Current Width: ${currentWidth}`);
        let currentFontSize = parseFloat(window.getComputedStyle(textElem).fontSize); // Get float of current font size
        console.log(`Current Font Size: ${currentFontSize}`);
  
        if (currentWidth > idealWidth)
          textElem.style.fontSize = `${currentFontSize * (idealWidth / currentWidth )}px`; // Change font size by factor of current/ideal width
        else {
          textElem.style.fontSize = `${currentFontSize - .1}px` // Decrease font size once more for good measure
          goodEnough = true;                                    // End the loop
        }
    }
}

// Travel to a part of the page
const travelTo = (id) => {
    window.location = "#" + id;
    window.scrollTo(window.scrollX, window.scrollY + 200);
}

class Vector2 {
    vector = [0, 0];

    get x()    { return this.vector[0]; }
    set x(val) { this.vector[0] = val;  }

    get y()    { return this.vector[1]; }
    set y(val) { this.vector[1] = val;  }

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class PhysicsBody {
    position = new Vector2(0, 0);
    velocity = new Vector2(0, 0);
    accel    = new Vector2(0, 0);

    gravity  = -3000;
    gravOn   = true;

    constructor() {
        // Define properties
        Object.defineProperties(this, {
            "gravOn":     { 
                get()     { return this._gravOn; },
                set(bool) { 
                    this._gravOn = bool;
                    if (bool == true) this.accel.y = this.gravity;
                    else              this.accel.y = 0;            } },
            "gravity":    { 
                get()     { return this._gravity; },
                set(g)    { 
                    this._gravity = g;
                    if (this.gravOn == true) this.accel.y = g;     } }
        });
        
        this.gravity = -3000;
    }

    update(spf) {
        this.velocity.x += this.accel.x * spf;
        this.velocity.y += this.accel.y * spf;

        this.position.x += this.velocity.x * spf;
        this.position.y += this.velocity.y * spf;
    }

    freezeVertMovement() {
        this.accel.y = 0;
        this.velocity.y = 0;
        this.position.y = 0;
    }
}

export {
    isOverflown,
    clamp,
    randElem,
    randInt,
    fitText,
    travelTo,
    Vector2,
    PhysicsBody
};