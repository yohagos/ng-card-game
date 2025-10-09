import { Injectable, signal } from '@angular/core';
import { Card } from './deck.service';

@Injectable({
  providedIn: 'root'
})
export class GameValidatorService {
  private trump = signal<Card['suit'] | null>(null)
  private lead = signal<Card['suit'] | null>(null)

  startTrick(
    trump: Card['suit'],
    lead: Card['suit'] | null,
  ) {
    this.trump.set(trump)
    this.lead.set(lead)
  }

  allowed(hand: Card[], played: Card[]): Card[] {
    const leadSuit = this.lead()
    const trumpS = this.trump()

    if (!leadSuit) return hand

    const hasLead = hand.some(c => c.suit === leadSuit)
    const hasTrump = hand.some(c => c.suit === trumpS)

    if (hasLead) return hand.filter(c => c.suit === leadSuit)
    if  (hasTrump) return hand.filter(c => c.suit == trumpS)

    return hand
  }
}
