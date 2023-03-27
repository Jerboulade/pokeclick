import { Component, Input, OnInit } from '@angular/core';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';

@Component({
  selector: 'app-show-stats',
  templateUrl: './show-stats.component.html',
  styleUrls: ['./show-stats.component.scss']
})
export class ShowStatsComponent implements OnInit {

  @Input()
  pokemon! : pokemonForm;

  constructor() {
    console.log("show stat comp")




  }

  ngOnInit(): void {
    console.log(this.pokemon);
    this.pokemon.setXp = 1000;

    console.log(this.pokemon.getId);

  }
}
