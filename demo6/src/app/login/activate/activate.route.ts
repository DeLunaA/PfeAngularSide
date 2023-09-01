import { Route } from '@angular/router';

import { ActivateComponent } from './activate.component';
import {ActivateRoutingResolveErvice} from './activate-routing-resolve.ervice';

export const activateRoute: Route = {
  path: ':key/activate',
  component: ActivateComponent,
  resolve: {
    key: ActivateRoutingResolveErvice,
  },
  data: {
    pageTitle: 'activate.title',
  },
};
