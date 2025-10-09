import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TrumpModal } from '../../shared/modals/trump-modal/trump-modal';


@Component({
  selector: 'app-overview',
  imports: [
    MatButtonModule,
  ],
  templateUrl: './overview.html',
  styleUrl: './overview.scss'
})
export class Overview {
  private dialog = inject(MatDialog)
  openTrumpModal() {
    this.dialog.open(TrumpModal)
  }
}
