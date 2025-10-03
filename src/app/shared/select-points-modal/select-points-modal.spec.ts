import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPointsModal } from './select-points-modal';

describe('SelectPointsModal', () => {
  let component: SelectPointsModal;
  let fixture: ComponentFixture<SelectPointsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPointsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPointsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
