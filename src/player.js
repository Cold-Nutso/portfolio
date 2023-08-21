'use strict';
import { NPC } from './npc-class.js';

let sprLength = 128;

let umbraHbDims = [
  [
    (sprLength * 12) / 32,
    (sprLength * 15) / 32,
    (sprLength * 10) / 32,
    (sprLength * 8) / 32,
  ],
  [
    (sprLength * 16) / 32,
    (sprLength * 13) / 32,
    (sprLength * 8) / 32,
    (sprLength * 10) / 32,
  ],
];
let umbra = new NPC('umbraborn', 8, umbraHbDims, sprLength);

let umbraAltHbDims = [
  [
    (sprLength * 14) / 32,
    (sprLength * 16) / 32,
    (sprLength * 9) / 32,
    (sprLength * 7) / 32,
  ],
  [
    (sprLength * 14) / 32,
    (sprLength * 16) / 32,
    (sprLength * 9) / 32,
    (sprLength * 7) / 32,
  ],
];
let umbraAlt = new NPC('umbraborn_alt', 4, umbraAltHbDims, sprLength);

let knuckHbDims = [
  [
    (sprLength * 12) / 32,
    (sprLength * 30) / 32,
    (sprLength * 10) / 32,
    (sprLength * 2) / 32,
  ],
  [
    (sprLength * 12) / 32,
    (sprLength * 30) / 32,
    (sprLength * 10) / 32,
    (sprLength * 2) / 32,
  ],
];
let knuck = new NPC('knuckolai', 300, knuckHbDims, sprLength);
knuck.hbVisible = false;

let mouseX;
let mouseY;

let scrollY = window.scrollY;

// Capture the keyboard keys
let spaceKey = keyboard(' '),
  aKey = keyboard('a'),
  sKey = keyboard('s'),
  dKey = keyboard('d');

// STUPID window.innerWidth INCLUDES SCROLLBAR WHICH FUCKS EVERYTHING UP
// Use this instead -> document.documentElement.clientWidth

window.setInterval(function () {
  gameLoop();
}, 1000 / 60 /*60fps*/);

// Update physics with scroll
window.onscroll = function (e) {
  let scrollDif = window.scrollY - scrollY;

  umbra.physics.position.y += (scrollDif * 1) / 3;
  umbraAlt.physics.position.y += (scrollDif * 1) / 3;
  knuck.physics.position.y += (scrollDif * 1) / 3;

  scrollY = window.scrollY;
};

function gameLoop() {
  umbra.SI(1 / 60, mouseX, mouseY);
  umbraAlt.SI(1 / 60, umbra.x, umbra.y);

  if (knuck.grounded) {
    if (spaceKey.isDown) {
      knuck.input(' ');
    }
  }

  if (aKey.isDown) {
    knuck.input('a');
  } else if (dKey.isDown) {
    knuck.input('d');
  } else if (sKey.isDown) {
    knuck.input('s');
  } else {
    // Nothing of significance is pressed
    knuck.input('NULL');
  }

  knuck.update(1 / 60);
}

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

// -----------------------------------
// - - - - - EVENT LISTENERS - - - - -
// -----------------------------------

// Checks keyboard input
// This lovely function came from here: https://github.com/kittykatattack/learningPixi#keyboard
function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  // The `downHandler`
  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();

      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  // The `upHandler`
  key.upHandler = (event) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();

      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  // Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener('keydown', downListener, false);
  window.addEventListener('keyup', upListener, false);

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener);
    window.removeEventListener('keyup', upListener);
  };

  return key;
}
