const urlParams = new URLSearchParams(window.location.search);
var hardMode = urlParams.get("hard") != null;

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  };

var lastMove = null;

// classMap = {
//     'lastMove': [[
//         'highlightLastMove'
//     ], ['']], 
//     'pieces': [[
//     'x',
//     'o',
//     'highlightWinning'
//     ], ['none']],
//     'highlights': [[
//     'highlight',
//     'highlightSecondary'
//     ], ['']]
// }

// generates the play field
for(let w = 0; w < 4; w++) {
    let row = $("<tr></tr>").appendTo("#playField").mouseleave(function() {
        removeClasses('highlights');
        highlightLastMove();
    });
    for(let z = 0; z < 4; z++) {
        let cell = $("<td></td>").appendTo(row);
        for(let y = 0; y < 4; y++) {
            let innerTableRow = $("<tr></tr>").appendTo(cell);
            for(let x = 0; x < 4; x++) {
                let innerTableCell = $("<td><div class='none'></td>").appendTo(innerTableRow)
                .attr("id", `${x}${y}${z}${w}`)
                .mouseenter(function() {
                    // when hovering a cell, highlight the cell by passing the coordinates stored in the cell ID
                    removeClasses('highlights');
                    highlightLastMove();
                    highlightPossible($(this).attr("id"));
                });
                // $("<div></div>").appendTo(innerTableCell);
            }
        }
    }
}

var secondaryTurn = false; // variable for storing whose turn it is
var gameEnded = false;
var turnDisplay = document.getElementById('display'); // gets the text element above the play field

// makes all cells clickable
const playFieldElement = document.getElementById('playField');
playFieldElement.addEventListener('click', function(event) {
    const clicked = event.target;
    
    if(gameEnded)
        return;
    
    // if the cell is empty, fills it with the current player's symbol
    let empty = Number.isInteger(parseInt(clicked.id)) && Array.from(clicked.querySelector("div").classList).includes("none");
    if(empty) {
        secondaryTurn = !secondaryTurn // flip whose turn it is
        clicked.querySelector("div").classList.remove("none");
        clicked.querySelector("div").classList.add(secondaryTurn ? "x" : "o"); // place the symbol
        lastMove = Vec4.parse(clicked.id);

        // removeClasses();
        highlightLastMove();
        if(!hardMode)
            highlightPossible($(this).attr("id"));

        // update the text above the play field
        turnDisplay.innerHTML = checkForWin(clicked.id) ? `<b>Player ${!secondaryTurn ? 'O' : 'X'} has won!!</b><br><u><p id="resetGame" onClick="cleanBoard();">Click here to start a new game.</p></u>` : 
        (`Now it's <b>player ${secondaryTurn ? 'O' : 'X'}</b>\'s turn`);
    }
});


// vector class
class Vec4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    // parse from a string, eg. 0000
    static parse(str) {
        return new Vec4(str[0], str[1], str[2], str[3]);
    }

    // get one of the values based on index
    get(i) {
        switch(i) {
            case 0:  return this.x;
            case 1:  return this.y;
            case 2:  return this.z;
            case 3:  return this.w;
            default: return null;
        }
    }

    // check if the vector equals another
    equals(x, y, z, w) {
        return this.x == x
            && this.y == y
            && this.z == z
            && this.w == w;
    }

    toString() {
        return `${this.x}${this.y}${this.z}${this.w}`;
    }

    toArray() {
        return [ this.x, this.y, this.z, this.w ];
    }

    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }
}

// remove certain classes from all cells
function removeClasses(classes) {
    for(let w = 0; w < 4; w++)
        for(let z = 0; z < 4; z++)
            for(let y = 0; y < 4; y++)
                for(let x = 0; x < 4; x++)
                    // for(let i = 0; i < classMap.get(classes)[0].length; i++)
                    //     $(`#${x}${y}${z}${w} > div`).removeClass(classMap.get(classes)[0][i]);

                    switch (classes) {
                        case 'lastMove':
                            $(`#${x}${y}${z}${w} > div`)
                            .removeClass("highlightLastMove");
                            break;
                        case 'pieces':
                            $(`#${x}${y}${z}${w} > div`)
                            .removeClass("x")
                            .removeClass("o")
                            .removeClass("highlightWinning")
                            .addClass("none");
                            break;
                        case 'highlights':
                            $(`#${x}${y}${z}${w} > div`)
                            .removeClass("highlight")
                            .removeClass("highlightSecondary");
                            break;
                    }
}

//check if if the last placed cell finishes a line, returns boolean
function checkForWin(coordinates) {
    let clicked = Vec4.parse(coordinates);
    for(let i = 0; i < Math.pow(3, 4); i++) {
        // convert i to base-3
        let iterator = toBase3(i);
        // ensure the line we're checking is valid
        if(!ensureAtLeastOneOne(iterator))
            continue;
        // checks whether the clicked cell is in the line
        if(!isInCombination(clicked, iterator))
            continue;

        // check the 4 cells within the line
        var lineCount = 0;
        for(let j = 0; j < 4; j++) {
            let drawIterator = checkLine(iterator, clicked, j);
            // check if the cell contains the right symbol, if so, add to lineCount
            var iteratingElement = document.getElementById(drawIterator.toString());
            if (iteratingElement && Array.from(iteratingElement.querySelector("div").classList).includes(secondaryTurn ? "x" : "o") && iteratingElement.id != coordinates) {
                lineCount++;
            }
        }
        // if the entire line is filled with the right symbol (clicked + 3 extra = 4), mark the game as won
        if (lineCount == 3) {
            highlightWinningPieces(iterator, clicked);
            gameEnded = true;
            removeClasses('highlights');
            return true;
        }
    }
}

// creates a Vec4 to check cells in a line
function checkLine(iterator, selected, j) {
    return new Vec4(
        // = 0: it's static
        // = 1: it's equal to the incrementing j
        // = 2: it's equal to the inverse of j (3 - j)
        iterator.x == 0 ? selected.x : (iterator.x == 1 ? j : (3 - j)),
        iterator.y == 0 ? selected.y : (iterator.y == 1 ? j : (3 - j)),
        iterator.z == 0 ? selected.z : (iterator.z == 1 ? j : (3 - j)),
        iterator.w == 0 ? selected.w : (iterator.w == 1 ? j : (3 - j)),
    );
}

// highlights the last move made
function highlightLastMove() {
    if(lastMove != null)
        removeClasses('lastMove')
        addClass(lastMove, "highlightLastMove");
}

// highlights the winning 4 cells
function highlightWinningPieces(iterator, selected) {
    for(let j = 0; j < 4; j++) {
        let drawIterator = checkLine(iterator, selected, j);
        // adds the winning highlight to the 4 cells of the line
        addClass(drawIterator, "highlightWinning");
    }
}

// highlights all the possible combinations
function highlightPossible(coordinates) {
    // don't highlight if the game has ended
    if (gameEnded) {
        return;
    };
    let selected = Vec4.parse(coordinates); // get a vector of the selected cell

    // goes over all possible lines
    if (!hardMode) {
        for(let i = 0; i < Math.pow(3, 4); i++) {
            // convert i to base-3
            let iterator = toBase3(i);
            // ensure the line we're checking is valid
            if(!ensureAtLeastOneOne(iterator))
                continue;
            // checks whether the hovered cell is in the line
            if(!isInCombination(selected, iterator))
                continue;

            // highlight the 4 cells in the line
            for(let j = 0; j < 4; j++) {
                let drawIterator = checkLine(iterator, selected, j);
                addClass(drawIterator, "highlightSecondary");
            }
        }
        addClass(selected, "highlight");
    }
    // add highlights to the cell that's being hovered
    removeClass(selected, "highlightSecondary");
}

// adds class to element
function addClass(coordinates, cssClass) {
    if (coordinates != null) {
        $(`#${coordinates.toString()} > div`).addClass(cssClass);
    }
}

// removes class from element
function removeClass(coordinates, cssClass) {
    $(`#${coordinates.toString()} > div`).removeClass(cssClass);
}

// converts integer to base-3 Vec4
function toBase3(n) {
    let out = new Vec4(0, 0, 0, 0);

    out.x = n % 3;
    n = Math.floor(n / 3);
    out.y = n % 3;
    n = Math.floor(n / 3);
    out.z = n % 3;
    n = Math.floor(n / 3);
    out.w = n % 3;

    return out;
}

// ensures that at least one value in the vector is 1
function ensureAtLeastOneOne(vec) {
    return vec.x == 1
        || vec.y == 1
        || vec.z == 1
        || vec.w == 1;
}

// check if the selected cell is in the line
function isInCombination(pos, combination) {
    // creates a temporary copy of pos so it won't be overwritten
    let posTemp = pos.clone();

    // inverts the value if it axis is reversed, indicated by a value of 2
    if(combination.x == 2)
        posTemp.x = 3 - posTemp.x;
    if(combination.y == 2)
        posTemp.y = 3 - posTemp.y;
    if(combination.z == 2)
        posTemp.z = 3 - posTemp.z;
    if(combination.w == 2)
        posTemp.w = 3 - posTemp.w;
    
    let num = -1;
    let posTempArray = posTemp.toArray();
    for (let i = 0; i < 4; i++) {
        // if the axis is static, skip it
        if (combination.get(i) == 0)
            continue;
        // only set num if the combination axis isn't 0
        if (num == -1)
            num = posTempArray[i];
        // stop checking if one of the axis doesn't match
        if (posTempArray[i] != num)
            return false;
    }
    return true;
}

// reset the board to start another game
function cleanBoard() {
    removeClasses('highlights');
    removeClasses('pieces');
    lastMove = null
    gameEnded = false
    secondaryTurn = false
    turnDisplay.innerHTML = '<b>Player X</b> is first to play'
}

// scale the screen for smaller devices
boardWidth = 570;
boardHeight = 890;

var root = document.querySelector(':root');

function fitScreen() {
    scaleVertically = window.innerHeight === Math.min((window.innerWidth*boardHeight/boardWidth), window.innerHeight);

    if (window.innerWidth < boardWidth && !scaleVertically) {
        scaleDownStyle = window.innerWidth / boardWidth
        root.style.setProperty('--scale-down', scaleDownStyle)
    } else if (window.innerHeight < boardHeight && scaleVertically) {
        scaleDownStyle = window.innerHeight / boardHeight
        root.style.setProperty('--scale-down', scaleDownStyle)
    } else {
        root.style.setProperty('--scale-down', .95)
    }
}

window.onload = function() {
    fitScreen();
};

window.addEventListener('resize', event => {
    fitScreen();
  });

hardModeToggle = document.getElementById('hardModeToggle');

// console.log(root.style.getPropertyValue('--hp'));
function toggleHardMode() {
    if (!hardMode) {
        hardMode = true
        // root.style.setProperty('--hp', '#e0e7e9') // doesn't work for some reason?
        hardModeToggle.innerHTML = 'Enable Highlights';
    } else {
        hardMode = false
        // root.style.setProperty('--hp', '#96b4ff') // doesn't work for some reason?
        hardModeToggle.innerHTML = 'Disable Highlights';
    }
}