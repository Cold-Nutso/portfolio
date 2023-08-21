"use strict";

// Add listener to worms project profile
const wormsRoot = document.querySelector("#worms").shadowRoot;
let wormsImg = wormsRoot.querySelector("#worms1");
wormsImg.addEventListener( "click", 
function() { 
    wormsImg.src = "/assets/proj/worms/profile-alt.png";
    wormsImg.style.cursor = "default";
    } 
);