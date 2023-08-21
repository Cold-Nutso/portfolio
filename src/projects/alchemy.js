'use strict';
import { trimFilter } from './project-main.js';

// Add that trim filter
const alchemyRoot = document.querySelector('#alchemy').shadowRoot;
let icons = alchemyRoot.querySelector('.banner').querySelectorAll('img');

for (let icon of icons)
  icon.style.filter =
    trimFilter + ' drop-shadow(0px 7px 4px rgba(0, 0, 0, 0.6))';
