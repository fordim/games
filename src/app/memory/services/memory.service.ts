import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from "rxjs";
import { LEVEL_FIVE, LEVEL_FOUR, LEVEL_ONE, LEVEL_THREE, LEVEL_TWO } from "./const";

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  gameTable$ = new BehaviorSubject<any[]>([]);
  savedTable$ = new BehaviorSubject<any[]>([]);
  savedMatchesTable$ = new BehaviorSubject<any[]>([]);

  levelOfGame: number = 1;
  levelsOfGame: number[] = [ 1, 2, 3, 4, 5 ];
  oneMoveIndexes: number[] = [];
  counter$ = new BehaviorSubject<number>(0);
  levelModal$: Observable<any> = of(false);
  endGameModal$: Observable<any> = of(false);
  contentTextEvent$: Observable<any> = of('');

  constructor() { }

  public move(index: number) {
    // Защита, от нажатия на одну и ту же карточку
    if (index === this.oneMoveIndexes[0]) {
      return;
    }

    // Защита, от нажатия уже на открыте поля
    if (this.savedMatchesTable$.value[index] !== '') {
      return;
    }

    this.turnOverOneCardFront(index);
    if (this.checkMatch()) {
      this.saveMatch();
      this.clearOneMoveIndexes();
      this.addOneMoveToCounter();

      if (this.isGameEnded()) {
        this.showEndGameModal();
      }
      return;
    }

    if (this.oneMoveIndexes.length === 2) {
      setTimeout(() => {
        this.turnOverTwoCardsBack();
        this.clearOneMoveIndexes();
        this.addOneMoveToCounter();
      }, 500);
    }
  }

  public resetBoard() {
    this.clearBoard();
    this.clearOneMoveIndexes();
    this.clearCounter();

    setTimeout(() => {
      this.turnOverCards()
    }, 1500);
  }

  private clearBoard(): void {
    switch (this.levelOfGame) {
      case 1:
        this.gameTable$.next(LEVEL_ONE.sort(() => Math.random() - 0.5));
        break;
      case 2:
        this.gameTable$.next(LEVEL_TWO.sort(() => Math.random() - 0.5));
        break;
      case 3:
        this.gameTable$.next(LEVEL_THREE.sort(() => Math.random() - 0.5));
        break;
      case 4:
        this.gameTable$.next(LEVEL_FOUR.sort(() => Math.random() - 0.5));
        break;
      case 5:
        this.gameTable$.next(LEVEL_FIVE.sort(() => Math.random() - 0.5));
        break;
    }

    this.saveTable();
  }

  private saveTable(): void {
    this.savedTable$.next([...this.gameTable$.value]);
  }

  private turnOverCards(): void {
    this.gameTable$.next(this.getClearTable());
    this.savedMatchesTable$.next(this.getClearTable());
  }

  private getClearTable(): string[] {
    const table = this.gameTable$.value;

    const clearTable = [];
    for (let i = 0; i < table.length; i++) {
      clearTable.push('');
    }

    return clearTable;
  }

  private turnOverOneCardFront(index: number): void {
    if (this.oneMoveIndexes.length === 2) {
      return;
    }

    const table = this.gameTable$.value;
    table[index] = this.savedTable$.value[index];
    this.gameTable$.next(table);
    this.oneMoveIndexes.push(index);
  }

  private turnOverTwoCardsBack(): void {
    const table = this.gameTable$.value;
    table[this.oneMoveIndexes[0]] = '';
    table[this.oneMoveIndexes[1]] = '';
    this.gameTable$.next(table);
  }

  private clearOneMoveIndexes(): void {
    this.oneMoveIndexes = [];
  }

  private clearCounter(): void {
    this.counter$.next(0);
  }

  private addOneMoveToCounter(): void {
    this.counter$.next(this.counter$.value + 1)
  }

  private checkMatch(): boolean {
    return this.oneMoveIndexes.length === 2 && this.savedTable$.value[this.oneMoveIndexes[0]].name === this.savedTable$.value[this.oneMoveIndexes[1]].name
      && this.oneMoveIndexes[0] !== this.oneMoveIndexes[1];
  }

  private saveMatch(): void {
    const table = this.savedMatchesTable$.value;
    const savedTable = this.savedTable$.value;

    for (let i = 0; i < this.oneMoveIndexes.length; i++) {
      table[this.oneMoveIndexes[i]] = savedTable[this.oneMoveIndexes[i]];
    }

    this.gameTable$.next([...table]);
    this.savedMatchesTable$.next([...table]);
  }

  public showLevelModal(): void {
    this.levelModal$ = of(true);
  }

  public closeLevelModal(): void {
    this.levelModal$ = of(false);
  }

  public showEndGameModal(): void {
    const textEvent = `Конец игры, ходов затрачено ${this.counter$.value}`;
    this.endGameModal$ = of(true);
    this.contentTextEvent$ = of(textEvent);
  }

  public closeEndGameModal(): void {
    this.endGameModal$ = of(false);
  }

  public changeLevelOfGame(level: number): void {
    this.levelOfGame = level;
  }

  private isGameEnded(): boolean {
    const table = this.savedMatchesTable$.value;

    let counter = 0;
    for ( let i = 0; i < table.length; i++ ) {
      if (table[i] === '') {
        counter++;
      }
    }

    return counter === 0;
  }
}
