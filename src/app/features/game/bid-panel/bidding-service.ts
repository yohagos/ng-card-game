import { computed, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export type Seat = 'bottom' | 'left' | 'top' | 'right'

export interface Bid {
  seat: Seat,
  value: number | null
}

@Injectable({
  providedIn: 'root'
})
export class BiddingService {
  private bids = signal<Bid[]>([])

  private passes = signal<Set<Seat>>(new Set())
  private current = signal<Seat>('bottom')
  private started = signal(false)

  bidChanges$ = this.bids.asReadonly()
  currentPlayer$ = this.current.asReadonly()

  highBid = computed(() => Math.max(
    ...this.bids()
      .map(b => b.value)
      .filter((v): v is number => v !== null)
  ))

  forbiddenValues = computed(() => this.bids()
    .map(b => b.value)
    .filter((v): v is number => v !== null )
  )

  private end$ = new Subject<{winner: Seat; bid: number}>()
  biddingEnd$ = this.end$.asObservable()

  startBidding(firstPlayer: Seat) {
    this.bids.set([])
    this.current.set(firstPlayer)
    this.started.set(true)
  }

  placeBid(value: number) {
    if (!this.started()) return
    if (this.forbiddenValues().includes(value)) return

    this.bids.update(list => [ ...list, {seat: this.current(), value}])
    this.nextPlayer()
  }

  pass() {
    if (!this.started()) return
    this.bids.update(list => [ ...list, {seat: this.current(), value: null}])
    this.nextPlayer()
  }

  private nextPlayer() {
    const order: Seat[] = ['bottom', 'right', 'top', 'left']
    const idx = order.indexOf(this.current())
    const next = order[(idx + 1) % 4]

    if (this.bids().length === 4) {
      this.finishBidding()
      return
    }

    this.current.set(next)

  }

  private finishBidding() {
    const valid = this.bids()
      .filter(b => b.value !== null) as { seat: Seat, value: number}[]

    if (valid.length === 0) {
      this.end$.next({ winner: this.current(), bid: 4})
    } else {
      const max = valid.reduce((a, b) => (b.value > a.value ? b : a))
      this.end$.next({winner: max.seat, bid: max.value})
    }
    this.started.set(false)
  }

}
