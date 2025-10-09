import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BiddingService } from './bidding-service';

@Component({
  selector: 'app-bid-panel',
  imports: [
    MatButtonModule,
  ],
  templateUrl: './bid-panel.html',
  styleUrl: './bid-panel.scss'
})
export class BidPanel {
  private biddingService = inject(BiddingService)
  numbers = Array.from({length: 9}, (_, i) => i + 5)
  currentPlayer = computed(() => this.biddingService.currentPlayer$())
  highBid = computed(() => this.biddingService.highBid())
  forbidden = computed(() => this.biddingService.forbiddenValues())

  isForbidden(n: number) {
    return this.forbidden().includes(n)
  }

  bid(n: number) {
    this.biddingService.placeBid(n)
  }

  pass() {
    this.biddingService.pass()
  }
}
