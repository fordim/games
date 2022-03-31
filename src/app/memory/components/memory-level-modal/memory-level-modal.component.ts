import { Component, OnInit } from '@angular/core';
import { MemoryService } from "../../services/memory.service";
import { MemoryMainComponent } from "../memory-main/memory-main.component";

@Component({
  selector: 'app-memory-level-modal',
  templateUrl: './memory-level-modal.component.html',
  styleUrls: ['./memory-level-modal.component.css']
})
export class MemoryLevelModalComponent implements OnInit {

  levelOfGame = this.service.levelOfGame;
  levelsOfGame = this.service.levelsOfGame;

  constructor(private service: MemoryService, private mainComponent: MemoryMainComponent) { }

  ngOnInit(): void {
  }

  selectNewLevel(level: number): void {
    this.service.changeLevelOfGame(level);
    this.mainComponent.levelOfGame = level;
    this.service.resetBoard();
    this.closeModal();
  }

  closeModal(): void {
    this.service.closeLevelModal();
    this.mainComponent.levelModal$ = this.service.levelModal$;
  }
}
