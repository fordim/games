import { Component, OnInit } from '@angular/core';
import {MemoryService} from "../../services/memory.service";

@Component({
  selector: 'app-memory-main',
  templateUrl: './memory-main.component.html',
  styleUrls: ['./memory-main.component.css']
})
export class MemoryMainComponent implements OnInit {
  gameTable$ = this.service.gameTable$;
  levelOfGame = this.service.levelOfGame;
  counter$ = this.service.counter$;
  levelModal$ = this.service.levelModal$;
  endGameModal$ = this.service.endGameModal$;
  contentTextEvent$ = this.service.contentTextEvent$;

  constructor(private service: MemoryService) { }

  ngOnInit(): void {
  }

  move(index: number): void {
    this.service.move(index);
    this.endGameModal$ = this.service.endGameModal$;
    this.contentTextEvent$ = this.service.contentTextEvent$;
  }

  resetGame(): void {
    this.service.resetBoard();
  }

  selectNewLevel(): void {
    this.service.showLevelModal();
    this.levelModal$ = this.service.levelModal$;
  }
}
