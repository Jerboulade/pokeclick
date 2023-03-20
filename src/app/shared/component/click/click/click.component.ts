import { Component, Input } from '@angular/core';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';
import { PopService } from 'src/app/shared/services/popService/pop.service';

@Component({
  selector: 'app-click',
  templateUrl: './click.component.html',
  styleUrls: ['./click.component.scss']
})
export class ClickComponent {
  @Input()
  player! : pokemonForm;
  @Input()
  enemy! : pokemonForm;
  @Input()
  player_sprite! : string;
  @Input()
  enemy_sprite! : string;
  player_life! : number;
  enemy_life! : number;
  gameStarted = false;
  errorMessage! : string;
  timer : any;


  constructor( private _popService : PopService ) {
    if (!this.player || !this.enemy || !this.player_sprite || this.enemy_sprite)
      console.log("Error providing pokemon");
  }

  startGame() {
    this.gameStarted = true;
    this.enemy_life = this.enemy.hp;
    this.timer = setInterval(() => {
      if (this.enemy_life < this.enemy.hp)
      this.enemy_life++;
    }, 500);
  }
  decrementLife($event: MouseEvent, dmg : number) {
    dmg = this.damageCalculator(); //Math.ceil(Math.random() * 16) + 1
    this._popService.onClic($event, dmg.toString());
    if (this.gameStarted && this.enemy_life > 0) {
      if (this.enemy_life - dmg >= 0)
        this.enemy_life -= dmg;
      else
        this.enemy_life = 0;
    }
    if (this.enemy_life === 0) {
      this.gameStarted = false;
      clearInterval(this.timer);
        //alert('Vous avez gagné!');
    }
  }

  getLifePercentage() {
    return (this.enemy.hp / this.enemy_life) * 100;
  }

  damageCalculator() : number{
    return ((((((2 * this.player.level * this.criticalCalculator(this.player.spd)) / 5) + 2) * this.player.atk / this.enemy.def) / 50) + 2) // * stab( 1 , 1.5 ) * type1( 0.5 , 1 , 2 ) * type2( 0.5 , 1 , 2 )
  }

  criticalCalculator(speed : number) : number {
    let rand = Math.floor(Math.random() * 256)
    let treshold : number = Math.floor(speed / 2);
    if (treshold > 255)
      treshold = 255;
    if (rand < treshold)
      return 2;
    return 1;

  }


    // @ViewChild('popContainer', { read: ViewContainerRef })
    // popContainer! : ViewContainerRef;

    // private _componentFactoryResolver : ComponentFactoryResolver

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

}
