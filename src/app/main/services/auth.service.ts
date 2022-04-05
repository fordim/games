import { Injectable } from '@angular/core';
import { ERROR_CODE, SUCCESS_CODE } from "./const";
import { ModalMessage } from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users: string[] = ['admin'];
  public admin = {
    name: 'Админ',
    login: 'admin',
    password: 'admin'
  };

  constructor() { }

  public addUser(name: string, login: string, password: string): ModalMessage {
    let usersString = window.localStorage.getItem('users') ?? '';
    const users = usersString.split(',');

    const usersFilter = users.filter(user => user === login);

    if (usersFilter.length > 0) {
      return { code: ERROR_CODE, message: 'Юзер с таким логином существует' }
    }

    users.push(login);
    this.users = users;

    const newUser = {
      name: name,
      login: login,
      password: password
    }

    window.localStorage.setItem('users', users.join());
    window.localStorage.setItem(login, JSON.stringify(newUser));
    window.localStorage.setItem('activeUser', JSON.stringify(newUser));
    return { code: SUCCESS_CODE, message: 'Пользователь успешно создан' }
  }

  public logId(login: string, password: string): ModalMessage {
    let usersString = window.localStorage.getItem('users') ?? '';
    const users = usersString.split(',');
    const usersFilter = users.filter(user => user === login);

    if (usersFilter.length === 0) {
      return { code: ERROR_CODE, message: 'Юзер с таким логином не существует' }
    }

    let activeUser = window.localStorage.getItem(login) ?? '';
    let activeUserObject = JSON.parse(activeUser);

    if (!AuthService.validatePassword(password, activeUserObject)) {
      return { code: ERROR_CODE, message: 'Пароль не подходик к данному юзеру' }
    }

    window.localStorage.setItem('activeUser', JSON.stringify(activeUserObject))
    return { code: SUCCESS_CODE, message: 'Авторизация прошла успешно' }
  }

  private static validatePassword(password: string, activeUserObject: any): boolean {
    return activeUserObject.password === password ?? false;
  }

  public logout(): void {
    window.localStorage.removeItem('activeUser');
  }

  public setStartUsersToLocalStorage(): void {
    let usersString = window.localStorage.getItem('users') ?? '';
    if (usersString !== '') {
      return;
    }

    window.localStorage.setItem('users', this.users.join());
    window.localStorage.setItem('admin', JSON.stringify(this.admin));
  }
}
