import { Injectable } from '@angular/core';
import { TicTacToeService } from "./tic-tac-toe.service";

@Injectable({
  providedIn: 'root'
})
export class TicTacToeAutoService {

  private nameAI: string = this._serviceManual.playerTwo;
  private cornerIndexes: number[] = [0, 2, 6, 8];
  private centerIndex: number = 4;
  private middleIndexes: number[] = [1, 3, 5, 7];
  private success: number = 200;

  constructor(private _serviceManual: TicTacToeService) {
  }

  public move(index: number): boolean | void {
     const errorMassageFromPlayer = this._serviceManual.move(index);
     if (errorMassageFromPlayer) {
       return;
     }

    const indexAI: number = this.chooseMoveForAI(index);
    if (indexAI === this.success) {
      return;
    }

    this._serviceManual.drawOneMove(indexAI);
    this._serviceManual.addNewLog(indexAI);
    this._serviceManual.stepsHistory$.next([...this._serviceManual.stepsHistory$.value, [...this._serviceManual.gameTable$.value]]);
    this._serviceManual.checkGameStatus();
    this._serviceManual.changePlayer();
  }

  private chooseMoveForAI(playerIndex: number): number {
    const gameTable = this._serviceManual.gameTable$.value;
    let moveNumber = TicTacToeAutoService.getMoveNumber(gameTable);

    if (moveNumber === 1) {
      return this.chooseFirstMoveForAI(playerIndex);
    }

    let attackAndDefence = this.chooseAttackOrDefenceForAI();
    if (attackAndDefence !== null) {
      return attackAndDefence;
    }

    if (moveNumber === 2) {
      return this.chooseSecondMoveForAI(gameTable);
    }

    let otherMove = this.chooseOtherMove(gameTable);
    if (otherMove !== this.success) {
      return otherMove;
    }

    return this.success;
  }

  private static getMoveNumber(gameTable: string[]): number {
    let counter = 1;
    for (let i = 0; i < gameTable.length; i++) {
      if (gameTable[i] !== '') {
        counter++;
      }
    }

    return counter / 2;
  }

  private chooseFirstMoveForAI(playerIndex: number): number {
    if (playerIndex === this.centerIndex) {
      return this.cornerIndexes[Math.floor(Math.random() * this.cornerIndexes.length)];
    }

    return this.centerIndex;
  }

  private chooseSecondMoveForAI(gameTable: string[]): number {
    if (gameTable[this.centerIndex] === this._serviceManual.playerOne) {
      return this.chooseFreeCornerIndex(gameTable) ?? 0;
    }

    const hardcodeMove = this.chooseSecondMoveForAIHardcode(gameTable);
    if (hardcodeMove !== null) {
      return hardcodeMove;
    }

    return this.chooseFreeMiddleIndex(gameTable) ?? 1;
  }

  private chooseSecondMoveForAIHardcode(gameTable: string[]): number | null {

    // | - - X | - X - | - - - | X - - | - - - | - X - | X - - | - - X |
    // | X O - | - O - | - O X | - 0 - | X O - | - O - | - O X | - O - |
    // | - - - | - - X | X - - | - X - | - - X | X - - | - - - | - X - |
    if (gameTable[2] === this._serviceManual.playerOne && gameTable[3] === this._serviceManual.playerOne) {
      return TicTacToeAutoService.randomNumber([0, 7]);
    }

    if (gameTable[1] === this._serviceManual.playerOne && gameTable[8] === this._serviceManual.playerOne) {
      return TicTacToeAutoService.randomNumber([2, 3]);
    }

    if (gameTable[5] === this._serviceManual.playerOne && gameTable[6] === this._serviceManual.playerOne) {
      return TicTacToeAutoService.randomNumber([1, 8]);
    }

    if (gameTable[0] === this._serviceManual.playerOne && gameTable[7] === this._serviceManual.playerOne) {
      return TicTacToeAutoService.randomNumber([5, 6]);
    }

    if (gameTable[3] === this._serviceManual.playerOne && gameTable[8] === this._serviceManual.playerOne) {
      return TicTacToeAutoService.randomNumber([1, 6]);
    }

    if (gameTable[1] === this._serviceManual.playerOne && gameTable[6] === this._serviceManual.playerOne) {
      return TicTacToeAutoService.randomNumber([0, 5]);
    }

    if (gameTable[0] === this._serviceManual.playerOne && gameTable[5] === this._serviceManual.playerOne) {
      return TicTacToeAutoService.randomNumber([2, 7]);
    }

    if (gameTable[2] === this._serviceManual.playerOne && gameTable[7] === this._serviceManual.playerOne) {
      return TicTacToeAutoService.randomNumber([3, 8]);
    }

    // | - X - | - X - | - - - | - - - |
    // | X O - | - O X | X O - | - 0 X |
    // | - - - | - - - | - X - | - X - |
    if (gameTable[1] === this._serviceManual.playerOne && gameTable[3] === this._serviceManual.playerOne) {
      return 0;
    }

    if (gameTable[3] === this._serviceManual.playerOne && gameTable[7] === this._serviceManual.playerOne) {
      return 6;
    }

    if (gameTable[7] === this._serviceManual.playerOne && gameTable[5] === this._serviceManual.playerOne) {
      return 8;
    }

    if (gameTable[5] === this._serviceManual.playerOne && gameTable[1] === this._serviceManual.playerOne) {
      return 2;
    }

    return null;
  }

  private static randomNumber(array: number[]): number
  {
    const randNum = Math.floor(Math.random() * array.length);
    return array[randNum];
  }

  private chooseOtherMove(gameTable: string[]): number {
    for ( let i = 0; i < gameTable.length; i++ ) {
      if (gameTable[i] === '') {
        return i;
      }
    }

    // Поля закончились, ничья
    return this.success;
  }

  private chooseAttackOrDefenceForAI(): number | null {
    let checkAttack = this.checkWinCombination(this.nameAI);
    if (checkAttack !== null) {
      return checkAttack;
    }

    let checkDefence = this.checkWinCombination(this._serviceManual.playerOne);
    if (checkDefence !== null) {
      return checkDefence;
    }

    return null
  }

  private chooseFreeCornerIndex(gameTable: string[]): number | void {
    for ( let i = 0; i < 4; i++ ) {
      if (gameTable[this.cornerIndexes[i]] === '') {
        return this.cornerIndexes[i];
      }
    }
  }

  private chooseFreeMiddleIndex(gameTable: string[]): number | void {
    for ( let i = 0; i < 4; i++ ) {
      if (gameTable[this.middleIndexes[i]] === '') {
        return this.middleIndexes[i];
      }
    }
  }

  private checkWinCombination(playerName: string): number | null {
    const boardWithLines = this._serviceManual.getBoardWithLines();
    const winCombinationOne = ['', playerName, playerName].toString();
    const winCombinationTwo = [playerName, '', playerName].toString();
    const winCombinationThree = [playerName, playerName, ''].toString();
    const winCombinations = [ ['', playerName, playerName], [playerName, '', playerName], [playerName, playerName, ''] ];

    for (let i = 0; i < boardWithLines.length; i++) {
      let line = boardWithLines[i];
      if (winCombinations.some(array => array.toString() === line.toString())) {
        switch (boardWithLines[i].toString()) {
          case winCombinationOne:
            return TicTacToeAutoService.chooseWinAnswerCombinationOne(i);
          case winCombinationTwo:
            return TicTacToeAutoService.chooseWinAnswerCombinationTwo(i);
          case winCombinationThree:
            return TicTacToeAutoService.chooseWinAnswerCombinationThree(i)
        }
      }
    }

    return null;
  }

  private static chooseWinAnswerCombinationOne(index: number): number | null {
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

    return null;
  }

  private static chooseWinAnswerCombinationTwo(index: number): number | null {
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

    return null;
  }

  private static chooseWinAnswerCombinationThree(index: number): number | null {
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

    return null;
  }
}
