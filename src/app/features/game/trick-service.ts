import { Injectable, signal } from '@angular/core';
import { Seat } from './bid-panel/bidding-service';
import { Card } from './deck.service';

export interface PlayedCard { seat: Seat, card: Card }
export interface TrickResult { winner: Seat, cards: PlayedCard[], points: number }

@Injectable({
  providedIn: 'root'
})
export class TrickService {
  private trick = signal<PlayedCard[]>([])
  private trump = signal<Card['suit'] | null>(null)

  startTrick(trump: Card['suit']) {
    this.trump.set(trump)
    this.trick.set([])
  }

  playCard(player: Seat, card: Card): TrickResult | null {
    if (!this.legalPlay(player, card)) throw new Error('Illegal play')

    this.trick.update(t => [...t, {seat: player, card}])

    if (this.trick().length === 4) return this.evaluate()

    return null
  }

  private legalPlay(player: Seat, card: Card): boolean {

    return false
  }

  private evaluate(): TrickResult {
    const played = this.trick()
    const leadSuit = played[0].card.suit
    const trump = this.trump()

    let best = played[0]
    for (const p of played.slice(1)) {
      const [c1, c2] = [best.card, p.card]

      if (c2.suit === trump && c1.suit !== trump) best = p
      else if (c1.suit === trump && c2.suit === trump && this.rank(c2) > this.rank(c1)) best = p
      else if (c1.suit !== trump && c2.suit === leadSuit && this.rank(c2) > this.rank(c1)) best = p
    }

    const points = played.reduce((s, p) => s + p.card.points, 0)
    const result: TrickResult = {winner: best.seat, cards: played, points}
    this.trick.set([])

    return result
  }

  private rank(c: Card): number {
    const order: Card['value'][] = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    return order.indexOf(c.value)
  }

  private getHand(p: Seat): Card[] {
    return []
  }
}
