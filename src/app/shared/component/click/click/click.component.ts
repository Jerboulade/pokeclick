import { trigger, transition, style, animate, state } from '@angular/animations';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { pokemonForm } from 'src/app/shared/models/pokemonForm';
import { PopService } from 'src/app/shared/services/popService/pop.service';

@Component({
  selector: 'app-click',
  templateUrl: './click.component.html',
  styleUrls: ['./click.component.scss'],
  animations: [
    trigger('popAnimation', [
      transition('false => true', [
        animate('50ms ease-out', style({ transform: 'translateY(-100px) translateX(100px)' })),
      ])
    ]),
    trigger('bim', [
      transition('false => true', [
        animate('50ms ease-out', style({ transform: 'skewY(-10deg) skewX(-10deg)', filter: 'invert(1)'  })),
      ])
    ])
  ]
})
export class ClickComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  pokePlayer! : pokemonForm;
  @Input()
  enemy! : pokemonForm;
  // @Input()
  // player_sprite! : string;
  // @Input()
  // enemy_sprite! : string;

  clic : number = 0;
  pop : boolean = false;

  @Output() clickEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() endFight: EventEmitter<string> = new EventEmitter<string>();

  player_life! : number;
  enemy_life! : number;

  gameStarted = false;
  gameFinished = false;
  errorMessage! : string;
  timer : any;


  constructor( private _popService : PopService ) {
      // console.log("Click init");
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);

  }
  ngOnChanges(changes: SimpleChanges): void {
    //this.clickEvent.emit( this.clic );

    clearInterval(this.timer);
    if (changes['enemy'] || changes['pokePlayer'])
      this.ngOnInit();
  }
  ngOnInit(): void {
    this.enemy_life = this.enemy.hp;
    this.player_life = this.pokePlayer.hp;
    //this.clickEvent.emit( this.clic );
    this.clic = 0;
    this.gameStarted = false;
    this.gameFinished = false;

    // console.log("coucou"+this.enemy_life);
    // throw new Error('Method not implemented.');
  }


  startGame() {
    // this.enemy_life = this.enemy.hp;
    // console.log("coucou"+this.enemy_life);
    this.timer = setInterval(() => {
      if (this.enemy_life < this.enemy.hp){
        if (this.enemy_life + 1 > this.enemy.hp)
          this.enemy_life = this.enemy.hp - 1;
        this.enemy_life++;
      }
    }, 500);
    this.gameStarted = true;
  }

  dealDamage($event: MouseEvent) {
    if (this.pop)
      this.pop = false
    this.pop = true;
    setTimeout(() => {
      this.pop= false
    }, 100);
    // this.pop = false;

    let dmg = this.damageCalculator(); //Math.ceil(Math.random() * 16) + 1
    // console.log("dealDamage.dmg = "+dmg);
    this._popService.onClic($event, dmg.toPrecision(4));
    ++this.clic;
    if (this.gameStarted && this.enemy_life > 0) {
      if (this.enemy_life - dmg >= 0)
        this.enemy_life -= dmg;
      else
        this.enemy_life = 0;
    }
    if (this.enemy_life <= 0) {
      this.gameStarted = false;
      this.gameFinished = true;
      this.pokePlayer.setXp = this.clic;
      this.clickEvent.emit( this.clic );
      this.endFight.emit("win");
      this.clic = 0;
      clearInterval(this.timer);
        //alert('Vous avez gagné!');
    }
  }

  catch() {
    this.clickEvent.emit( this.clic );
    this.endFight.emit("catch");
    this.clic = 0;
    this.gameStarted = false;
    this.gameFinished = true;
    clearInterval(this.timer);

  }

  getLifePercentage() {
    // console.log("getLifePercentage.enemy.hp : "+this.enemy.hp);
    // console.log("getLifePercentage.enemy_life : "+this.enemy_life);
    // console.log("getLifePercentage(enemy.hp/enemy_life) = "+(this.enemy.hp / this.enemy_life));
    return (this.enemy_life / this.enemy.hp) * 100;
  }

  damageCalculator() : number{
    // console.log("p.level : "+this.pokePlayer.level);
    // console.log("p.spd : "+this.pokePlayer.spd);
    // console.log("p.atk : "+this.pokePlayer.atk);
    // console.log("e.def : "+this.enemy.def);
    // console.log("p.level : "+this.pokePlayer.level);
    // src: https://bulbapedia.bulbagarden.net/wiki/Damage
    return ((((((2 * this.pokePlayer.level * this.criticalCalculator(this.pokePlayer.spd)) / 5) + 2) * this.pokePlayer.atk / this.enemy.def) / 50) + 0.5) // * stab( 1 , 1.5 ) * type1( 0.5 , 1 , 2 ) * type2( 0.5 , 1 , 2 )
  }

  criticalCalculator(speed : number) : number {
    let rand = Math.floor(Math.random() * 256)
    // console.log("- CRIT : ");
    // console.log("random num : "+rand+" / 255");

    let treshold : number = Math.floor(speed / 2);
    // console.log("tresh : "+treshold+" / 255");

    if (treshold > 255)
      treshold = 255;
    if (rand < treshold){
      console.log("- CRIT : ");
      return 2;
    }
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
