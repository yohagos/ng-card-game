import { Injectable } from '@angular/core';

export interface Card {
  value: '2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'J'|'Q'|'K'|'A';
  suit: '♠'|'♥'|'♦'|'♣';
  points: number;
}

export interface PlayerHands {
  bottom: Card[];
  left:   Card[];
  top:    Card[];
  right:  Card[];
}

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private readonly values: Card['value'][] = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  private readonly suits:  Card['suit'][]  = ['♠','♥','♦','♣'];
  private readonly points: Record<Card['value'], number> = {
    '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':2,'Q':3,'K':4,'A':11
  };

  private createDeck(): Card[] {
    return this.suits.flatMap(s =>
      this.values.map(v => ({value: v, suit: s, points: this.points[v]}))
    )
  }

  private shuffle(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck
  }

  deal(): PlayerHands {
    const deck = this.shuffle(this.createDeck())
    return {
      bottom: deck.slice(0,13),
      left: deck.slice(0,13),
      top: deck.slice(0,13),
      right: deck.slice(0,13),
    }
  }

}
