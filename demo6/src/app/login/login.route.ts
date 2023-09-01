import {  Routes} from '@angular/router';
import { LoginComponent } from './login.component';
import { passwordResetFinishRoute } from './password-reset/finish/password-reset-finish.route';
import { passwordResetInitRoute } from './password-reset/init/password-reset-init.route';
import {activateRoute} from './activate/activate.route';;
import {ConnexionComponent} from './connexion/connexion.component';
import {LockscreenComponent} from './lockscreen/lockscreen.component';
import { PasswordResetInitComponent } from "./password-reset/init/password-reset-init.component";
import { InscriptionComponent } from "./inscription/inscription.component";

 const LOGIN_ROUTE: Routes =
  [ {
     path: '',
     component: LoginComponent,
     children: [
       {
         path: 'login',
         component: ConnexionComponent,

       }
       ,
       {
         path: 'inscription',
         component: InscriptionComponent,

       }
       ,
       {
         path: 'reset-password',
         component: PasswordResetInitComponent,

       }
       ,
       activateRoute,
       passwordResetFinishRoute,
       passwordResetInitRoute
     ]
   }];

    export const PUBLIC_ROUTES = LOGIN_ROUTE;

