import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/shared/models/trainer';
import { LauncherService } from 'src/app/shared/services/launcher/launcher.service';
import { MemoryCardService } from 'src/app/shared/services/memory-card/memory-card.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user : Trainer;
  user_sprite : string;
  data : string;
  logout : boolean = false;

  constructor(private _serv : MemoryCardService, private _launcher : LauncherService, private _router : Router) {
    this.user = _serv.getUser();
    this.user_sprite = `assets/trainer_${this.user.gender}.png`
    this.data = _serv.getDataToString();
  }

  logOut() {
    this._launcher.logout();
    this._router.navigate(['/']);
  }
}
