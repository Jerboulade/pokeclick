import { style, transition, trigger, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss'],
  animations: [
    trigger('popAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('.2s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('.2s ease-out', style({ opacity: 0, transform: 'scale(0.8)' })),
      ]),
    ])
  ],
})
export class PopComponent {
@Input() decrementValue! : number;
boo : boolean = false;
}
