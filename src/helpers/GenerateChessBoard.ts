class Board {
  private board;

  constructor() {
    this.board = this.generateChessBoard()
  }

  private generateChessBoard = () => {
    const boardSize = 8;
    const board = [];
  
    for (let row = 8; row > 0; row--) {
      for (let col = 1; col <= boardSize; col++) {
        const coordinate = String.fromCharCode(64 + col) + row;
        const color = (row + col) % 2 === 0 ? "black" : "white";
  
        board.push({ coordinate, color });
      }
    }
  
    return board;
  }

  public getBoard = () => {
    return this.board;
  }
}

export const board = new Board();