import { TestBed } from '@angular/core/testing';

import { TicTacToeAutoService } from './tic-tac-toe-auto.service';

describe('TicTacToeAutoService', () => {
  let service: TicTacToeAutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicTacToeAutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
