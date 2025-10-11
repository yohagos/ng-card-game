import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, computed, inject, Input } from '@angular/core';
import { GameValidatorService } from '../../features/game/game-validator-service';
import { Card } from '../../features/game/deck.service';



@Component({
  selector: 'app-card',
  imports: [
    CdkDrag,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class CardComponent {
  private validator = inject(GameValidatorService)

  @Input({required: true}) card!: Card
  @Input({required: true}) hand!: Card[]
  @Input({required: true}) trickCards!: Card[]

  isAllowed = computed(() =>
    this.validator.allowed(
      this.hand,
      this.trickCards,
    ).includes(
      this.card
    )
  )
}
