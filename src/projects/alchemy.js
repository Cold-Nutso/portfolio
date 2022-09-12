"use strict";
import { filters, trimIndex } from "../index.js";

// Add that trim filter
const alchemyRoot = document.querySelector("#alchemy").shadowRoot;
let icons = alchemyRoot.querySelector(".banner").querySelectorAll("img");
console.log(icons);
for (let icon of icons)
    icon.style.filter = filters[trimIndex] + " drop-shadow(0px 7px 4px rgba(0, 0, 0, 0.6))";;