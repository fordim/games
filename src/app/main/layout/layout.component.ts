import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  activeUser$ = this._user.activeUser$;
  activeUserName$ = this._user.activeUserName$;

  constructor(private _user: UserService) {
  }

  ngOnInit(): void {
  }

  public logout() {
    this._user.logoutUser();
  }
}
