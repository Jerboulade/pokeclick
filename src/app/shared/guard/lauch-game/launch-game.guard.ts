import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LauncherService } from '../../services/launcher/launcher.service';

@Injectable({
  providedIn: 'root'
})
export class LaunchGameGuard implements CanLoad {
  constructor(private _launcher : LauncherService, private _router : Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this._launcher.isConnect)
      this._router.navigate(['/newgame']);
    return this._launcher.isConnect;
  }
}
