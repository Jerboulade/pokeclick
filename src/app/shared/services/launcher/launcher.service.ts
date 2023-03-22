import { Injectable } from '@angular/core';
import { pokemonForm } from '../../models/pokemonForm';
import { Trainer } from '../../models/trainer';
import { MemoryCardService } from '../memory-card/memory-card.service';

@Injectable({
  providedIn: 'root'
})
export class LauncherService {

  private connectedAs! : string;
  isConnected: boolean = false;

  get getUserToken(){
    return this.connectedAs;
  }

  constructor( private _serv : MemoryCardService ) { }

  signUp(form : any) : string{
    return this.connectedAs = this._serv.createUser(form);
    this.connectedAs
  }

  login(form : any){
    this.connectedAs = this._serv.getUser(form)
    localStorage.setItem('token', this.connectedAs);
    this.isConnected = true;
  }

  logout(){
    this.connectedAs = '';
    localStorage.removeItem('token')
    this.isConnected = false;
  }

  get isConnect() : boolean{
    return this.isConnected;
    //return localStorage.getItem('token') != undefined;
  }


}
