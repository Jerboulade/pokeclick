import { Injectable } from '@angular/core';
import { pokemonForm } from '../../models/pokemonForm';
import { Trainer } from '../../models/trainer';
import { MemoryCardService } from '../memory-card/memory-card.service';

@Injectable({
  providedIn: 'root'
})
export class LauncherService {

  connectedAs! : string;

  get getUserToken(){
    return this.connectedAs;
  }

  constructor( private _serv : MemoryCardService ) { }

  createUser(form : any) : string{
    return this.connectedAs = this._serv.createUser(form);
  }


}
