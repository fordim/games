import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  activeUser$ = new BehaviorSubject<boolean>(false);
  activeUserName$ = new BehaviorSubject<string | null>('');

  constructor(private _auth: AuthService) {
    this.activeUser$.next(this.getActiveUser());
    this.activeUserName$.next(this.getActiveUserName());
  }

  public activateUser(): void {
    this.activeUser$.next(true);
  }

  public logoutUser(): void {
    this._auth.logout();
    this.activeUser$.next(false);
  }

  public getActiveUser(): boolean {
    let activeUser = window.localStorage.getItem('activeUser') ?? '';
    return activeUser !== '';
  }

  public getActiveUserName(): string {
    let activeUser = window.localStorage.getItem('activeUser') ?? '';
    if (activeUser === '') {
      return '';
    }

    let activeUserObject = JSON.parse(activeUser);
    return activeUserObject.name
  }

  public setActiveUserName(): void {
    let activeUser = window.localStorage.getItem('activeUser') ?? '';
    if (activeUser !== '') {
      let activeUserObject = JSON.parse(activeUser);
      this.activeUserName$.next(activeUserObject.name)
    }
  }
}
