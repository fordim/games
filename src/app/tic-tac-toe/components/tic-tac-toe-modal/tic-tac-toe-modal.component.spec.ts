import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeModalComponent } from './tic-tac-toe-modal.component';

describe('TicTacToeModalComponent', () => {
  let component: TicTacToeModalComponent;
  let fixture: ComponentFixture<TicTacToeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicTacToeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
