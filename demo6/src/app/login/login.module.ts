import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PUBLIC_ROUTES } from './login.route';
import { LoginComponent } from './login.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';
import {ActivateComponent} from './activate/activate.component';
import { NgOtpInputModule } from  'ng-otp-input';
import {PasswordModule} from 'primeng/password';
import {LockscreenComponent} from './lockscreen/lockscreen.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { WelcomeComponent } from "./welcome/welcome.component";
import { InscriptionComponent } from "./inscription/inscription.component";

@NgModule({
    imports: [ToastModule, SharedModule, NgOtpInputModule, PasswordModule, MessageModule,    RouterModule,
      MessageModule, RouterModule.forChild(PUBLIC_ROUTES), MessagesModule],
  declarations: [InscriptionComponent,WelcomeComponent,ConnexionComponent,LockscreenComponent,PasswordResetInitComponent,PasswordResetFinishComponent,
    ActivateComponent,LoginComponent],
    exports:[MessageModule,MessageModule],
  providers: [ MessageService]

})
export class LoginModule {}
