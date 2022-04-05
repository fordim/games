import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { BehaviorSubject } from "rxjs";
import { ERROR_CODE } from "../services/const";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public modal$ = new BehaviorSubject<boolean>(false);
  public contentTextEvent$ = new BehaviorSubject<string>('');
  public buttonTextEvent$ = new BehaviorSubject<string>('');
  public loginForm$ = new BehaviorSubject<boolean>(true);
  public isFormSuccess$ = new BehaviorSubject<boolean>(false);

  public name: string = '';
  public login: string = '';
  public password: string = '';

  constructor(private _auth: AuthService, private _user: UserService) {
  }

  ngOnInit(): void {
    this._auth.setStartUsersToLocalStorage();
    this.isFormSuccess$.next(this._user.getActiveUser());
  }

  public addUser(name: string, login: string, password: string): void {
    if (name === '' || login === '' || password === '') {
      return;
    }

    const addUserRequest = this._auth.addUser(name, login, password);

    if (addUserRequest.code === ERROR_CODE) {
      this.showModal(addUserRequest.message, true);
      return;
    }

    this.showModal(addUserRequest.message);
  }

  public logIn(login: string, password: string): void {
    if (login === '' || password === '') {
      return;
    }

    const logInRequest = this._auth.logId(login, password);

    if (logInRequest.code === ERROR_CODE) {
      this.showModal(logInRequest.message, true);
      return;
    }

    this.showModal(logInRequest.message);
  }

  public registrationForm(): void {
    this.loginForm$.next(false);
  }

  public loginForm(): void {
    this.loginForm$.next(true);
  }

  public showModal( textEvent: string, error: boolean = false ): void {
    this.modal$.next(true);
    this.contentTextEvent$.next(textEvent);
    this.buttonTextEvent$.next('Продолжить');

    if (error) {
      this.buttonTextEvent$.next('Ок');
    } else {
      this.isFormSuccess$.next(true);
    }
  }

  public closeModal() {
    this.modal$.next(false);

    if (this.isFormSuccess$.value){
      this._user.activateUser();
      this._user.setActiveUserName();
    }
  }
}
