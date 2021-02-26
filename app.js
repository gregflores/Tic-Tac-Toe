const boxes = Array.from(document.getElementsByClassName('box'));
const playText = document.getElementById('playText');
const restartbtn = document.getElementById('restartBtn');
const spaces = []
const O_TEXT = "0";
const X_TEXT = "X";
let currentPlayer = O_TEXT;

console.log(boxes);
const drawBoard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';
        if (index < 3) {
            styleString += `border-bottom: 3px solid var(--purple);`;
        }
        if (index % 3 === 0) {
            styleString += `border-right: 3px solid var(--purple);`;
        }
        else if (index % 3 === 2) {
            styleString += `border-left: 3px solid var(--purple);`;
        }
        if (index > 5) {
            styleString += `border-top: 3px solid var(--purple);`;
        }
        box.style = styleString;
        box.addEventListener('click', boxClicked);

    });
};

const boxClicked = (e) => {
    const id = e.target.id;
    // console.log(`${id} was clicked`);
    if(!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if(playerHasWon()) {
            playText.innerText = `${currentPlayer} has won!`;
            return;
        }
        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    }
};

const playerHasWon = () => {
    const winPatterns = [ 
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];

      const hasWon = winPatterns.find(pattern => currentPlayer === spaces[pattern[0]] && currentPlayer === spaces[pattern[1]] && currentPlayer === spaces[pattern[2]])
      if(hasWon) return true;
}


const restart = () => {
    spaces.forEach((space, index) => spaces[index] = null);
    boxes.forEach(box => box.innerText = '');
    playText.innerText = `Let's Play!`
    currentPlayer = O_TEXT;
}

restartbtn.addEventListener('click', restart);
restart();
drawBoard();