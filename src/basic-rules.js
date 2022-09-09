const allImgs = document.querySelectorAll("img");

// Make all images undraggable
for (let i = 0; i < allImgs.length; i++)
    allImgs[i].draggable = false;