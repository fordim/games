import { Component, Input, OnInit } from '@angular/core';
import { MemoryService } from "../../services/memory.service";

@Component({
  selector: 'app-memory-endgame-modal',
  templateUrl: './memory-endgame-modal.component.html',
  styleUrls: ['./memory-endgame-modal.component.css']
})
export class MemoryEndgameModalComponent implements OnInit {
  @Input() contentText: string | null = '';

  closeModalText: string = 'Закрыть';
  newGameText: string = 'Новая игра';

  constructor(private _service: MemoryService) {
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this._service.closeEndGameModal();
  }

  newGame(): void {
    this._service.resetBoard();
    this.closeModal();
  }
}
