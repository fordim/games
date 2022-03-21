import { Injectable } from '@angular/core';
import { TicTacToeService } from "./tic-tac-toe.service";

@Injectable({
  providedIn: 'root'
})
export class TicTacToeAutoService {

  private nameAI: string = 'O';
  private namePlayer: string = 'X';
  private cornerIndexes: number[] = [0, 2, 6, 8];
  private centerIndex: number = 4;
  private middleIndexes: number[] = [1, 3, 5, 7];

  constructor(private serviceManual: TicTacToeService) {

  }

  public move(index: number): void {
    this.serviceManual.move(index);

    const indexAI = this.chooseMoveForAI(index);

    this.serviceManual.drawOneMove(indexAI);
    this.serviceManual.addNewLog(indexAI);
    this.serviceManual.writeLog();
    this.serviceManual.stepsHistory.push(this.serviceManual.gameTable.slice(0));
    this.serviceManual.checkGameStatus();
    this.serviceManual.changePlayer();
  }

  private chooseMoveForAI(playerIndex: number): number {
    const gameTable = this.serviceManual.gameTable;

    if (!this.serviceManual.firstMoveAI) {
      return this.chooseFirstMoveForAI(playerIndex);
    }

    return this.chooseNextMoveForAI(playerIndex);
  }

  private chooseFirstMoveForAI(playerIndex: number): number {
    this.serviceManual.firstMoveAI = true;

    if (playerIndex === this.centerIndex) {
      return this.cornerIndexes[Math.floor(Math.random() * this.cornerIndexes.length)];
    }

    return this.centerIndex;
  }

  private chooseNextMoveForAI(playerIndex: number): number {
    const gameTable = this.serviceManual.gameTable;

    const winCombinationOne = ['', this.nameAI, this.nameAI].toString();
    const winCombinationTwo = [this.nameAI, '', this.nameAI].toString();
    const winCombinationThree = [this.nameAI, this.nameAI, ''].toString();
    const winCombinations = [ ['', this.nameAI, this.nameAI], [this.nameAI, '', this.nameAI], [this.nameAI, this.nameAI, ''] ];

    const lines = [];
    for ( let i = 0, y = 0, k = 3; i < gameTable.length - 1; i = i + 3, y++, k++){
      lines[y] = [gameTable[i], gameTable[i + 1], gameTable[i + 2]];
      lines[k] = [gameTable[y], gameTable[y + 3], gameTable[y + 6]];
    }

    lines.push([gameTable[0], gameTable[4], gameTable[8]]);
    lines.push([gameTable[2], gameTable[4], gameTable[6]]);

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (winCombinations.some(array => array.toString() === line.toString())) {
        console.log('dsfdsfdsfdss');
        switch (lines[i].toString()) {
          case winCombinationOne:
            console.log('1');
            return TicTacToeAutoService.chooseWinAnswerCombinationOne(i);
          case winCombinationTwo:
            console.log('2');
            return TicTacToeAutoService.chooseWinAnswerCombinationTwo(i);
          case winCombinationThree:
            console.log('3');
            return TicTacToeAutoService.chooseWinAnswerCombinationThree(i)
        }
      }
    }

    return 1;
  }

  private static chooseWinAnswerCombinationOne(index: number): number {
    switch (index) {
      case 0:
      case 3:
      case 6:
        return 0;
      case 1:
        return 3;
      case 2:
        return 6;
      case 4:
        return 1;
      case 5:
      case 7:
        return 2;
    }

    //For return
    return 0;
  }

  private static chooseWinAnswerCombinationTwo(index: number): number {
    switch (index) {
      case 0:
        return 1;
      case 1:
      case 4:
      case 6:
      case 7:
        return 4;
      case 2:
        return 7;
      case 3:
        return 3;
      case 5:
        return 5;
    }

    //For return
    return 0;
  }

  private static chooseWinAnswerCombinationThree(index: number): number {
    switch (index) {
      case 0:
        return 2;
      case 1:
        return 5;
      case 2:
      case 5:
      case 6:
        return 8;
      case 3:
      case 7:
        return 6;
      case 4:
        return 7
    }

    //For return
    return 0;
  }
}
