import { Component, ComponentFactoryResolver, OnInit, Renderer2, RendererFactory2, ViewChild, ViewContainerRef } from '@angular/core';
import { pokemonDTO } from 'src/app/shared/models/pokemonDTO';
import { PokeService } from 'src/app/shared/services/pokeService/poke.service';
import { PopComponent } from './pop/pop/pop.component';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.scss'],
})
export class ClickerComponent implements OnInit{
  pokemonLife! : number;
  pokemonLifeMax! : number;
  gameStarted = false;
  enemy! : pokemonDTO;
  timer : any;
  errorMessage! : string;
  popup : boolean = false;
  renderer! : Renderer2;

  decrementValue! : number;

  @ViewChild('popContainer', { read: ViewContainerRef })
  popContainer! : ViewContainerRef;

  constructor(private _pokeService : PokeService, private _rendererFactory : RendererFactory2, private _componentFactoryResolver : ComponentFactoryResolver) {
    this._pokeService.getPokemonDTOByOrder(256)?.subscribe({
      next : (data : pokemonDTO) => {
        this.enemy = data;
        console.log("GET " + this.enemy.name);
        console.log("this.enemy");
        console.log(this.enemy);
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

  loadData() {

  }

  decrementLife() {
    if (this.gameStarted && this.pokemonLife > 0) {
      this.pokemonLife--;
      if (this.pokemonLife === 0) {
        alert('Vous avez gagné!');
      }
    }
  }

 onPokemonClick(event: MouseEvent){
  const popComponentFactory = this._componentFactoryResolver.resolveComponentFactory(PopComponent);
  const popRef = this.popContainer.createComponent(popComponentFactory);
  popRef.location.nativeElement.style.left = '${event.clientX}px';
  popRef.location.nativeElement.style.top = '${event.clientY}px';
  setTimeout(() => {
    popRef.destroy();
  }, 1000);

 }

  onMouseClick(e: MouseEvent) {
    console.log(e);

    const popupHeight = 400, // hardcode these values
      popupWidth = 300;    // or compute them dynamically

    let popupXPosition,
        popupYPosition

    if(e.clientX + popupWidth > window.innerWidth){
        popupXPosition = e.pageX - popupWidth;
    }else{
        popupXPosition = e.pageX;
    }

    if(e.clientY + popupHeight > window.innerHeight){
        popupYPosition = e.pageY - popupHeight;
    }else{
        popupYPosition = e.pageY;
    }
    console.log(popupHeight)
    console.log(popupWidth)
    console.log(popupXPosition)
    console.log(popupYPosition)
      this.popup = true;

      this.renderer = this._rendererFactory.createRenderer(null, null);
      let div = this.renderer.createElement("div");
      //console.log(document.getElementById('life-container'))
      this.renderer.addClass(div, "popup");
      this.renderer.appendChild(document.getElementsByClassName('life-container'), div);
    }

  startGame() {
    this.gameStarted = true;
    //this.pokemonLife = 5;
    setInterval(() => {
      if (this.pokemonLife < this.pokemonLifeMax)
      this.pokemonLife++;
    }, 500);
  }

  getLifePercentage() {
    return (this.pokemonLife / 50) * 100; // 3 est le nombre de vies initiales
  }
}
