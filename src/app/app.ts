import { Component, signal } from '@angular/core';
import { Toolbar } from './shared/toolbar/toolbar';


@Component({
  selector: 'app-root',
  imports: [
    Toolbar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-card-game');
}
