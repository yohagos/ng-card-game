import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreModal } from './score-modal';

describe('ScoreModal', () => {
  let component: ScoreModal;
  let fixture: ComponentFixture<ScoreModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
