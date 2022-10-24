(function () {
    "use strict";

    const blueplanet = "./Images/BluePlanet.png";
    const earth = "./Images/earth.png";
    const jupiter = "./Images/jupiter.png";
    const moon = "./Images/Moon.png";
    const saturn = "./Images/saturn.png"
    var turnimage = document.createElement('img');
    var player = earth;


    let gameActive = true;
    let currentPlayer = "You"; // two players are User and Computer

    var gameCells;
    var gameStatus;


    window.addEventListener("load", init);


    function init() {

        menuview();
        let bp = document.getElementById('blueplanet');
        let jup = document.getElementById('jupiter');
        let ea = document.getElementById('earth');
        let sat = document.getElementById('saturn');

        let player;
        sat.addEventListener('click', () => {
            decidePlanet('saturn')
        });
        jup.addEventListener('click', () => {
            decidePlanet('jupiter')
        });
        ea.addEventListener('click', () => {
            decidePlanet('earth')
        });
        bp.addEventListener('click', () => {
            decidePlanet('blueplanet')
        });

        gameCells = document.querySelectorAll('.cell');

        gameStatus = document.querySelector('.game-status');

        restartGame();

        let button = document.querySelector('.game-restart');
        button.addEventListener("click", restartGame);

        for (let i = 0; i < gameCells.length; i++) {
            gameCells[i].addEventListener("click", place_a_planet);
        }


    }

    /**
     * Reset the Game Board and Game Status
     * 
    */
    function restartGame() {
        // reset the variables for game status 
        gameActive = true;
        currentPlayer = "You";
        let gameCells = document.querySelectorAll('.cell');
        // reset the game board
        for (let i = 0; i < gameCells.length; i++) {

            gameCells[i].innerHTML = "";
            gameCells[i].classList.remove('You');
            gameCells[i].classList.remove('Computer');

        }


        // reset the game status
        let gameStatus = document.querySelector('.game-status');

        gameStatus.innerHTML = "";
        turnimage.src = player;
    }

    function decidePlanet(planetname) {
        if (planetname == 'saturn') {
            player = saturn;
        } else if (planetname == 'earth') {
            player = earth;
        } else if (planetname == 'jupiter') {
            player = jupiter;
        } else if (planetname == 'blueplanet') {
            player = blueplanet;
        }
        turnimage.src = player;
        let parent = document.querySelector('#restart');
        parent.appendChild(turnimage);
        gameview();
    }

    function computerturn() {
        if (!gameActive) {
            alert("The game is finished. Please restart!")
            return;
        } else {
            let image = document.createElement('img');

            image.src = moon;
            image.classList.add('token');
            let selected = Math.floor(Math.random() * 9);
            while (gameCells[selected].childNodes.length !== 0) {
                selected = Math.floor(Math.random() * 9);
            }
            gameCells[selected].appendChild(image);


            gameCells[selected].classList.add(currentPlayer);

            // check winner
            if (checkWinner()) {
                // current player win the game
                // end the game
                gameActive = false;

                // update gameStatus
                gameStatus.textContent = `${currentPlayer} won the game!`;
            }
            else if (checkDraw()) {
                // The game is a draw
                // end the game
                gameActive = false;

                // update gameStatus
                gameStatus.textContent = 'The game is a draw!';
            }
            else {

                currentPlayer = 'You';
                turnimage.src = player;
                gameStatus.textContent = `Your turn ...`;

            }
        }
    }

    /**
     * Place a token on the game board
     * change current player
     * 
    */
    function place_a_planet() {
        if (!gameActive) {
            alert("The game is finished. Please restart!")
        } else if (this.childNodes.length > 0) {
            alert("This cell has been taken. Try another cell! ")
        } else {
            let image = document.createElement('img');

            if (currentPlayer == 'You') {
                image.src = player;
            } else image.src = moon;
            image.classList.add('token');


            console.log(this);

            this.appendChild(image);


            this.classList.add(currentPlayer);

            // check winner
            if (checkWinner()) {
                // current player win the game
                // end the game
                gameActive = false;

                // update gameStatus
                gameStatus.textContent = `${currentPlayer} won the game!`;
            }
            else if (checkDraw()) {
                // The game is a draw
                // end the game
                gameActive = false;

                // update gameStatus
                gameStatus.textContent = 'The game is a draw!';
            }
            else {

                if (currentPlayer == 'You') {
                    currentPlayer = 'Computer';
                    turnimage.src = moon;
                    gameStatus.textContent = `${currentPlayer}'s turn ...`;
                    let timerID = setTimeout(() => {
                        computerturn();
                    }, 1500)
                }
                else if (currentPlayer == 'Computer') {
                    currentPlayer = 'You';
                    turnimage.src = player;
                    gameStatus.textContent = `Your turn ...`;
                }
            }
        }
    }

    /**
     * Check whether current player is the winner
     * @return true -- current player is the winner
     */
    function checkWinner() {
        if (checkRows() || checkColumns() || checkDiagonals()) {
            return true;
        }
        return false;
    }

    /**
     * Check three rows to find if current player is the winner
     * @return true -- current player is the winner
     */
    function checkRows() {
        // check all the rows
        for (let i = 0; i < 3; i++) {
            if (gameCells[i * 3 + 0].classList.contains(currentPlayer) &&
                gameCells[i * 3 + 1].classList.contains(currentPlayer) &&
                gameCells[i * 3 + 2].classList.contains(currentPlayer)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check three columns to find if current player is the winner
     * @return true -- current player is the winner
     */
    function checkColumns() {
        // check all the columns
        for (let j = 0; j < 3; j++) {
            if (gameCells[j].classList.contains(currentPlayer) &&
                gameCells[3 + j].classList.contains(currentPlayer) &&
                gameCells[6 + j].classList.contains(currentPlayer)) {
                return true;
            }
        }
    }

    /**
     * Check two diagonals to find if current player is the winner
     * @return true -- current player is the winner
     */
    function checkDiagonals() {
        // check two diagonals
        if (gameCells[0].classList.contains(currentPlayer) &&
            gameCells[4].classList.contains(currentPlayer) &&
            gameCells[8].classList.contains(currentPlayer)) {
            return true;
        }
        if (gameCells[2].classList.contains(currentPlayer) &&
            gameCells[4].classList.contains(currentPlayer) &&
            gameCells[6].classList.contains(currentPlayer)) {
            return true;
        }
        return false;
    }

    /**
     * When there's no winner, this function checks
     * if the game is a draw 
     * @return true -- the game is a draw
     */
    function checkDraw() {
        for (let i = 0; i < gameCells.length; i++) {
            if (gameCells[i].childNodes.length === 0) {
                return false;
            }
        }
        return true;
    }

    function menuview() {
        let gameview = document.getElementById('gameview');
        gameview.classList.add('hide');
        let menuview = document.getElementById('pregameview');
        menuview.classList.remove('hide');
    }

    function gameview() {
        let gameview = document.getElementById('gameview');
        let menuview = document.getElementById('pregameview');
        gameview.classList.remove('hide');
        menuview.classList.add('hide');
    }

})();
