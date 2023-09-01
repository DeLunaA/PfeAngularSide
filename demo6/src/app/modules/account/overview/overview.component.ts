import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/auth/account.service';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit, OnDestroy {
 
  _user:any;
  private unsubscribe: Subscription[] = [];

  constructor(
    private loginService: LoginService,
    private accountService : AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.synchroAccount();

    this._user =  this.accountService.account;
  }

  logout ()
{
  this.loginService.logout("logout");

}

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
