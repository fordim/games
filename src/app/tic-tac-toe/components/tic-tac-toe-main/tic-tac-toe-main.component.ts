import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from "../../services/tic-tac-toe.service";

@Component({
  selector: 'app-tic-tac-toe-main',
  templateUrl: './tic-tac-toe-main.component.html',
  styleUrls: ['./tic-tac-toe-main.component.css']
})
export class TicTacToeMainComponent implements OnInit {

  startGameBlocks: string[] = [ 'T', 'I', 'C', 'T', 'A', 'C', 'T', 'O', 'E' ];

  constructor(private service: TicTacToeService) { }

  ngOnInit(): void {
  }

  move($event: Event, index: number): void {
    this.service.move(index);
  }

  resetGame(): void {
    this.service.resetAndDrawBoard();
  }

  stepBack(): void {
    this.service.stepBackAndDraw();
  }
}
