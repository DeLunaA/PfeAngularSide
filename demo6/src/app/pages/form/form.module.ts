import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { WidgetsModule } from '../../_metronic/partials';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormComponent,
      },
    ]),
    WidgetsModule,
  ],
})
export class FormModule { }
