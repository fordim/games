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
  private error: number = 500;
  private success: number = 200;

  constructor(private serviceManual: TicTacToeService) {

  }

  public move(index: number): string | void {
     const errorMassageFromPlayer = this.serviceManual.move(index);

     if (errorMassageFromPlayer) {
       return alert(errorMassageFromPlayer);
     }

    const indexAI: number  = this.chooseMoveForAI(index);

    if (indexAI === this.error) {
      return 'Невозможно выбрать поле, куда походить';
    }

    if (indexAI === this.success) {
      return;
    }

    this.serviceManual.drawOneMove(indexAI);
    this.serviceManual.addNewLog(indexAI);
    this.serviceManual.writeLog();
    this.serviceManual.stepsHistory.push(this.serviceManual.gameTable.slice(0));
    this.serviceManual.checkGameStatus();
    this.serviceManual.changePlayer();
  }

  private chooseMoveForAI(playerIndex: number): number {
    if (!this.serviceManual.moveAi[0]) {
      this.addOneMoveAI();
      return this.chooseFirstMoveForAI(playerIndex);
    }

    let attackAndDefence = this.chooseNextMoveForAI();
    if (attackAndDefence !== null) {
      this.addOneMoveAI();
      return attackAndDefence;
    }

    if (!this.serviceManual.moveAi[1]) {
      this.addOneMoveAI();
      return this.chooseSecondMoveForAI(playerIndex);
    }

    let otherMove = this.chooseOtherMove();
    if (otherMove !== this.success) {
      this.addOneMoveAI();
      return otherMove;
    }

    if (otherMove === this.success) {
      return this.success;
    }

    return this.error;
  }

  private chooseFirstMoveForAI(playerIndex: number): number {
    if (playerIndex === this.centerIndex) {
      this.serviceManual.isFirstPlayerMoveCenter = true;
    }

    if (playerIndex === this.centerIndex) {
      return this.cornerIndexes[Math.floor(Math.random() * this.cornerIndexes.length)];
    }

    return this.centerIndex;
  }

  private chooseSecondMoveForAI(playerIndex: number): number {
    if (this.serviceManual.isFirstPlayerMoveCenter) {
      return this.chooseFreeCornerIndex() ?? 0;
    }

    //Лайфхак к победе был
    if (playerIndex === 7) {
      return 5;
    }

    return this.chooseFreeMiddleIndex() ?? 1;
  }

  private chooseOtherMove(): number {
    for ( let i = 0; i < this.serviceManual.gameTable.length; i++ ) {
      if (this.serviceManual.gameTable[i] === '') {
        return i;
      }
    }

    // Поля закончились, ничья
    return this.success;
  }

  private chooseNextMoveForAI(): number | null {
    let checkAttack = this.checkWinCombination(this.nameAI);
    if (checkAttack !== null) {
      return checkAttack;
    }

    let checkDefence = this.checkWinCombination(this.namePlayer);
    if (checkDefence !== null) {
      return checkDefence;
    }

    return null
  }

  private addOneMoveAI(): void {
    for ( let i = 0; i < this.serviceManual.moveAi.length; i++ ) {
      if (!this.serviceManual.moveAi[i]) {
        this.serviceManual.moveAi[i] = true;
        break;
      }
    }
  }

  private chooseFreeCornerIndex(): number | void {
    const gameTable = this.serviceManual.gameTable;

    for ( let i = 0; i < 4; i++ ) {
      if (gameTable[this.cornerIndexes[i]] === '') {
        return this.cornerIndexes[i];
      }
    }
  }

  private chooseFreeMiddleIndex(): number | void {
    const gameTable = this.serviceManual.gameTable;

    for ( let i = 0; i < 4; i++ ) {
      if (gameTable[this.middleIndexes[i]] === '') {
        return this.middleIndexes[i];
      }
    }
  }

  private checkWinCombination(playerName: string): number | null{
    const gameTable = this.serviceManual.gameTable;

    const winCombinationOne = ['', playerName, playerName].toString();
    const winCombinationTwo = [playerName, '', playerName].toString();
    const winCombinationThree = [playerName, playerName, ''].toString();
    const winCombinations = [ ['', playerName, playerName], [playerName, '', playerName], [playerName, playerName, ''] ];

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
        switch (lines[i].toString()) {
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
