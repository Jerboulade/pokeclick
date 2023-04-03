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

  get isConnect() : boolean{
    // return this.isConnected;
    return localStorage.getItem('user') != undefined;
  }

  constructor( private _serv : MemoryCardService ) { }

  signUp(form : any) : Trainer{
    this.connectedAs = this._serv.createUser(form)
    localStorage.setItem('token', this.connectedAs);
    this.isConnected = true;
    return this._serv.getUser();
  }

  login(form : any){
    this.connectedAs = this._serv.getUserToken(form)
    localStorage.setItem('token', this.connectedAs);
    this.isConnected = true;
  }

  logout(){
    this.connectedAs = '';
    localStorage.removeItem('token')
    this.isConnected = false;
    this._serv.emptyLocalStorage();
  }

  getUser() : Trainer {
    return this._serv.getUser();
  }

  updateUser(user : Trainer) {
    this._serv.updateUser(user);
  }




}
