import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent  {

  constructor(private route: ActivatedRoute,private routerLink:Router) {}


}
