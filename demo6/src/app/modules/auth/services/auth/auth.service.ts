import { Injectable } from '@angular/core';
import { User } from './auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {ApplicationConfigService} from "./application-config";
import {Logout} from "./logout.model";
import {AuthServerProvider} from "./auth-session.service";
import { Location } from '@angular/common';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    user!: User;
    currentUserValue: any;

    // public currentUser: Observable<User>;

    constructor( private location:Location,private http: HttpClient  ,private applicationConfigService: ApplicationConfigService, private authServerProvider: AuthServerProvider) {

          }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */

    login(): void {
        // If you have configured multiple OIDC providers, then, you can update this URL to /login.
        // It will show a Spring Security generated login page with links to configured OIDC providers.
      //  console.log( `${location.origin}${this.location.prepareExternalUrl('oauth2/authorization/oidc')}`);
        //  location.href = location.origin+`/api/oauth2/authorization/oidc`;

        console.log("redirect to login ....");


    }

    logout(): void {


    }




    /**
     * Returns the current user
     */


    /**
     * Logout the user
     */


    logoutBackEnd(token: string): Observable<Logout> {


        return this.http.post<Logout>(this.applicationConfigService.getEndpointFor('/logout?idToken='+token,'gateway'), {});


    }


}

