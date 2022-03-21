import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from "../../services/tic-tac-toe.service";
import { TicTacToeAutoService } from "../../services/tic-tac-toe-auto.service";

@Component({
  selector: 'app-tic-tac-toe-main',
  templateUrl: './tic-tac-toe-main.component.html',
  styleUrls: ['./tic-tac-toe-main.component.css']
})
export class TicTacToeMainComponent implements OnInit {

  startGameBlocks: string[] = [ 'T', 'I', 'C', 'T', 'A', 'C', 'T', 'O', 'E' ];

  constructor(private service: TicTacToeService, private serviceAuto: TicTacToeAutoService) { }

  ngOnInit(): void {
  }

  move($event: Event, index: number): void {
    let errorMessage = this.serviceAuto.move(index);
    // let errorMessage = this.service.move(index);

    if (errorMessage) {
      return alert(errorMessage);
    }
  }

  resetGame(): void {
    this.service.resetAndDrawBoard();
  }

  stepBack(): void {
    this.service.stepBackAndDraw();
  }
}
