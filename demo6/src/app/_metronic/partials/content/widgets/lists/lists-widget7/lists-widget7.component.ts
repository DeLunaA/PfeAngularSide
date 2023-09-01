import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/auth/account.service';
import { LoginService } from 'src/app/login/login.service';
import { CoursService } from './cours.service';


@Component({
  selector: 'app-lists-widget7',
  templateUrl: './lists-widget7.component.html',
})
export class ListsWidget7Component implements OnInit, OnDestroy {

  cours:any;
  _user:any;
  _demande:any;
  private unsubscribe: Subscription[] = [];

  constructor(
    private loginService: LoginService,
    private accountService : AccountService,
    private http:HttpClient,
    private coursService : CoursService
  ) {}

  ngOnInit(): void {
    this._user =  this.accountService.account;
    this._demande = this.accountService.account;

    this.coursService.query().subscribe(x=>{
      this.cours=x.body;
    })
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
