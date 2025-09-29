import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [
    /* CommonModule,
    CdkDrag,
CdkDropList, */
  ],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {
/* stack = Array.from({ length: 13 }, (_, i) => `Karte ${i + 1}`);
  center: string[] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  } */
}
