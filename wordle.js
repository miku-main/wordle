var height = 6; // number of guesses
var width = 5; // length of the word

var row = 0; // current guess (attempt #)
var col = 0; // current letter for that attempt

var gameOver = false;
var word = "SQUID";

window.onload = function() {
    initialize();
}

function initialize() {
    // Creating the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile"></span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // Listen for key press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        // alert(e.code);
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currentTile = document.getElementById(row.toString() + "-" + col.toString());
                if (currentTile.innerText == "") {
                    currentTile.innerText = e.code[3];
                    col +=1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -= 1;
            }
            let currentTile = document.getElementById(row.toString() + "-" + col.toString());
            currentTile.innerText = "";
        }
        else if (e.code == "Enter") {
            update();
            row += 1; // start new row
            col = 0; // start at 0 for new row
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currentTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currentTile.innerText;

        // Is it in the correct position?
        if (word[c] == letter) {
            currentTile.classList.add("correct");
            correct += 1;
        }
        // Is it in the word?
        else if (word.includes(letter)) {
            currentTile.classList.add("present");
        }
        // Not in the word
        else {
            currentTile.classList.add("absent");
        }

        if (correct == width) {
            gameOver = true;
        }
    }
}