import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable, ReplaySubject, of } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
import {StateStorageService} from './state-storage.service';
import {Account} from './account.model';
import {ApplicationConfigService} from "./application-config";

@Injectable({ providedIn: 'root' })
export class AccountService {
    account: any;
    synchroAccount() {
      throw new Error('Method not implemented.');
    }
    private userIdentity: Account | null = null;
    private authenticationState = new ReplaySubject<Account | null>(1);
    private accountCache$?: Observable<Account> | null;

    constructor(
        private translateService: TranslateService,
        private sessionStorageService: SessionStorageService,
        private http: HttpClient,
        private stateStorageService: StateStorageService,
        private router: Router,
        private applicationConfigService: ApplicationConfigService
    ) {}

    authenticate(identity: Account | null): void {
        this.userIdentity = identity;
        this.authenticationState.next(this.userIdentity);
        if (!identity) {
            this.accountCache$ = null;
        }
    }

    hasAnyAuthority(authorities: string[] | string): boolean {
        this.identity(true);
        if (!this.userIdentity) {
            console.log("user not authenticated");
            return false;
        }
        if (!Array.isArray(authorities)) {
            authorities = [authorities];
        }
        return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
    }

    identity(force?: boolean): Observable<Account | null> {
        if (!this.accountCache$ || force) {
            this.accountCache$ = this.fetch().pipe(
                tap((account: Account) => {
                    this.authenticate(account);

                    this.navigateToStoredUrl();
                }),
                shareReplay()
            );
        }
        return this.accountCache$.pipe(catchError(() => of(null)));
    }

    isAuthenticated(): boolean {
        return this.userIdentity !== null;
    }

    getAuthenticationState(): Observable<Account | null> {
        return this.authenticationState.asObservable();
    }

    private fetch(): Observable<Account> {
        console.log("fetching account ...");
        return this.http.get<Account>(this.applicationConfigService.getEndpointFor('/api/account'));
    }

    private navigateToStoredUrl(): void {
        // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
        // if login is successful, go to stored previousState and clear previousState
        const previousUrl = this.stateStorageService.getUrl();
        if (previousUrl) {
            this.stateStorageService.clearUrl();
            this.router.navigateByUrl(previousUrl);
        }
    }
}
