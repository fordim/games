import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {

  private blankGameTable = [ '', '', '', '', '', '', '', '', ''];

  public currentPlayer = true;
  public firstMove = false;

  public playerOne = 'X';
  public playerTwo = 'O';
  public newGame = 'Новая игра';
  public ok = 'Ок'

  public logs$ = new BehaviorSubject<string[]>([]);
  public stepsHistory$ = new BehaviorSubject<string[][]>([]);
  public gameTable$ = new BehaviorSubject<string[]>(this.blankGameTable.slice(0));
  public modal$: Observable<any> = of(false);
  public error$: Observable<any> = of(false);
  public contentTextEvent$: Observable<any> = of('');
  public buttonTextEvent$: Observable<any> = of('');

  constructor() { }

  public resetAndDrawBoard () {
    this.clearBoard();
    this.clearLog();
    this.clearStepsHistory();
    this.firstMove = false;
    this.currentPlayer = true;
  };

  public move(index: number): boolean | void {
    this.checkFirstMove();
    const gameBlocks = this.gameTable$.value;

    if (gameBlocks[index] !== ''){
      this.showModal('Поле уже занято!', true);
      return true
    }

    this.drawOneMove(index);
    this.addNewLog(index);
    this.stepsHistory$.next([...this.stepsHistory$.value, [...this.gameTable$.value]])
    this.checkGameStatus();
    this.changePlayer();
  }

  public oneStepBack() {
    let logs = this.logs$.value;
    let stepHistory = this.stepsHistory$.value;

    logs.pop();
    stepHistory.pop();

    if (stepHistory.length === 0) {
      this.gameTable$.next(this.blankGameTable.slice(0));
    } else {
      this.gameTable$.next(stepHistory[stepHistory.length - 1].slice(0))
    }

    this.logs$.next(logs);
    this.stepsHistory$.next(stepHistory);
    this.changePlayer();
  };

  private checkFirstMove(): void {
    if (!this.firstMove) {
      this.resetAndDrawBoard();
      this.firstMove = true;
    }
  }

  public drawOneMove(index: number): void {
    const gameBlocks = this.gameTable$.value;
    gameBlocks[index] = this.nameOfPlayer();
    this.gameTable$.next(gameBlocks);
  }

  private nameOfPlayer(): string {
    return this.currentPlayer ? this.playerOne : this.playerTwo;
  };

  public changePlayer(): void {
    this.currentPlayer = !this.currentPlayer;
  }

  public checkGameStatus(): void {
    if (this.isPlayerWin()) {
      return this.showModal(`Победил игрок игравший за: ${this.nameOfPlayer()}. Хотите начать новую игру?`);
    }

    if (this.isGameEnded()) {
      return this.showModal(`Ничья, все поля заполнены. Можете начать <<Новую игру>>`);
    }
  }

  private isPlayerWin(): boolean {
    const boardWithLines = this.getBoardWithLines();
    const winLine = [this.nameOfPlayer(), this.nameOfPlayer(), this.nameOfPlayer()];

    for (let i = 0; i < boardWithLines.length; i++) {
      let line = boardWithLines[i];
      if (winLine.toString() === line.toString()) {
        return true;
      }
    }

    return false;
  }

  private isGameEnded(): boolean {
    return this.gameTable$.value.every(function (element: string) {
      return element !== '';
    })
  }

  public addNewLog(index: number): void {
    let log = `Походил игрок игравщий за: ${this.nameOfPlayer()}. В ячейку массива №${index}`;
    this.logs$.next([...this.logs$.value, log]);
  }

  private clearBoard(): void {
    this.gameTable$.next(this.blankGameTable.slice(0));
  };

  private clearLog(): void {
    this.logs$.next([]);
  };

  private clearStepsHistory(): void {
    this.stepsHistory$.next([])
  };


  public showModal( textEvent: string, error: boolean = false ): void {
    this.modal$ = this.modal$.pipe(map(() => true));
    this.contentTextEvent$ = this.modal$.pipe(map(() => textEvent));
    this.buttonTextEvent$ = this.modal$.pipe(map(() => this.newGame));

    if (error) {
      this.error$ = this.error$.pipe(map(() => error));
      this.buttonTextEvent$ = this.modal$.pipe(map(() => this.ok));
      return;
    }
  }

  public closeModal() {
    this.modal$ = this.modal$.pipe(map(() => false));
    this.error$ = this.error$.pipe(map(() => false));
  }

  public getBoardWithLines(): string[][] {
    const gameTable = this.gameTable$.value;
    const lines = [];
    for ( let i = 0, y = 0, k = 3; i < gameTable.length - 1; i = i + 3, y++, k++){
      lines[y] = [gameTable[i], gameTable[i + 1], gameTable[i + 2]];
      lines[k] = [gameTable[y], gameTable[y + 3], gameTable[y + 6]];
    }

    lines.push([gameTable[0], gameTable[4], gameTable[8]]);
    lines.push([gameTable[2], gameTable[4], gameTable[6]]);

    return lines;
  }
}
