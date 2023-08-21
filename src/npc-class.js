"use strict";
import { clamp, PhysicsBody } from "./helper.js";

const npcState = {
    SQUAT: "squat",
    IDLE: "idle",
	RUN: "run",
    ACTION: "action"
}

class NPC {
    name = "";
    element;
    speed = 0;

    hitbox;
    hbDims;

    // Visual properties
    sprite;
    length;
    xDirection;

    // Logic properties
    state;
    // Inputs MUST be vectors
    physics = new PhysicsBody();
    grounded;
    x = 0;
    y = 0;

    // Custom get set
    get hbVisible()     { return this.hitbox.visible; }
    set hbVisible(bool) { this.hitbox.visible = bool; }

    constructor(name, speed, hbDims, length = 128) {
        this.name = name;
        this.speed = speed;
        this.length = length;
        this.state = npcState.IDLE;

        this.element = document.createElement("div");
        this.element.className = "npc";
        this.element.style.width = `${length}px`;
        this.element.style.height = `${length}px`;
        this.sprite = document.createElement("img");
        this.sprite.draggable = false; // Might need to change this later
        this.sprite.src = `assets/npcs/${name}/idle.gif`;
        let boxElem = document.createElement("div");
        boxElem.onmouseover = () => { boxElem.style.cursor = "grab"; }

        this.hbDims = hbDims;
        this.hitbox = new Hitbox(boxElem, hbDims[0][0], hbDims[0][1], hbDims[0][2], hbDims[0][3]);
        
        this.element.appendChild(this.sprite);
        this.element.appendChild(boxElem);
        document.body.appendChild(this.element);

        // Define properties
        Object.defineProperties(this, {
            "x":        { 
                get()  { return this._x; },
                set(x) { 
                    this._x = x;
                    this.element.style.right = `${document.documentElement.clientWidth - this._x - (this.length/2)}px`; 
                    this.physics.position.x = x; } },
            "y":        {
                get()  { return this._y; }, 
                set(y) { this._y = y; 
                    this.element.style.bottom = `${this._y + this.hitbox.height - this.length + this.hitbox.offsetTop}px`; 
                    this.physics.position.y = y; } },
            "xDirection": {
                get()     { return this._xDirection; },
                set(int) { 
                    this._xDirection = int; 
                    this.sprite.style.transform = `scaleX(${-this._xDirection})`; } },
             "hitbox":     { writable: false } 
        });

        this.x = document.documentElement.clientWidth / 2;
        this.y = document.documentElement.clientHeight / 2;
        this.xDirection = 1;

        this.grounded = false;
        this.physics.gravOn = true;
        this.updateState("air");
    }

    swapState(state){
        if (this.grounded)
        {
            if (this.y > 0)
                this.grounded = false;

            if (this.physics.gravOn)
                this.physics.gravOn = false;
        }
        else
        {
            if (this.y <= 0) {
                this.grounded = true;
                this.physics.freezeVertMovement();
            }

            if (!this.physics.gravOn)
                this.physics.gravOn = true;
        }

        if (this.state != state)
        {

            switch (state) {
                case npcState.IDLE:
                    this.sprite.src = `assets/npcs/${this.name}/${npcState.IDLE}.gif`;
                    this.hitbox.assignDimensions(this.hbDims[0]);
                    break;
    
                case npcState.RUN:
                    this.sprite.src = `assets/npcs/${this.name}/${npcState.RUN}.gif`;
                    this.hitbox.assignDimensions(this.hbDims[1]);
                    break;
            }

            this.state = state;
        }

        if (!this.grounded) {
            this.sprite.src = `assets/npcs/${this.name}/${"jump"}.gif`;
            this.hitbox.assignDimensions(this.hbDims[1]);
        }
    }

    // Synthesized Intelligence
    SI(spf, targetX, targetY) {
        if (this.x > targetX)
        {
            if (this.x - (this.speed*16) < targetX)
                this.swapState(npcState.IDLE);
            else 
            {
                this.swapState(npcState.RUN);
                this.x += this.speed * this.xDirection;

                if (this.xDirection > 0)
                    this.xDirection = -1;
            }
        }
        else if (this.x < targetX)
        {
            if (this.x + (this.speed*8) > targetX)
                this.swapState(npcState.IDLE);
            else 
            {
                this.swapState(npcState.RUN);
                this.x += this.speed * this.xDirection;

                if (this.xDirection < 0)
                    this.xDirection = 1;
            }
        }
        else
            this.swapState(npcState.IDLE);



        this.physics.update(spf);
        this.physics.position.x = clamp(this.physics.position.x, this.hitbox.offsetLeft, document.documentElement.clientWidth - this.hitbox.offsetLeft);
        this.physics.position.y = clamp(this.physics.position.y, 0, document.documentElement.clientHeight * 3);
        this.x = this.physics.position.x;
        this.y = this.physics.position.y;


        // console.log(`${this.name}: grounded -> ${this.grounded}`);
        // console.log(`${this.name}: gravON -> ${this.physics.gravOn}`);
        // console.log(`${this.name}: accelY -> ${this.physics.accel.y}`);
        // console.log(`${this.name}: velY -> ${this.physics.velocity.y}`);
        // console.log(`${this.name}: posY -> ${this.physics.position.y}`);
    }

    update(spf) {
        if (this.state == npcState.RUN)
            this.x += this.speed * this.xDirection * spf;

        if (!this.grounded && this.y <= 0) {
                this.grounded = true;
                this.physics.gravOn = false;
                this.physics.freezeVertMovement();
                this.updateState("air");
        }
    
        this.physics.update(spf);
        this.physics.position.x = clamp(this.physics.position.x, this.hitbox.offsetLeft, document.documentElement.clientWidth - this.hitbox.offsetLeft);
        this.physics.position.y = clamp(this.physics.position.y, 0, document.documentElement.clientHeight * 3);
        this.x = this.physics.position.x;
        this.y = this.physics.position.y;
    }

    updateState(state) {
        if (this.state != state) {
            if (state != "air")
                this.state = state;

            if (!this.grounded) {
                this.sprite.src = `assets/npcs/${this.name}/${"jump"}.gif`;
                this.hitbox.assignDimensions(this.hbDims[1]);
            }
            else {
                switch (this.state) {
                    case npcState.IDLE:
                        this.sprite.src = `assets/npcs/${this.name}/${npcState.IDLE}.gif`;
                        this.hitbox.assignDimensions(this.hbDims[0]);
                        break;
        
                    case npcState.RUN:
                        this.sprite.src = `assets/npcs/${this.name}/${npcState.RUN}.gif`;
                        this.hitbox.assignDimensions(this.hbDims[1]);
                        break;
    
                    case npcState.SQUAT:
                        this.sprite.src = `assets/npcs/${this.name}/${npcState.SQUAT}.gif`;
                        this.hitbox.assignDimensions(this.hbDims[1]);
                        break;
                }
            }
        }
    }

    jump() {
        this.y += 1; // Gets him off the ground initially
        this.physics.velocity.y = 1000;
        this.grounded = false;
        this.physics.gravOn = true;
        this.updateState("air");
    }

    input(key) {
        if (this.grounded) {
            if (key == " ") {
                this.jump();
            }
            else if (key == "s") {
                this.updateState(npcState.SQUAT);
            }

            if (this.state == npcState.SQUAT) {
                if (key == " ") {
                    this.jump();
                }
                if (key == "NULL") {
                    this.updateState(npcState.IDLE);
                }
            }
        }

        if (this.state != npcState.SQUAT) {
            if (this.state == npcState.IDLE) {
                if (key == "a") {
                    this.updateState(npcState.RUN);
                    this.xDirection = -1;
                }
                else if (key == "d") {
                    this.updateState(npcState.RUN)
                    this.xDirection = 1;
                }
            }
            else if (this.state == npcState.RUN) {
                if (key == "a") 
                    this.xDirection = -1;
                else if (key == "d") 
                    this.xDirection = 1;
                else if (key == "NULL")
                this.updateState(npcState.IDLE);
            } 
        }
    }
}


class Hitbox {
    element;
    visible;
    width;
    height;
    offsetLeft;
    offsetTop;

    // x and y default to 0 if not specified
    constructor(element, w, h, x = 0, y = 0) {
        this.element = element;
        this.element.className = "hitbox";

        // Define properties
        Object.defineProperties(this, {
            "width":      { 
                get()  { return this._width; },
                set(w) { this._width = w;      this.element.style.width = `${w}px`;  } },
            "height":     {
                get()  { return this._height; }, 
                set(h) { this._height = h;     this.element.style.height = `${h}px`; } },
            "offsetLeft": {
                get()  { return this._offsetLeft; },
                set(x) { this._offsetLeft = x; this.element.style.left = `${x}px`;   } },
            "offsetTop":  {
                get()  { return this._offsetTop; },
                set(y) { this._offsetTop = y;  this.element.style.top = `${y}px`;    } },
            "visible": { 
                get()     { return this._visible; },
                set(bool) {
                    this._visible = bool;
                    if (bool == true) this.element.style.backgroundColor = "rgba(255, 0, 0, .2)";
                    else              this.element.style.backgroundColor = ""; } }
        });

        this.width = w;
        this.height = h;
        this.offsetLeft = x;
        this.offsetTop = y;
        this.visible = false;
    }

    // Shorthand for reassigning all dimensions
    assignDimensions(w, h, x = 0, y = 0) {
        this.width = w;
        this.height = h;
        this.offsetLeft = x;
        this.offsetTop = y;
    }

    // Can also take a premade list
    assignDimensions(dims) {
        this.width = dims[0];
        this.height = dims[1];
        this.offsetLeft = dims[2];
        this.offsetTop = dims[3];
    }
}

export { NPC };