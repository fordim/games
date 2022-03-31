import { Component, Input, OnInit } from '@angular/core';
import { MemoryService } from "../../services/memory.service";
import { MemoryMainComponent } from "../memory-main/memory-main.component";

@Component({
  selector: 'app-memory-endgame-modal',
  templateUrl: './memory-endgame-modal.component.html',
  styleUrls: ['./memory-endgame-modal.component.css']
})
export class MemoryEndgameModalComponent implements OnInit {
  @Input() contentText: string = '';
  closeModalText: string = 'Закрыть';
  newGameText: string = 'Новая игра';

  constructor(private service: MemoryService, private mainComponent: MemoryMainComponent) {

  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.service.closeEndGameModal();
    this.mainComponent.endGameModal$ = this.service.endGameModal$;
  }

  newGame(): void {
    this.service.resetBoard();
    this.service.closeEndGameModal();
    this.mainComponent.endGameModal$ = this.service.endGameModal$;
  }
}
