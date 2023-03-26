import { Component, Input } from '@angular/core';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';

@Component({
  selector: 'app-show-stats',
  templateUrl: './show-stats.component.html',
  styleUrls: ['./show-stats.component.scss']
})
export class ShowStatsComponent {

  @Input()
  pokemon! : pokemonForm;

  constructor() {
    console.log("show stat comp")
  }
}
