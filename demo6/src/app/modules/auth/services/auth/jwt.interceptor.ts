import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {AccountService} from "./account.service";
import {StateStorageService} from "./state-storage.service";
import {AuthenticationService} from "./auth.service";



@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor(
        private loginService: AuthenticationService,
        private stateStorageService: StateStorageService,
        private router: Router,
        private accountService: AccountService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({ setHeaders:
                {


                    'Access-Control-Allow-Origin' :'*' ,
                    'Access-Control-Allow-Methods': 'GET, POST, PUT,DELETE,OPTIONS' ,
                    'Access-Control-Allow-Headers': 'Content-Disposition,DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range' ,
                    'Access-Control-Expose-Headers' :'Content-Disposition,Content-Length,Content-Range,X-Requested-With'
                },
            withCredentials:true

        });

        return next.handle(request).pipe(
            tap({
                error: (err: HttpErrorResponse) => {
                    if (err.status === 401 && err.url && !err.url.includes('api/account') && this.accountService.isAuthenticated()) {
                        this.stateStorageService.storeUrl(this.router.routerState.snapshot.url);
                        this.loginService.logout();
                    }
                    else if (err.status === 401 && err.url && err.url.includes('api/account') && !this.accountService.isAuthenticated())
                    {
                        this.loginService.login();
                    }
                },
            })
        );
    }
}
