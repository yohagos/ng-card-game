import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";



@Component({
  selector: 'app-card',
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
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

  userA: any[] = []
  userB: any[] = []
  userC: any[] = []
  userD: any[] = []

  user_a = signal(<any>[])
  user_b = signal(<any>[])
  user_c = signal(<any>[])
  user_d = signal(<any>[])

  centerCards: any[] = []

  constructor() {
    this.suits.forEach(suit => {
      this.values.forEach(value => {
        this.cards.push({suit, value})
      })
    })
  }

  ngOnInit() {
    this.getRandomCards()
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
    /* this.userA = this.sortCards(shuffled.splice(0, 13))
    this.userB = this.sortCards(shuffled.splice(0, 13))
    this.userC = this.sortCards(shuffled.splice(0, 13))
    this.userD = this.sortCards(shuffled.splice(0, 13)) */

    this.user_a.set(this.sortCards(shuffled.splice(0, 13)))
    this.user_b.set(this.sortCards(shuffled.splice(0, 13)))
    this.user_c.set(this.sortCards(shuffled.splice(0, 13)))
    this.user_d.set(this.sortCards(shuffled.splice(0, 13)))

    /* console.log('Shuffled List of cards | Before => ', shuffled)
    console.log('User a cards => ', this.userA)
    console.log('User b cards => ', this.userB)
    console.log('User c cards => ', this.userC)
    console.log('User d cards => ', this.userD)
    console.log('Shuffled List of cards | After => ', shuffled) */
  }

  dropCard(event: CdkDragDrop<string[]>) {
    console.log('Card dropped => ', event)
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
