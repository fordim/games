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

  public logs$ = this._service.logs$;
  public gameTable$ = this._service.gameTable$;
  public modal$ = this._service.modal$;
  public contentTextEvent$ = this._service.contentTextEvent$;
  public buttonTextEvent$ = this._service.buttonTextEvent$;
  public gameWithAi = false;

  constructor(private _service: TicTacToeService, private _serviceAuto: TicTacToeAutoService) {
  }

  ngOnInit(): void {
    this.gameTable$.next(this.startGameBlocks);
  }

  move(index: number): void {
    if (this.gameWithAi) {
      this._serviceAuto.move(index);
      return;
    }
    
    this._service.move(index);
  }

  resetGame(): void {
    this._service.resetAndDrawBoard();
    this.gameWithAi = false;
  }

  resetGameWithAI(): void {
    this._service.resetAndDrawBoard();
    this.gameWithAi = true;
  }

  stepBack(): void {
    if (this.gameWithAi) {
      this._service.oneStepBack();
      this._service.oneStepBack();
    } else {
      this._service.oneStepBack();
    }
  }
}
