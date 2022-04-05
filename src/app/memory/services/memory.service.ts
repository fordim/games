import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, repeatWhen, Subject, takeUntil, timer } from "rxjs";
import { LEVEL_FIVE, LEVEL_FOUR, LEVEL_ONE, LEVEL_THREE, LEVEL_TWO } from "./const";

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  gameTable$ = new BehaviorSubject<any[]>([]);
  savedTable$ = new BehaviorSubject<any[]>([]);
  savedMatchesTable$ = new BehaviorSubject<any[]>([]);

  levelOfGame$ = new BehaviorSubject<number>(1);
  levelsOfGame: number[] = [ 1, 2, 3, 4, 5 ];
  oneMoveIndexes: number[] = [];
  counter$ = new BehaviorSubject<number>(0);
  levelModal$ = new BehaviorSubject<boolean>(false);
  endGameModal$ = new BehaviorSubject<boolean>(false);
  contentTextEvent$ = new BehaviorSubject<string>('');

  timeCounter$: Observable<number> = of(0);
  showTimeCounter$ = new BehaviorSubject<boolean>(false);
  timeoutId: any;

  bestTry = {
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0
  };

  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();

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
        this.addToLocalStorageBestTry();
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

    switch (this.levelOfGame$.value) {
      case 1:
      case 2:
        this.mySetTimeout(3500, 3);
        break;
      case 3:
        this.mySetTimeout(6500, 6);
        break;
      case 4:
        this.mySetTimeout(9500, 9);
        break
      case 5:
        this.mySetTimeout(12500, 12);
        break
    }
  }

  private mySetTimeout(timeout: number, seconds: number): void {
    clearTimeout(this.timeoutId);
    this.startTimeCounter(seconds);
    this.timeoutId = setTimeout(() => {
      this.turnOverCards()
      this.timerStop();
    }, timeout);
  }

  private startTimeCounter(number: number): void {
    this.timerStart();
    let intervalTimer = timer(0,1000);

    this.timeCounter$ = intervalTimer
      .pipe(takeUntil(this._stop), repeatWhen(() => this._start), map((data) => {
        return number - data;
      }))
  }

  private timerStart(): void {
    this.showTimeCounter$.next(true);
    this._start.next();
  }

  private timerStop(): void {
    this._stop.next();
    this.showTimeCounter$.next(false);
  }

  private clearBoard(): void {
    switch (this.levelOfGame$.value) {
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
    this.levelModal$.next(true);
  }

  public closeLevelModal(): void {
    this.levelModal$.next(false);
  }

  public showEndGameModal(): void {
    const textEvent = `Конец игры, ходов затрачено ${this.counter$.value}. Лучшая попытка ${this.getBestScoreForLevel()}.`;
    this.endGameModal$.next(true);
    this.contentTextEvent$.next(textEvent);
  }

  public closeEndGameModal(): void {
    this.endGameModal$.next(false);
  }

  public changeLevelOfGame(level: number): void {
    this.levelOfGame$.next(level);
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

  private addToLocalStorageBestTry(): void {
    let bestTryCanBeNull = window.localStorage.getItem('bestTry');
    if (bestTryCanBeNull === null) {
      window.localStorage.setItem('bestTry', JSON.stringify(this.bestTry));
    }

    let bestTryLocal = window.localStorage.getItem('bestTry') ?? '';
    let bestTryObject = JSON.parse(bestTryLocal);

    switch(this.levelOfGame$.value) {
      case 1:
        if (bestTryObject.one === 0 || bestTryObject.one >= this.counter$.value) {
          bestTryObject.one = this.counter$.value;
        }
        break;
      case 2:
        if (bestTryObject.two === 0 || bestTryObject.two >= this.counter$.value) {
          bestTryObject.two = this.counter$.value;
        }
        break;
      case 3:
        if (bestTryObject.three === 0 || bestTryObject.three >= this.counter$.value) {
          bestTryObject.three = this.counter$.value;
        }
        break;
      case 4:
        if (bestTryObject.four === 0 || bestTryObject.four >= this.counter$.value) {
          bestTryObject.four = this.counter$.value;
        }
        break;
      case 5:
        if (bestTryObject.five === 0 || bestTryObject.five >= this.counter$.value) {
          bestTryObject.five = this.counter$.value;
        }
        break;
    }

    this.bestTry = bestTryObject;
    window.localStorage.setItem('bestTry', JSON.stringify(this.bestTry));
  }

  private getBestScoreForLevel(): number | void {
    switch (this.levelOfGame$.value) {
      case 1:
        return this.bestTry.one;
      case 2:
        return this.bestTry.two;
      case 3:
        return this.bestTry.three;
      case 4:
        return this.bestTry.four;
      case 5:
        return this.bestTry.five;
    }
  }
}
