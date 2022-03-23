import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from "../../services/tic-tac-toe.service";
import { TicTacToeAutoService } from "../../services/tic-tac-toe-auto.service";

@Component({
  selector: 'app-tic-tac-toe-main',
  templateUrl: './tic-tac-toe-main.component.html',
  styleUrls: ['./tic-tac-toe-main.component.css']
})
export class TicTacToeMainComponent implements OnInit {

  private startGameBlocks: string[] = [ 'T', 'I', 'C', 'T', 'A', 'C', 'T', 'O', 'E' ];

  public logs$ = this.service.logs$;
  public gameTable$ = this.service.gameTable$;
  public modal$ = this.service.modal$;
  public contentTextEvent$ = this.service.contentTextEvent$;
  public buttonTextEvent$ = this.service.buttonTextEvent$;
  public gameWithAi = false;

  constructor(private service: TicTacToeService, private serviceAuto: TicTacToeAutoService) {
  }

  ngOnInit(): void {
    this.gameTable$.next(this.startGameBlocks);
  }

  move(index: number): void {
    if (this.gameWithAi) {
      this.serviceAuto.move(index);
    } else {
      this.service.move(index);
    }

    this.modal$ = this.service.modal$;
    this.contentTextEvent$ = this.service.contentTextEvent$;
    this.buttonTextEvent$ = this.service.buttonTextEvent$;
  }

  resetGame(): void {
    this.service.resetAndDrawBoard();
    this.gameWithAi = false;
  }

  resetGameWithAI(): void {
    this.service.resetAndDrawBoard();
    this.gameWithAi = true;
  }

  stepBack(): void {
    if (this.gameWithAi) {
      this.service.oneStepBack();
      this.service.oneStepBack();
    } else {
      this.service.oneStepBack();
    }
  }
}
