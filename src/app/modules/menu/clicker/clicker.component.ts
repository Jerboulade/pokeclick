import { Component, ComponentFactoryResolver, Inject, OnInit, Renderer2, RendererFactory2, ViewChild, ViewContainerRef } from '@angular/core';
import { pokemonDTO } from 'src/app/shared/models/pokemonDTO';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';
import { PopService } from 'src/app/shared/services/popService/pop.service';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.scss'],
})
export class ClickerComponent implements OnInit {

  pokemonLife! : number;
  pokemonLifeMax! : number;
  gameStarted = false;
  enemy! : pokemonDTO;
  errorMessage! : string;
  timer : any;
  // @ViewChild('popContainer', { read: ViewContainerRef })
  // popContainer! : ViewContainerRef;

  constructor( private _pokeService : PokeService,
               private _popService : PopService
               //private _componentFactoryResolver : ComponentFactoryResolver
               ) {
    this._pokeService.getPokemonDTOByOrder(256)?.subscribe({
      next : (data : pokemonDTO) => {
        this.enemy = data;
        //console.log("GET " + this.enemy.name);
        let hp : number | undefined = this.enemy?.stats.find((stat) => stat.stat.name == "hp")?.base_stat;
        this.pokemonLifeMax = hp ? hp : 10;
        this.pokemonLife = this.pokemonLifeMax;
        console.log(this.enemy?.sprites.front_default);
      },
      error : (err : any) => {
        switch(err.status){
          case 0 : this.errorMessage = "Broken server"
          break;
          case 404 : this.errorMessage = "Pokemon not found"
          break;
        }
      }
    });;
   }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {}

  decrementLife($event: MouseEvent, dmg : number) {
    if (this.gameStarted && this.pokemonLife > 0) {
      this.pokemonLife -= dmg;
      this._popService.onClic($event, dmg.toString());
    }
    else if (this.pokemonLife === 0) {
      this.gameStarted = false;
      clearInterval(this.timer);
        //alert('Vous avez gagné!');
    }
  }

  onClic($event: MouseEvent, msg : string) {
    }


  // onPokemonClick(event: MouseEvent){
  //   const popComponentFactory = this._componentFactoryResolver.resolveComponentFactory(PopComponent);
  //   const popRef = this.popContainer.createComponent(popComponentFactory);
  //   popRef.instance.decrementValue = "clic";
  //   popRef.location.nativeElement.style.position = 'absolute';
  //   popRef.location.nativeElement.style.left = event.clientX + 'px';
  //   popRef.location.nativeElement.style.top = (event.clientY - 20) + 'px';
  //   popRef.location.nativeElement.style.userEvents = 'none';
  //   popRef.location.nativeElement.style.pointerEvents = 'none';
  //   setTimeout(() => {
  //     popRef.destroy();
  //   }, 300);
  // }

  startGame() {
    this.gameStarted = true;
    this.pokemonLife = this.pokemonLifeMax;
    this.timer = setInterval(() => {
      if (this.pokemonLife < this.pokemonLifeMax)
      this.pokemonLife++;
    }, 500);
  }


  // différence avec un get ?????????????????????????
  getLifePercentage() {
    return (this.pokemonLife / this.pokemonLifeMax) * 100;
  }
}
