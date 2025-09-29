import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

type NavItems = {
  name: string
  uri: string
}

@Component({
  selector: 'app-toolbar',
  imports: [
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {
  private router: Router = inject(Router)
  navMenu: NavItems[] = [
    {
      name: 'Overview',
      uri: '',
    },
    {
      name: 'Game',
      uri: 'game',
    },
  ]

  navigateTo(uri: string) {
    this.router.navigate([uri])
  }
}
