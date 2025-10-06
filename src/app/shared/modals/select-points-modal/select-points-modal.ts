import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-points-modal',
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './select-points-modal.html',
  styleUrl: './select-points-modal.scss'
})
export class SelectPointsModal {
  point: number = 0
  readonly dialogRef = inject(MatDialogRef<SelectPointsModal>)
  readonly points = model(this.point)

  pick(val: number): number {
    this.dialogRef.close()
    return val;
  }
}
