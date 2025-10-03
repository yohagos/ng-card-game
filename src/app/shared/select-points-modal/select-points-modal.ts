import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
  readonly dialog = inject(MatDialog)

  pick(val: number) {
    console.log(`Value chosen => ${val}`)
    this.dialog.closeAll()
  }
}
