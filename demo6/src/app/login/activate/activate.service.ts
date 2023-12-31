import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApplicationConfigService} from '../../core/config/application-config.service';


@Injectable({ providedIn: 'root' })
export class ActivateService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  get(key: string): Observable<any> {
    return   this.http.get<any>(this.applicationConfigService.getEndpointFor('api/activate'),
      { observe: 'response' ,
      params: new HttpParams().set('key', key),
    });
  }
}
