import { BLACK, WHITE } from "./constants";

class Board {
  private board;
  private whiteHome4x3;
  private blackHome4x3;

  constructor() {
    this.board = this.generateChessBoard();
    this.whiteHome4x3 = ["A1", "B1", "C1", "D1", "A2", "B2", "C2", "D2", "A3", "B3", "C3", "D3"];
    this.blackHome4x3 = ["H8", "G8", "F8", "E8", "H7", "G7", "F7", "E7", "H6", "G6", "F6", "E6"];
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
  public getHome = (color: string) => {
    if (color === WHITE) {
      return this.whiteHome4x3;
    }
    if (color === BLACK) {
      return this.blackHome4x3;
    }
  }
}

export const board = new Board();