import { Component, OnInit } from '@angular/core';
import { MemoryService } from "../../services/memory.service";
import { MemoryMainComponent } from "../memory-main/memory-main.component";

@Component({
  selector: 'app-memory-level-modal',
  templateUrl: './memory-level-modal.component.html',
  styleUrls: ['./memory-level-modal.component.css']
})
export class MemoryLevelModalComponent implements OnInit {

  levelOfGame$ = this._service.levelOfGame$;
  levelsOfGame = this._service.levelsOfGame;

  constructor(private _service: MemoryService, private mainComponent: MemoryMainComponent) { }

  ngOnInit(): void {
  }

  selectNewLevel(level: number): void {
    this._service.changeLevelOfGame(level);
    this._service.resetBoard();
    this.closeModal();
  }

  closeModal(): void {
    this._service.closeLevelModal();
    this.mainComponent.timeCounter$ = this._service.timeCounter$;
  }
}
