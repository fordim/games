import { Component, Input, OnInit } from '@angular/core';
import { TicTacToeService } from "../../services/tic-tac-toe.service";

@Component({
  selector: 'app-tic-tac-toe-modal',
  templateUrl: './tic-tac-toe-modal.component.html',
  styleUrls: ['./tic-tac-toe-modal.component.css']
})
export class TicTacToeModalComponent implements OnInit {
  @Input() contentText: string | null = '';
  @Input() buttonText: string | null = '';

  public error: boolean = false;

  constructor(private _service: TicTacToeService) { }

  ngOnInit(): void {
  }

  resetGameModal() {
    this._service.error$.subscribe(data => this.error = data);

    if (!this.error) {
      this._service.resetAndDrawBoard();
    }

    this._service.closeModal();
  }
}
