import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { ActivateService } from './activate.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
})
export class ActivateComponent implements OnInit {
  error = false;
  success = false;

  constructor(private activateService: ActivateService, private route: ActivatedRoute,private routerLink:Router) {}

  ngOnInit(): void {

    console.log("activating ...");
    this.route.data.subscribe(({ key }) => {
      console.log('ng init key ',key);
      this.success=true;
      this.routerLink.navigateByUrl('/authorize/reset/finish?key='+key);
    } ,
      err => {
      console.log("redirect to login");
        this.routerLink.navigateByUrl('/authorize/login');

        this.error=true;
      });


  }
}
