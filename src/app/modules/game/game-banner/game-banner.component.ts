import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-banner',
  templateUrl: './game-banner.component.html',
  styleUrls: ['./game-banner.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-100%)'}),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0%)' })),
      ])
    ])
  ]
})
export class GameBannerComponent {

}
