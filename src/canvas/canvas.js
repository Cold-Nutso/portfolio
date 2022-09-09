'use strict';

// Variables
let canvas;

let fps = 120;

let brightness = 255;

const colorChangeOpts = [
    1,
    5,
    10,
    50,
    100,
    255
];
let colorChange = 1;
let color = {
    red: brightness,
    blue: 0,
    green: 0,
    phase: 1
}

const widthOpts = [
    1,
    5,
    10,
    20,
    50,
    100
];

let walker = {
    x: 300,
    y: 200,
    color: "black",
    width: 10,
    move(){
        if(flipWeightedCoin()){
            this.x += flipWeightedCoin() ? -this.width : this.width;
        }else{
            this.y += flipWeightedCoin() ? -this.width : this.width;
        }
    }
};
let ctx;

let interval;


// #1 call the init function after the pages loads
window.onload = function(){
    console.log("page loaded!");
    // #2 Now that the page has loaded, start drawing!
    
    // A - canvas variable points at <canvas> tag
    canvas = document.querySelector('canvas');
    
    // B - the ctx variable points at a "2D drawing context"
    ctx = canvas.getContext('2d');
    
    // C - all fill operations are now in red
    ctx.fillStyle = "black"; 
    
    // D - fill a rectangle with the current fill color
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    
    interval = setInterval(drawWalker,1000/fps);
}


function drawWalker(){
    updateColor(colorChange);
    ctx.fillStyle = `rgb(${color.red}, ${color.green}, ${color.blue})`;

    ctx.beginPath();
    ctx.arc(
        walker.x - (walker.width/2),
        walker.y - (walker.width/2),
        (walker.width * 8/10),
        0,
        Math.PI * 2
        );
    ctx.closePath();
    ctx.fill();

    walker.move();

    // Keep it in bounds
    if (walker.x < 0) { walker.x = walker.width; }
    else if (walker.x > canvas.width) { walker.x = canvas.width - walker.width; }

    if (walker.y < 0) { walker.y = walker.width; }
    else if (walker.y > canvas.height) { walker.y = canvas.height - walker.width; }
}

// UTILS

// Changes the color by rgb value
function updateColor(n){
    if (color.phase == 1) {
        color.green += n;
        if (color.green >= brightness) { 
            color.green = brightness;
            color.phase = 2;
        }
    }
    else if (color.phase == 2) {
        color.red -= n;
        if (color.red <= 0) { 
            color.red = 0;
            color.phase = 3;
        }
    }
    else if (color.phase == 3) {
        color.blue += n;
        if (color.blue >= brightness) { 
            color.blue = brightness;
            color.phase = 4;
        }
    }
    else if (color.phase == 4) {
        color.green -= n;
        if (color.green <= 0) { 
            color.green = 0;
            color.phase = 5;
        }
    }
    else if (color.phase == 5) {
        color.red += n;
        if (color.red >= brightness) { 
            color.red = brightness;
            color.phase = 6;
        }
    }
    else if (color.phase == 6) {
        color.blue -= n;
        if (color.blue <= 0) { 
            color.blue = 0;
            color.phase = 1;
        }
    }
}

function cls(){
    ctx.clearRect(0,0,640,480);
}

function flipWeightedCoin(weight = 0.5){
    return Math.random() < weight;
}

function randElem(array) {
    return array[Math.floor(Math.random() * array.length)];
}