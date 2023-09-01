import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {ApplicationConfigService} from "./application-config";
import {Logout} from "./logout.model";

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
    constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

    logout(token: string): Observable<Logout> {


        return this.http.post<Logout>(this.applicationConfigService.getEndpointFor('/api/logout?idToken='+token,'gateway'), {});


    }
}
