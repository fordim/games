import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {

  public blankGameTable = [ '', '', '', '', '', '', '', '', ''];
  public logGameTable = [];
  public historyOfGame = [];

  public gameTable: string[] = this.blankGameTable.slice(0);
  public logBlock: string[] = this.logGameTable.slice(0);
  public stepsHistory: any = this.historyOfGame.slice(0);
  public actionPlayer = true;
  public firstMove = false;
  public firstMoveAI: boolean = false;

  constructor() { }

  public resetAndDrawBoard () {
    this.gameTable = this.blankGameTable.slice(0);
    this.drawBoard();
    this.clearLog();
    this.stepsHistory = [];
    this.firstMove = false;
    this.firstMoveAI = false;
  };

  public move(index: number): void {
    this.checkFirstMove();

    if (this.gameTable[index] !== ''){
      return alert('Поле уже занято!');
    }

    this.drawOneMove(index);
    this.addNewLog(index);
    this.writeLog();
    this.stepsHistory.push(this.gameTable.slice(0));
    this.checkGameStatus();
    this.changePlayer();
  }

  public stepBackAndDraw () {
    this.logBlock.pop();
    this.stepsHistory.pop();

    if (this.logBlock.length === 0) {
      this.clearLog();
    } else {
      this.writeLog();
    }

    if (this.stepsHistory.length === 0) {
      this.gameTable = this.blankGameTable.slice(0);
    } else {
      this.gameTable = this.stepsHistory[this.stepsHistory.length - 1].slice(0);
    }

    this.drawBoard();
    this.changePlayer();
  };

  private checkFirstMove(): void {
    if (!this.firstMove) {
      this.resetAndDrawBoard();
      this.firstMove = true;
    }
  }

  private drawBoard(): void {
    const gameBlocks = document.getElementsByClassName('game-block');

    for ( let i = 0; i < this.blankGameTable.length; i++){
      gameBlocks[i].innerHTML = this.gameTable[i];
    }
  };

  public drawOneMove(index: number): void {
    const gameBlocks = document.getElementsByClassName('game-block');

    gameBlocks[index].innerHTML = this.nameOfPlayer();
    this.gameTable[index] = this.nameOfPlayer();
  }

  private nameOfPlayer(): string {
    return this.actionPlayer ? 'X' : 'O'
  };

  public changePlayer(): void {
    this.actionPlayer = !this.actionPlayer;
  }

  public checkGameStatus(): void {
    if (this.isPlayerWin()) {
      this.showModal('Победил игрок игравший за: ' + this.nameOfPlayer() + '. Хотите начать новую игру?');
    }

    if (this.isGameEnded()) {
      this.showModal('Ничья, все поля заполнены. Можете начать <<Новую игру>>');
    }
  }

  private isPlayerWin(): boolean {
    const table = this.gameTable;
    const player = this.nameOfPlayer();

    return ((table[0] === player && table[1] === player && table[2] === player) ||
      (table[3] === player && table[4] === player && table[5] === player) ||
      (table[6] === player && table[7] === player && table[8] === player) ||
      (table[0] === player && table[3] === player && table[6] === player) ||
      (table[1] === player && table[4] === player && table[7] === player) ||
      (table[2] === player && table[5] === player && table[8] === player) ||
      (table[0] === player && table[4] === player && table[8] === player) ||
      (table[2] === player && table[4] === player && table[6] === player))
  }

  private isGameEnded(): boolean {
    return this.gameTable.every(function (element: string) {
      return element !== '';
    })
  }

  public addNewLog(index: number): void {
    this.logBlock.push("<p>Походил игрок игравщий за: " + this.nameOfPlayer() + ". В ячейку массива №" + index + "</p>");
  }

  public writeLog(): void {
    const logBlocks = document.getElementsByClassName('block-field-logs');
    logBlocks[0].innerHTML = this.logBlock.join('');
  };

  private clearLog(): void {
    const logBlocks = document.getElementsByClassName('block-field-logs');
    this.logBlock = this.logGameTable.slice(0);
    logBlocks[0].innerHTML = this.logBlock.join('');
  };

  private showModal(textEvent: string): void {
    const modal = Array.from(document.getElementsByClassName('modal') as HTMLCollectionOf<HTMLElement>);
    const blocks = Array.from(document.getElementsByClassName('block') as HTMLCollectionOf<HTMLElement>);
    const root = Array.from(document.getElementsByClassName('root') as HTMLCollectionOf<HTMLElement>);

    modal[0].style.visibility = 'visible';
    blocks[0].classList.add('ban-blocks');
    blocks[1].classList.add('ban-blocks');
    root[0].classList.add('ban-root');

    const modalEvent = Array.from(document.getElementsByClassName('modal-content') as HTMLCollectionOf<HTMLElement>);
    modalEvent[0].innerText = textEvent;
  }

  public resetGameModal() {
    const modal = Array.from(document.getElementsByClassName('modal') as HTMLCollectionOf<HTMLElement>)
    const blocks = Array.from(document.getElementsByClassName('block') as HTMLCollectionOf<HTMLElement>)
    const root = Array.from(document.getElementsByClassName('root') as HTMLCollectionOf<HTMLElement>)

    modal[0].style.visibility = 'hidden';
    blocks[0].classList.remove('ban-blocks');
    blocks[1].classList.remove('ban-blocks');
    root[0].classList.remove('ban-root');

    this.resetAndDrawBoard();
  }
}
