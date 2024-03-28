export default class Minesweeper {
    constructor(mines) {
        this.rows = 9;
        this.cols = 9;
        this.numMines = mines;
        this.board = [];
        this.revealed = [];
        this.flagged = [];
        this.createBoard();
        this.placeMines();
        this.txt=null
    }

    createBoard() {
        for (let i = 0; i < this.rows; i++) {
            this.board.push(new Array(this.cols).fill('_'));
            this.revealed.push(new Array(this.cols).fill(false));
            this.flagged.push(new Array(this.cols).fill(false));
        }
    }

    placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < this.numMines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            if (this.board[row][col] !== 'M') {
                this.board[row][col] = 'M';
                minesPlaced++;
            }
        }

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.board[i][j] !== 'M') {
                    this.board[i][j] = this.adjacentMines(i, j) + '';
                }
            }
        }
    }

    adjacentMines(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const r = row + i;
                const c = col + j;
                if (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === 'M') {
                    count++;
                }
            }
        }
        return count;
    }

    reveal(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols || this.revealed[row][col]) {
            return;
        }
        this.revealed[row][col] = true;

        if (this.board[row][col] === 'M') {
            this.board[row][col] === 'X'
            this.gameOver(false);
            return;
        } else if (this.board[row][col] === '0') {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const nr = row + i;
                    const nc = col + j;
                    if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols && this.board[nr][nc] !== 'M' && this.board[nr][nc] !== '0') {
                        this.revealed[nr][nc] = true;
                    } else {
                        this.reveal(nr, nc);
                    }
                }
            }
        }
        if(this.win()){this.gameOver(true)}
    }

    win() {
        let ct=0

        for(let i=0;i<this.revealed.length;i++){
            for(let j=0;j<this.revealed[i].length;j++){
                if(this.revealed[i][j]) ct+=1
            }
        }
        return ct===this.revealed.length*this.revealed[0].length-this.numMines
    }
    revealall(){
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.revealed[i][j] = true;
            }
        }
    }
    gameOver(won) {
        if(!won) this.revealall()

        if (won) {
            this.txt="You Win!"
            console.log("You Win!");
        } else {
            this.txt="You Lose! Game Over!"
            console.log("Game Over!");
        }
    }

    printBoard() {
        for (let i = 0; i < this.rows; i++) {
            let rowString = "";
            for (let j = 0; j < this.cols; j++) {
                rowString += (this.revealed[i][j] ? this.board[i][j] : '_') + " ";
            }
            console.log(rowString);
        }
    }

    isValidCell(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    countAdjacentFlags(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (this.isValidCell(newRow, newCol) && this.flagged[newRow][newCol]) {
                    count++;
                }
            }
        }
        return count;
    }

    flag(row, col) {
        if (!this.revealed[row][col]) {
            this.flagged[row][col] = !this.flagged[row][col];
        }
    }

    chord(row, col) {
        if (this.board[row][col] >= '1' && this.board[row][col] <= '8') {
            const flagCount = this.countAdjacentFlags(row, col);
            if (flagCount === parseInt(this.board[row][col])) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newRow = row + i;
                        const newCol = col + j;
                        if (this.isValidCell(newRow, newCol) && !this.revealed[newRow][newCol] && !this.flagged[newRow][newCol]) {
                            this.reveal(newRow, newCol);
                        }
                    }
                }
            }
        }
    }
}

