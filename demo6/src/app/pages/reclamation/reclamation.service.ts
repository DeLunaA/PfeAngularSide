import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReclamationData } from './reclamation-data.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {


  constructor(private http: HttpClient) { }

submitReclamationData(reclamationData: ReclamationData) {
  return this.http.post('/api/your-endpoint', reclamationData);
}
}
