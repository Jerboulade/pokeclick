import { Component, OnInit } from '@angular/core';
import { pokeListItem } from 'src/app/shared/models/pokeListItem';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit{

  pokeList! : pokeListItem[];
  offset : number = 10;

  constructor(private _pokeService : PokeService){
    console.log("coucou");

    this.pokeList = this._pokeService.getList;
    console.log(this.pokeList);


  }
  ngOnInit(): void {
    console.log(this.pokeList);

    if (this.pokeList.length == 0){
      setTimeout(() => {
        this.pokeList = this._pokeService.getList;
        console.log("coucou");

      }, 500);
    }

  }

  expand() {
    if ((this.offset + 10) > 650)
      this.offset = 650;
    else
      this.offset += 10;
  }
}
