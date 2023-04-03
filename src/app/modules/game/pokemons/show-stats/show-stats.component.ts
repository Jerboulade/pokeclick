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
  front : boolean = true;

  constructor() {
    console.log("show stat comp")
    console.log(this.pokemon);
    //     const usedSpace = JSON.stringify(localStorage).length;
    // console.log(`Used space: ${usedSpace} bytes`);
    // for (var i = 0, data = "m"; i < 40; i++) {
    //     try {
    //         localStorage.setItem("DATA", data);
    //         data = data + data;
    //     } catch(e) {
    //         var storageSize = Math.round(JSON.stringify(localStorage).length / 1024);
    //         console.log("LIMIT REACHED: (" + i + ") " + storageSize + "K");
    //         console.log(e);
    //         break;
    //     }
    // }
    // localStorage.removeItem("DATA");
  }

  ngOnInit(): void {
    console.log(this.pokemon);
  }
}
