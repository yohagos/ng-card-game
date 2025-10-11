import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StartNewGameModal } from '../../shared/modals/start-new-game-modal/start-new-game-modal';
import { ScoreModal } from '../../shared/modals/score-modal/score-modal';
import { SelectPointsModal } from '../../shared/modals/select-points-modal/select-points-modal';
import { MatIconModule } from '@angular/material/icon';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Trump, TrumpModal } from '../../shared/modals/trump-modal/trump-modal';
import { BidPanel } from './bid-panel/bid-panel';
import { BiddingService, Seat } from './bid-panel/bidding-service';
import { PlayedCard, TrickService } from './trick-service';
import { GameValidatorService } from './game-validator-service';
import { Card, DeckService, PlayerHands } from './deck.service';
import { CardComponent } from '../../shared/card/card';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-game',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    CommonModule,
    CdkDropList,

    BidPanel,
    CardComponent,
  ],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog)
  readonly trump = signal<Trump | undefined>(undefined)
  readonly points = signal(-1)

  biddingService = inject(BiddingService)
  private trickService = inject(TrickService)
  private validatorService = inject(GameValidatorService)
  private deckService = inject(DeckService)

  hands = signal<PlayerHands>({
    bottom: [],
    left: [],
    top: [],
    right: [],
  })
  trick = signal<PlayedCard[]>([])

  trickCards = computed(() => this.trick().map(p => p.card))

  seats: Seat[] = ['bottom', 'right', 'top', 'left']

  /* restartGame() {
    const dialogRef = this.dialog.open(StartNewGameModal)
  }

  showScore() {
    const dialogRef = this.dialog.open(ScoreModal)
  }

  selectPoints() {
    const dialogRef = this.dialog.open(SelectPointsModal)
  } */

  ngOnInit() {
    this.hands.set(this.deckService.deal())

    this.biddingService.startBidding('bottom')
    this.biddingService.biddingEnd$.subscribe(async ({winner, bid}) => {
      const suit = await this.chooseTrump()
      this.trickService.startTrick(suit)
      this.validatorService.startTrick(suit, null)

      console.log('Bidding Process => ', winner, bid)
    })

    /* const trump = '♠'
    this.trickService.startTrick(trump)
    this.validatorService.startTrick(trump, null) */
  }

  /* valueOrder: {[key: string]: number} = {
    '2': 2, '3': 3, '4': 4, '5':5, '6': 6, '7': 7,
    '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12,
    'K': 13, 'A': 14
  }

  suitOrder: {[key: string]: number} = {
    '♠': 1, '♥': 2, '♣': 3, '♦': 4
  } */

  /* sortCards(cards: any[]) {
    return cards.sort((a,b) => {
      if (a.suit === b.suit) {
        return this.valueOrder[b.value] - this.valueOrder[a.value]
      }
      return this.suitOrder[a.suit] - this.suitOrder[b.suit]
    })
  }

  getRandomCards() {
    const shuffled = [...this.cards].sort(() => 0.5 - Math.random())

    this.user_a.set(this.sortCards(shuffled.splice(0, 13)))
    this.user_b.set(this.sortCards(shuffled.splice(0, 13)))
    this.user_c.set(this.sortCards(shuffled.splice(0, 13)))
    this.user_d.set(this.sortCards(shuffled.splice(0, 13)))
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
  } */

  async chooseTrump(): Promise<Trump> {
    const ref = await this.dialog.open(TrumpModal, {
      disableClose: true,
    })
    return firstValueFrom(ref.afterClosed())
  }

  play(
    event: CdkDragDrop<Card[]>,
  ) {
    const card = event.item.data as Card
    const from = event.previousContainer.id as Seat
    const to = event.container.id

    if (to !== 'center') return

    const allowed = this.validatorService.allowed(this.hands()[from], this.trickCards())
    if (!allowed.includes(card)) return

    this.hands.update(h => ({...h, [from]: h[from].filter(c => c !== card)}))

    const result = this.trickService.playCard(from, card)
    if (result) {
      this.trick.set([])
      console.log("Won the trick => ", result)
    } else {
      this.trick.update(t => [...t, {seat:from, card}])
    }
  }

  dropToCenter(
    event: CdkDragDrop<PlayedCard[]>,
  ) {
    event.event.preventDefault()
  }

  ngOnDestroy() {
  }
}
