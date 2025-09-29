import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";



@Component({
  selector: 'app-card',
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card implements OnInit, OnDestroy {
  suits = ['♠', '♥', '♦', '♣']
  values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

  loading = signal(true)

  cards: any[] = []
  randomCards: any[] = []

  stackCards: any[] = []
  centerCards: any[] = []

  constructor() {
    this.suits.forEach(suit => {
      this.values.forEach(value => {
        this.cards.push({suit, value})
      })
    })
  }

  ngOnInit() {
    this.stackCards = this.getRandomCards()
    this.loading.set(false)
  }

  valueOrder: {[key: string]: number} = {
    '2': 2, '3': 3, '4': 4, '5':5, '6': 6, '7': 7,
    '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12,
    'K': 13, 'A': 14
  }

  suitOrder: {[key: string]: number} = {
    '♠': 1, '♥': 2, '♣': 3, '♦': 4
  }

  sortCards(cards: any[]) {
    return cards.sort((a,b) => {
      if (a.suit === b.suit) {
        return this.valueOrder[b.value] - this.valueOrder[a.value]
      }
      return this.suitOrder[a.suit] - this.suitOrder[b.suit]
    })
  }

  getRandomCards() {
    const shuffled = [...this.cards].sort(() => 0.5 - Math.random())
    return this.sortCards(shuffled.slice(0, 13))
  }

  dropCard(event: CdkDragDrop<string[]>) {
   if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
   } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
   }
  }

  ngOnDestroy() {
    this.loading.set(true)
  }
}
