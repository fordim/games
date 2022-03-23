import { Injectable } from '@angular/core';
import { TicTacToeService } from "./tic-tac-toe.service";

@Injectable({
  providedIn: 'root'
})
export class TicTacToeAutoService {

  private nameAI: string = this.serviceManual.playerTwo;
  private cornerIndexes: number[] = [0, 2, 6, 8];
  private centerIndex: number = 4;
  private middleIndexes: number[] = [1, 3, 5, 7];
  private success: number = 200;

  constructor(private serviceManual: TicTacToeService) {
  }

  public move(index: number): boolean | void {
     const errorMassageFromPlayer = this.serviceManual.move(index);
     if (errorMassageFromPlayer) {
       return;
     }

    const indexAI: number = this.chooseMoveForAI(index);
    if (indexAI === this.success) {
      return;
    }

    this.serviceManual.drawOneMove(indexAI);
    this.serviceManual.addNewLog(indexAI);
    this.serviceManual.stepsHistory$.next([...this.serviceManual.stepsHistory$.value, [...this.serviceManual.gameTable$.value]]);
    this.serviceManual.checkGameStatus();
    this.serviceManual.changePlayer();
  }

  private chooseMoveForAI(playerIndex: number): number {
    const gameTable = this.serviceManual.gameTable$.value;
    let moveNumber = TicTacToeAutoService.getMoveNumber(gameTable);

    if (moveNumber === 1) {
      return this.chooseFirstMoveForAI(playerIndex);
    }

    let attackAndDefence = this.chooseAttackOrDefenceForAI();
    if (attackAndDefence !== null) {
      return attackAndDefence;
    }

    if (moveNumber === 2) {
      return this.chooseSecondMoveForAI(playerIndex, gameTable);
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

  private chooseSecondMoveForAI(playerIndex: number, gameTable: string[]): number {
    if (gameTable[this.centerIndex] === this.serviceManual.playerOne) {
      return this.chooseFreeCornerIndex(gameTable) ?? 0;
    }

    //Лайфхак к победе был
    if (playerIndex === 7) {
      return 5;
    }

    return this.chooseFreeMiddleIndex(gameTable) ?? 1;
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

    let checkDefence = this.checkWinCombination(this.serviceManual.playerOne);
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
    const boardWithLines = this.serviceManual.getBoardWithLines();
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
