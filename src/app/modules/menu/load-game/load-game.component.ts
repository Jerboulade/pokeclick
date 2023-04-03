import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemoryCardService } from 'src/app/shared/services/memory-card/memory-card.service';

@Component({
  selector: 'app-load-game',
  templateUrl: './load-game.component.html',
  styleUrls: ['./load-game.component.scss']
})
export class LoadGameComponent {

  data : string = "";

  constructor(private _serv : MemoryCardService, private _router : Router) {}

  loadGame() {
    localStorage.setItem('user', JSON.parse(this._serv.decrypt(this.data)));
    this._router.navigate(['/game']);
  }
}
