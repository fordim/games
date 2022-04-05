import { Component, OnInit } from '@angular/core';
import { MemoryService } from "../../services/memory.service";

@Component({
  selector: 'app-memory-main',
  templateUrl: './memory-main.component.html',
  styleUrls: ['./memory-main.component.css']
})
export class MemoryMainComponent implements OnInit {
  gameTable$ = this._service.gameTable$;
  levelOfGame$ = this._service.levelOfGame$;
  counter$ = this._service.counter$;
  levelModal$ = this._service.levelModal$;
  endGameModal$ = this._service.endGameModal$;
  contentTextEvent$ = this._service.contentTextEvent$;
  timeCounter$ = this._service.timeCounter$;
  showTimeCounter$ = this._service.showTimeCounter$;

  constructor(private _service: MemoryService) { }

  ngOnInit(): void {
  }

  move(index: number): void {
    this._service.move(index);
  }

  resetGame(): void {
    this._service.resetBoard();
    this.timeCounter$ = this._service.timeCounter$;
  }

  selectNewLevel(): void {
    this._service.showLevelModal();
  }
}
