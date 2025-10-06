import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StartNewGameModal } from '../../shared/modals/start-new-game-modal/start-new-game-modal';
import { ScoreModal } from '../../shared/modals/score-modal/score-modal';
import { SelectPointsModal } from '../../shared/modals/select-points-modal/select-points-modal';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {
  readonly dialog = inject(MatDialog)

  readonly points = signal(-1)

  restartGame() {
    const dialogRef = this.dialog.open(StartNewGameModal)

    console.log('clicked on restart')

    console.log('CurrentState of the dialog => ', dialogRef.getState())
  }

  showScore() {
    const dialogRef = this.dialog.open(ScoreModal)
  }

  selectPoints() {
    const dialogRef = this.dialog.open(SelectPointsModal)

    console.log('CurrentState of the dialog => ', dialogRef.getState())
  }
}
