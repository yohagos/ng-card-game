import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


export type Trump = '♠'|'♥'|'♦'|'♣'

@Component({
  selector: 'app-trump-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
],
  templateUrl: './trump-modal.html',
  styleUrl: './trump-modal.scss'
})
export class TrumpModal {
  suits: Trump[] = ['♠','♥','♦','♣']
  private ref = inject<MatDialogRef<Trump>>(MatDialogRef)

  pick(suit: Trump) {
    this.ref.close(suit)
  }
}
