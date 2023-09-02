import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../../_metronic/partials';
import { ReclamationComponent } from './reclamation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReclamationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReclamationComponent,
      },
    ]),
    WidgetsModule,
  ],
})
export class ReclamationModule { }
