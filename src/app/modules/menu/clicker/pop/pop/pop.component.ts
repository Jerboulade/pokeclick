import { style, transition, trigger, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss'],
  animations: [
    trigger('popAnimation', [
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(-300%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(120px)' })),
      ])
    ]),
  ],
})
export class PopComponent {
@Input() decrementValue! : String;
}
