import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryEndgameModalComponent } from './memory-endgame-modal.component';

describe('MemoryEndgameModalComponent', () => {
  let component: MemoryEndgameModalComponent;
  let fixture: ComponentFixture<MemoryEndgameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryEndgameModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryEndgameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
