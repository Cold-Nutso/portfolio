import { Vector2, isOverflown } from "../helper.js";

// Converts a string into a series of ASCII bubble letters
// Returns four lines in one string
const bubbleLetters = (str) => {
    str = str.toLowerCase(); // Reformat string

    // Initialize the four lines
    const lines = [ "", "", "", "" ];

    // Loop through each character in the string
    for (let char of str) {

        // Construct ASCII letter
        switch(char) {
            case 'a':
                lines[0] += `&nbsp;&nbsp;___&nbsp;&nbsp;`;  //   ___
                lines[1] += `&nbsp;/&nbsp;_&nbsp;\\&nbsp;`; //  / _ \   
                lines[2] += `|&nbsp;/_\\&nbsp;|`;           // | /_\ |
                lines[3] += `|_|&nbsp;|_|`;                 // |_| |_|
                break;
        
            case 'b':
                lines[0] += `&nbsp;______`;            //  ______
                lines[1] += `|&nbsp;&nbsp;__&nbsp;/`;  // |  __ /
                lines[2] += `|&nbsp;&nbsp;__&nbsp;\\`; // |  __ \
                lines[3] += `|_____|`;                 // |_____|
                break;

            case 'c':
                lines[0] += `&nbsp;&nbsp;_____`;      //   _____
                lines[1] += `&nbsp;/&nbsp;&nbsp;__/`; //  /  __/
                lines[2] += `|&nbsp;&nbsp;|__&nbsp;`; // |  |__ 
                lines[3] += `&nbsp;\\____\\`;         //  \____\
                break;

            case 'd':
                lines[0] += `&nbsp;____&nbsp;&nbsp;`;       //  ____  
                lines[1] += `|&nbsp;&nbsp;_&nbsp;\\&nbsp;`; // |  _ \ 
                lines[2] += `|&nbsp;|_|&nbsp;|`;            // | |_| |
                lines[3] += `|____/&nbsp;`;                 // |____/ 
                break;

            case 'e':
                lines[0] += `&nbsp;______`;           //  ______
                lines[1] += `|&nbsp;&nbsp;__&nbsp;/`; // |  __ /
                lines[2] += `|&nbsp;&nbsp;__|&nbsp;`; // |  __| 
                lines[3] += `|_____\\`;               // |_____\
                break;

            case 'f':
                lines[0] += `&nbsp;______`;           //  ______
                lines[1] += `|&nbsp;&nbsp;___/`;      // |  ___/
                lines[2] += `|&nbsp;&nbsp;__/&nbsp;`; // |  __/ 
                lines[3] += `|__|&nbsp;&nbsp;&nbsp;`; // |__|   
                break;

            case 'g':
                lines[0] += `&nbsp;&nbsp;_____`;       //   _____
                lines[1] += `&nbsp;/&nbsp;&nbsp;__/`;  //  /  __/
                lines[2] += `|&nbsp;&nbsp;|_&nbsp;\\`; // |  |_ \
                lines[3] += `&nbsp;\\____/`;           //  \____/
                break;

            case 'h':
                lines[0] += `&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;`; //  _   _ 
                lines[1] += `|&nbsp;|_|&nbsp;|`;                // | |_| |   
                lines[2] += `|&nbsp;&nbsp;_&nbsp;&nbsp;|`;      // |  _  |
                lines[3] += `|_|&nbsp;|_|`;                     // |_| |_|
                break;

            case 'i':
                lines[0] += `&nbsp;_____&nbsp;`;      //  _____ 
                lines[1] += `|_&nbsp;&nbsp;&nbsp;_|`; // |_   _|
                lines[2] += `&nbsp;_|&nbsp;|_&nbsp;`; //  _| |_  
                lines[3] += `|_____|`;                // |_____|
                break;

            case 'j':
                lines[0] += `&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;`; //     __ 
                lines[1] += `&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;|`; //    |  |
                lines[2] += `/\\_|&nbsp;&nbsp;|`;               // /\_|  |
                lines[3] += `\\_____/`;                         // \_____/
                break;

            case 'k':
                lines[0] += `&nbsp;_&nbsp;&nbsp;&nbsp;__`; //  _   __
                lines[1] += `|&nbsp;|_/&nbsp;/`;           // | |_/ /
                lines[2] += `|&nbsp;&nbsp;_&nbsp;|&nbsp;`; // |  _ | 
                lines[3] += `|_|&nbsp;\\_\\`;              // |_| \_\
                break;

            case 'l':
                lines[0] += `&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;`; //  __    
                lines[1] += `|&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;`; // |  |   
                lines[2] += `|&nbsp;&nbsp;|__&nbsp;`;           // |  |__ 
                lines[3] += `|_____\\`;                         // |_____\
                break;

            case 'm':
                lines[0] += `&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;`; //  _   _ 
                lines[1] += `|&nbsp;\\_/&nbsp;|`;               // | \_/ |
                lines[2] += `|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|`; // |     |
                lines[3] += `|_|V|_|`;                          // |_|V|_|
                break;

            case 'n':
                lines[0] += `&nbsp;__&nbsp;&nbsp;_&nbsp;`;      //  __  _ 
                lines[1] += `|&nbsp;&nbsp;\\|&nbsp;|`;          // |  \| |
                lines[2] += `|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|`; // |     |
                lines[3] += `|_|\\__|`;                         // |_|\__|
                break;

            case 'o':
                lines[0] += `&nbsp;&nbsp;___&nbsp;&nbsp;`;  //   ___
                lines[1] += `&nbsp;/&nbsp;_&nbsp;\\&nbsp;`; //  / _ \  
                lines[2] += `|&nbsp;|_|&nbsp;|`;            // | |_| |
                lines[3] += `&nbsp;\\___/&nbsp;`;           //  \___/ 
                break;

            case 'p':
                lines[0] += `&nbsp;_____&nbsp;`;       //  _____ 
                lines[1] += `|&nbsp;&nbsp;__&nbsp;\\`; // |  __ \
                lines[2] += `|&nbsp;&nbsp;___/`;       // |  ___/
                lines[3] += `|__|&nbsp;&nbsp;&nbsp;`;  // |__|   
                break;
        
            case 'q':
                lines[0] += `&nbsp;&nbsp;___&nbsp;&nbsp;`;  //   ___  
                lines[1] += `&nbsp;/&nbsp;_&nbsp;\\&nbsp;`; //  / _ \ 
                lines[2] += `|&nbsp;|_|&nbsp;|`;            // | |_| |
                lines[3] += `&nbsp;\\____\\`;               //  \____\ 
                break;

            case 'r':
                lines[0] += `&nbsp;_____&nbsp;`;                //  _____ 
                lines[1] += `|&nbsp;&nbsp;__&nbsp;\\`;          // |  __ \
                lines[2] += `|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/`; // |     /
                lines[3] += `|_|\\__\\`;                        // |_|\__\
                break;

            case 's':
                lines[0] += `&nbsp;______`;             //  ______
                lines[1] += `/&nbsp;&nbsp;&nbsp;__/`;   // /   __/
                lines[2] += `\\__&nbsp;&nbsp;&nbsp;\\`; // \__   \
                lines[3] += `/_____/`;                  // /_____/
                break;

            case 't':
                lines[0] += `_______`;                          // _______
                lines[1] += `\\_&nbsp;&nbsp;&nbsp;_/`;          // \_   _/
                lines[2] += `&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;`; //   | |   
                lines[3] += `&nbsp;&nbsp;|_|&nbsp;&nbsp;`;      //   |_|  
                break;

            case 'u':
                lines[0] += `&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;`; //  _   _ 
                lines[1] += `|&nbsp;|&nbsp;|&nbsp;|`;           // | | | |
                lines[2] += `|&nbsp;|_|&nbsp;|`;                // | |_| |
                lines[3] += `&nbsp;\\___/&nbsp;`;               //  \___/ 
                break;

            case 'v':
                lines[0] += `__&nbsp;&nbsp;&nbsp;__`;       // __   __
                lines[1] += `\\&nbsp;\\&nbsp;/&nbsp;/`;     // \ \ / /
                lines[2] += `&nbsp;\\&nbsp;V&nbsp;/&nbsp;`; //  \ V / 
                lines[3] += `&nbsp;&nbsp;\\_/&nbsp;&nbsp;`; //   \_/  
                break;

            case 'w':
                lines[0] += `&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;`; //  _   _ 
                lines[1] += `|&nbsp;|_|&nbsp;|`;                // | |_| |
                lines[2] += `|&nbsp;/&nbsp;\\&nbsp;|`;          // | / \ |
                lines[3] += `|_/&nbsp;\\_|`;                    // |_/ \_|
                break;

            case 'x':
                lines[0] += `__&nbsp;&nbsp;&nbsp;__`;      // __   __
                lines[1] += `\\&nbsp;\\_/&nbsp;/`;         // \ \_/ /
                lines[2] += `&nbsp;|&nbsp;_&nbsp;|&nbsp;`; //  | _ | 
                lines[3] += `/_/&nbsp;\\_\\`;              // /_/ \_\
                break;

            case 'y':
                lines[0] += `__&nbsp;&nbsp;&nbsp;__`;            // __   __
                lines[1] += `\\&nbsp;\\_/&nbsp;/`;               // \ \_/ /
                lines[2] += `&nbsp;\\&nbsp;&nbsp;&nbsp;/&nbsp;`; //  \   / 
                lines[3] += `&nbsp;&nbsp;|_|&nbsp;&nbsp;`;       //   |_|  
                break;

            case 'z':
                lines[0] += `_______`;                      // _______
                lines[1] += `\\__&nbsp;&nbsp;&nbsp;/`;      // \__   /
                lines[2] += `&nbsp;/&nbsp;&nbsp;_/&nbsp;`;  //  /  _/ 
                lines[3] += `/_____\\`;                     // /_____\
                break;

            case '\'':
                lines[0] += `&nbsp;__`;          //  __
                lines[1] += `/_/`;               // /_/
                lines[2] += `&nbsp;nbsp;&nbsp;`; //    
                lines[3] += `&nbsp;nbsp;&nbsp;`; //    
                break;
        
            default:
                break;
        }

        // Add spacing between letters
        if (lines[0].length > 0) {
            lines[0] += '&nbsp;';
            lines[1] += '&nbsp;';
            lines[2] += '&nbsp;';
            lines[3] += '&nbsp;';
        }
    }

    // Return all four lines
    return `${lines[0]}<br>${lines[1]}<br>${lines[2]}<br>${lines[3]}`;
};

/* Assembles radio buttons for a select section
    elem - element to append to
    data - array to parse from
    name - name for the radio button id's
    func - function to be called on check change (takes in radio button value)
    key - key to get image source from
*/
const buildSelect = (elem, data, name, func, key='icon') => {
    for (let i=0; i<data.length; i++) {

        // Create radio button
        let rad = document.createElement("input");
        rad.setAttribute("type", "radio");
        rad.id = `${name}Opt${i}`;
        rad.name = `${name}Options`;
        rad.value = i;

        // Set the first one to checked
        if (i == 0) { rad.checked = true; }
        // Add event listener
        // Not reloading the same data must be handled in func
        rad.onclick = () => { if (rad.checked) { func(rad.value); } };

        // Create label
        let radLbl = document.createElement("label");
        radLbl.setAttribute("for", rad.id);

        // Create Image
        let radDiv = document.createElement("div");
        let radImg = document.createElement("img");
        radImg.src = data[i][`${key}`];
        radImg.draggable = false;

        // Append everything
        elem.append(rad);
        radDiv.append(radImg);
        radLbl.append(radDiv);
        elem.append(radLbl);
    }
};

// Assigns color to a string
const colorInline = (string, color) => {
    let style = `color:${color}`; // Set color style

    // If pure black, lower opacity instead
    if (color == '#000000') { style = `filter:opacity(50%)`; }

    // Return as span elem
    return `<span style='${style}'>${string}</span>`;
};

// Assigns color to parts of or a full string
const colorString = (str, col, char) => {
    // If no char input, color full string
    if (!char) { return colorInline(str, col); }

    const strSplit = str.split(char); // Split string by char
    
    // Run through array
    for (let i=0; i<strSplit.length; i++) {
        // Color every odd index
        if (i % 2 != 0) { strSplit[i] = colorInline(strSplit[i], col); }
    }

    return strSplit.join(''); // Return as one string
};

// Creates a zoom capability for an image
const buildArtZoom = (imgElem, max, zoomSpd) => {
    // Add scroll wheel listener
    imgElem.addEventListener("wheel", (e) => {
        e.preventDefault(); // Stop page scrolling

        // Grab zoom attribute
        let zoom = parseFloat(imgElem.getAttribute('zoom')) || 1;

        // Set zoom by scroll value
        if (e.deltaY > 0) { zoom -= zoomSpd; }
        else              { zoom += zoomSpd; }
        // Clamp zoom value
        if      (zoom < 1)   { zoom = 1; }
        else if (zoom > max) { zoom = 3; }
        // Set zoom attribute
        imgElem.setAttribute('zoom', zoom);

        // Grab art screen info
        const artScreen = imgElem.parentElement;
        const artPadding = parseFloat(window.getComputedStyle(artScreen, null).getPropertyValue('padding'));
        const artRect = artScreen.getBoundingClientRect();
        const artHalfDim = (artRect.width/2) - artPadding;
        const paddedArtDim = artRect.width - (2*artPadding);

        // Grab image info
        const imgRect = imgElem.getBoundingClientRect();
        const imgCenter = new Vector2(
            imgRect.left + (imgRect.width/2), 
            imgRect.top + (imgRect.height/2)
        );

        // Get distance from cursor to image center
        const cursToImg = new Vector2(
            e.clientX - imgCenter.x, 
            e.clientY - imgCenter.y
        );

        // Prediction math
        const predImgHalfDim = artHalfDim * zoom;
        const predImgHalfDimDiff = predImgHalfDim - (imgRect.width/2);
        const predCursToImg = new Vector2(
            (cursToImg.x / imgRect.width) * (2*predImgHalfDim), 
            (cursToImg.y / imgRect.height) * (2*predImgHalfDim)
        );
        const cursToImgDiff = new Vector2(
            predCursToImg.x - cursToImg.x, 
            predCursToImg.y - cursToImg.y
        );

        // Grab current image offsets
        const imgTop = parseFloat(window.getComputedStyle(imgElem, null).getPropertyValue('top'));
        const imgLeft = parseFloat(window.getComputedStyle(imgElem, null).getPropertyValue('left'));

        // Set final image offset
        const imgOffset = new Vector2(
            imgLeft - cursToImgDiff.x - predImgHalfDimDiff, 
            imgTop - cursToImgDiff.y - predImgHalfDimDiff, 
        );

        // Clamp image to sides of the screen
        // Can be bigger than the border, but not smaller
        if (imgRect.left + imgOffset.x > artRect.left + artPadding) {
            imgOffset.x = 0;
        } else if (imgOffset.x + (2*predImgHalfDim) < paddedArtDim) {
            imgOffset.x = paddedArtDim - (2*predImgHalfDim);
        }

        if (imgRect.top + imgOffset.y > artRect.top + artPadding) {
            imgOffset.y = 0;
        } else if (imgOffset.y + (2*predImgHalfDim) < paddedArtDim) {
            imgOffset.y = paddedArtDim - (2*predImgHalfDim);
        }

        // Finally, set element styles
        imgElem.style.width = `${2*predImgHalfDim}px`;
        imgElem.style.height = `${2*predImgHalfDim}px`;
        imgElem.style.left = `${imgOffset.x}px`;
        imgElem.style.top = `${imgOffset.y}px`;
    });
};

// Resets a zoomable image to default state
const resetArtZoom = (imgElem) => {
    // Grab screen information
    const artScreen = imgElem.parentElement;
    const artPadding = parseFloat(window.getComputedStyle(artScreen, null).getPropertyValue('padding'));
    const artRect = artScreen.getBoundingClientRect();
    const paddedArtDim = artRect.width - (2*artPadding);

    // Set element styles
    imgElem.style.width = `${paddedArtDim}px`;
    imgElem.style.height = `${paddedArtDim}px`;
    imgElem.setAttribute('zoom', 1);
    imgElem.style.left = '0';
    imgElem.style.top = '0';
};

// Adjusts padding based on scrollbar presence
const scrollbarPadding = (textScreen) => {
    const fade = textScreen.children[0];
    const par = fade.children[0];

    if (isOverflown(par.scrollHeight, fade.clientHeight)) {
        fade.style.paddingRight = '0'; 
    } else { 
        fade.style.paddingRight = 'calc(var(--screen-unit) * .5)';
    }
};

// Export
export {
    bubbleLetters,
    buildSelect,
    colorString,
    buildArtZoom,
    resetArtZoom,
    scrollbarPadding
};