import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, mergeMap } from "rxjs/operators";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ActivateService} from './activate.service';
import { ToastrService } from "ngx-toastr";


@Injectable({ providedIn: 'root' })
export class ActivateRoutingResolveErvice implements Resolve<string> {
  constructor(protected service: ActivateService, protected router: Router,private toastrService: ToastrService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string> | Observable<never> {
    const id = route.params.key;
    Swal.fire({
      title: 'Vérification en cours .',
      html: 'veuillez patienter...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    if (id) {

      return this.service.get(id).pipe(
        mergeMap((obj: HttpResponse<any>) => {

          Swal.close();
          if (obj.body.key) {

            console.log('key  resolve ' + obj.body.key);
            return of(obj.body.key);
          } else {
            this.router.navigate(['/error/error404']);
            return EMPTY;
          }
        },


        ),
        catchError(err => {
          console.log(err);
          Swal.close();
          this.toastrService.info('Compte déja activé');
          this.router.navigate(['authorize/login']);
          return EMPTY;
        })
      );

    }
    else {

      this.toastrService.info('Compte déja activé');
      this.router.navigate(['authorize/login']);

    }


  }
}
