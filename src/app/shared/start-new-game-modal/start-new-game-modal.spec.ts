import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNewGameModal } from './start-new-game-modal';

describe('StartNewGamePointsModal', () => {
  let component: StartNewGameModal;
  let fixture: ComponentFixture<StartNewGameModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartNewGameModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartNewGameModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
