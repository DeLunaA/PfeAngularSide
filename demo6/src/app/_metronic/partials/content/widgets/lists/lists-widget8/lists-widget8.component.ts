import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lists-widget8',
  templateUrl: './lists-widget8.component.html',
})
export class ListsWidget8Component {
  @Input() cssClass = '';

  courses= [];

  constructor() {}

  // this.courseService.findAll().subscribe(result=>{this.courses=result.body})
;}
