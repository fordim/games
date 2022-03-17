import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from "../../services/tic-tac-toe.service";

@Component({
  selector: 'app-tic-tac-toe-modal',
  templateUrl: './tic-tac-toe-modal.component.html',
  styleUrls: ['./tic-tac-toe-modal.component.css']
})
export class TicTacToeModalComponent implements OnInit {

  constructor(private service: TicTacToeService) { }

  ngOnInit(): void {
  }

  resetGameModal() {
    this.service.resetGameModal();
  }
}
