
#include <iostream>
#include <vector>
#include <random>

using namespace std;

class Minesweeper {
private:
    int rows = 9;
    int cols = 9;
    int numMines;
    vector<vector<char>> board;  // Stores mine placement and adjacent counts
    vector<vector<bool>> revealed; // Tracks revealed cells

public:
    Minesweeper(int mines) : numMines(mines) {
        createboard();
        placemines();
    }

    void createboard() {
        board.resize(rows, vector<char>(cols, '_'));
        revealed.resize(rows, vector<bool>(cols, false)); // Initially all cells hidden
    }

    void placemines() {
        int minesPlaced = 0;
        random_device rd;
        mt19937 gen(rd());
        uniform_int_distribution<> rowDist(0, rows - 1);
        uniform_int_distribution<> colDist(0, cols - 1);

        while (minesPlaced < numMines) {
            int row = rowDist(gen);
            int col = colDist(gen);
            if (board[row][col] != 'M') {
                board[row][col] = 'M';
                minesPlaced++;
            }
        }

        // Update adjacent mine counts for all cells
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (board[i][j] != 'M') {
                    board[i][j] = adjacentmines(i, j) + '0';
                }
            }
        }
    }

    int adjacentmines(int row, int column) {
        int count = 0;
        for (int i = -1; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
                int r = row + i;
                int c = column + j;
                if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] == 'M') {
                    count++;
                }
            }
        }
        return count;
    }
    


    void reveal(int row, int col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols || revealed[row][col]) {
        return; // Out of bounds or already revealed
    }

    revealed[row][col] = true;

    if (board[row][col] == 'M') {
           gameover(false); // Game over (lost)
           return; // Stop further actions
       }  else if (board[row][col] == '0') {
        // Reveal empty area recursively, stopping at non-zero numbers or mines
        for (int i = -1; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
                int nr = row + i;
                int nc = col + j;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                    board[nr][nc] != 'M' && board[nr][nc] != '0') {
                    // Stop recursion at non-zero numbers
                    revealed[nr][nc] = true;
                } else {
                    reveal(nr, nc);
                }
            }
        }
    }
}


    bool win() {
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (board[i][j] != 'M' && !revealed[i][j]) {
                    return false; // Unrevealed non-mine cell found
                }
            }
        }
        return true; // All non-mine cells revealed
    }

    void gameover(bool won) {
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                revealed[i][j] = true; // Reveal all cells
            }
        }
        printboard();
        if (won) {
            cout << "You Win!" << endl;
        } else {
            cout << "Game Over!" << endl;
        }
    }

    void printboard() {
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                cout << (revealed[i][j] ? board[i][j] : '_') << " "; 
            }
            cout << endl;
        }
    }

    bool isValidCell(int row, int col) {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    }

    int countAdjacentFlags(int row, int col) {
        int count = 0;
        for (int i = -1; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
                int newRow = row + i;
                int newCol = col + j;
                if (isValidCell(newRow, newCol) && flagged[newRow][newCol]) {
                    count++;
                }
            }
        }
        return count;
    }

    void flag(int row, int col) {
        if (!revealed[row][col]) {
            flagged[row][col] = !flagged[row][col];
        }
    }

    void chord(int row, int col) {
        if (board[row][col] >= '1' && board[row][col] <= '8') {
            int flagCount = countAdjacentFlags(row, col);
            if (flagCount == board[row][col] - '0') {
                // Chord logic: Reveal adjacent cells
                for (int i = -1; i <= 1; i++) {
                    for (int j = -1; j <= 1; j++) {
                        int newRow = row + i;
                        int newCol = col + j;
                        if (isValidCell(newRow, newCol) && !revealed[newRow][newCol] && !flagged[newRow][newCol]) {
                            reveal(newRow, newCol); 
                        }
                    }
                }
            }
        }
    }
};






int main() {
    int numMines = 10; // Adjust the number of mines as desired
    Minesweeper game(numMines);

    while (true) {
        game.printboard();
        int action;
        cout << "Enter r, f or c to reveal, flag or chording: ";
        cin >> action;
        int row, col;
        cout << "Enter row and column for the reveal, flag or chording action (separated by space): ";
        cin >> row >> col;
        if (action == 'r') {
            game.reveal(row, col);
        } else if (action == 'f') {
            game.flag(row, col);
        } else if (action == 'c') {
            game.chord(row, col);
        }
        

        if (game.win()) {
            game.gameover(true); // Win condition
            break;
        } else if (game.board[row][col] == 'M') {
            game.gameover(false); // Lose condition
            break;
        }
    }

    return 0;
}

