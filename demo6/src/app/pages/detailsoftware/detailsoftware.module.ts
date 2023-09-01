import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetailsoftwareComponent } from './detailsoftware.component';
import { WidgetsModule } from '../../_metronic/partials';

@NgModule({
  declarations: [DetailsoftwareComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailsoftwareComponent,
      },
    ]),
    WidgetsModule,
  ],
})
export class DetailsoftwareModule { }
