import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-start-new-game-modal',
  imports: [
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './start-new-game-modal.html',
  styleUrl: './start-new-game-modal.scss'
})
export class StartNewGameModal {
  readonly dialogRef = inject(MatDialogRef<StartNewGameModal>)

  restartGame() {
    this.dialogRef.close()
  }
}
