import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Account } from '../core/auth/account.model';
import { AccountService } from '../core/auth/account.service';
import { AuthServerProvider } from '../core/auth/auth-jwt.service';
import { Login } from './login.model';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private accountService: AccountService,
              private router: Router,
              private authServerProvider: AuthServerProvider) {}

  login(credentials: any): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
  }


  logout(reason : any): void {

    console.log("calling logout");
    this.authServerProvider.logout().subscribe({ complete: () => {
        this.accountService.authenticate(null);
        this.router.navigate(['auth/login']);

      } });
  }
}
