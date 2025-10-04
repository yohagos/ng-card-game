import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

export interface ScoreEachRound {
  userAValue: number
  userBValue: number
  userCValue: number
  userDValue: number
}

const MOCK_DATA_FOR_SCORES: ScoreEachRound[] = [
  {
    userAValue: 4,
    userBValue: 3,
    userCValue: 5,
    userDValue: 1,
  },
  {
    userAValue: 4,
    userBValue: 7,
    userCValue: 1,
    userDValue: 1,
  },
  {
    userAValue: 4,
    userBValue: 2,
    userCValue: 1,
    userDValue: 6,
  },
]

@Component({
  selector: 'app-score-modal',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './score-modal.html',
  styleUrl: './score-modal.scss'
})
export class ScoreModal {
  readonly dialog = inject(MatDialog)

  displayedColumns = ['round','usera','userb','userc','userd']
  dataSource = MOCK_DATA_FOR_SCORES
}
