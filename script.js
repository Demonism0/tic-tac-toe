const gameBoard = (function () {
    let markers = [];
    let turnNum;

    const empty = () => {
        turnNum = 0;
        markers = ['','','','','','','','',''];
    };

    const display = () => {
        board.innerHTML = '';
        status.textContent = `${player1.username} goes first`;
        for (let i=0; i<9; i++) {
            let tile = document.createElement('div');
            tile.textContent = markers[i];
            tile.dataset.index = i;
            tile.setAttribute('class', 'tile');
            board.appendChild(tile);
            tile.addEventListener('click', () => {
                if (game.isRunning()) {
                    placeMarker(tile);
                    checkWin(Number(tile.dataset.index));
                }
            });
        }
    };

    const placeMarker = (tile) => {
        if (tile.textContent === '') {
            if (turnNum % 2 == 0) {
                tile.textContent = player1.marker;
                markers.splice(Number(tile.dataset.index), 1, player1.marker);
                turnNum++;
                status.textContent = `It is ${player2.username}'s turn`;
            } else if (turnNum % 2 == 1) {
                tile.textContent = player2.marker;
                markers.splice(Number(tile.dataset.index), 1, player2.marker);
                turnNum++;
                status.textContent = `It is ${player1.username}'s turn`;
            }
        }
    };

    const checkWin = (index) => {
        if (markers[0] && markers[0]===markers[1] && markers[1]===markers[2]||
            markers[3] && markers[3]===markers[4] && markers[4]===markers[5]||
            markers[6] && markers[6]===markers[7] && markers[7]===markers[8]||
            markers[0] && markers[0]===markers[3] && markers[3]===markers[6]||
            markers[1] && markers[1]===markers[4] && markers[4]===markers[7]||
            markers[2] && markers[2]===markers[5] && markers[5]===markers[8]||
            markers[0] && markers[0]===markers[4] && markers[4]===markers[8]||
            markers[2] && markers[2]===markers[4] && markers[4]===markers[6]) {
            if (markers[index] === player1.marker) {
                result.textContent = `${player1.username} wins!`
                game.end();
            } else if (markers[index] === player2.marker) {
                result.textContent = `${player2.username} wins!`
                game.end();
            }
        } else if (!markers.includes('')) {
            result.textContent = "It's a tie!"
            game.end()
        }
    };

    const board = document.querySelector('.board');
    const result = document.querySelector('.result');
    const status = document.querySelector('.status');
    
    return { empty, display };
})();

const game = (function () {
    const start = () => {
        running = true;
        gameBoard.empty();
        gameBoard.display();
    }

    const end = () => {
        running = false;
        dialogEnd.showModal();
    }

    let running;
    const isRunning = () => running;

    const dialogStart = document.querySelector('.begin');
    const player1Input = document.querySelector('#player1');
    const player2Input = document.querySelector('#player2');
    const startBtn = document.querySelector('.start');

    startBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (!player1Input.value || !player2Input.value) {
            alert('Please enter a username.')
        } 
        player1 = User(player1Input.value, 'X');
        player2 = User(player2Input.value, 'O');
        dialogStart.close();
        start()
    })
    dialogStart.showModal();

    const dialogEnd = document.querySelector('.end');
    const againBtn = document.querySelector('.again');

    againBtn.addEventListener('click', () => {
        dialogEnd.close();
        dialogStart.showModal();
    })

    return { start, end, isRunning };
})();

function User (username, marker) {
    return { username, marker };
}

let player1;
let player2;