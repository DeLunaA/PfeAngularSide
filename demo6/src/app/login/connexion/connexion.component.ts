import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LoginService } from '../../login/login.service';
import { AccountService } from '../../core/auth/account.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from 'src/app/config/language.constants';
import { SessionStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  providers: [ MessageService]
})
export class ConnexionComponent implements OnInit {
  @ViewChild('username', { static: false })
  username!: ElementRef;
  authenticationError = false;
  isLogging:boolean;
  display: any;
  checkingOtp=false;
  displayOtp=false;
  fieldTextType=false;
  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    otp: [null, []],
    rememberMe: [false],
  });
  languages = LANGUAGES;
  language: string;

  constructor(
    private route:ActivatedRoute,
    private toastrService : ToastrService,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private messageService:MessageService,
    public translateService: TranslateService,
  ) {

    const defaultThemeMode = 'light'; let themeMode;
  if ( document.documentElement )
   { if ( document.documentElement.hasAttribute('data-bs-theme-mode'))

  { themeMode = document.documentElement.getAttribute('data-bs-theme-mode');
  } else
  { if ( localStorage.getItem('data-bs-theme') !== null ) { themeMode = localStorage.getItem('data-bs-theme');
 }
  else { themeMode = defaultThemeMode; } }
  if (themeMode === 'system')
  { themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }

   document.documentElement.setAttribute('data-bs-theme', themeMode);
   }

  }

  ngOnInit(): void {

    if (    this.route.snapshot.paramMap.get('reason')
  !=null){
      this.messageService.add({
        severity: 'info',
        summary: 'Message',
        detail: this.route.snapshot.paramMap.get('reason')
      });
    }

    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['dashboard/home']);      }
    });
  }


  timer(minute) {
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec = 60;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec !== 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  resendCodeOTP(){
    this.login();
  }



  login(): void {


      this.isLogging=true;
      Swal.fire({
        title: 'vérification en cours...',
        html: 'veuillez patienter...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });
      this.loginService.login({
        // tslint:disable-next-line:no-non-null-assertion
        username: this.loginForm.get('username')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        password: this.loginForm.get('password')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        otp: this.loginForm.get('otp')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        rememberMe: this.loginForm.get('rememberMe')!.value,
      }).subscribe({
        next: () => {
          this.authenticationError = false;
          if (!this.router.getCurrentNavigation()) {
            // There were no routing during login (eg from navigationToStoredUrl)
            this.router.navigate(['']);
          }
        },
        error: () => (this.authenticationError = true),
      });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  onOtpChange(event :any)
  {
    if (event.toString().length===7)
    {

      this.loginForm.get('otp').setValue(event);
      if (!this.checkingOtp)
      this.otpCheck(event);
    }
  }

   private otpCheck(otp:number)
  {
    this.checkingOtp=true;
    this.loginService
      .login({
        // tslint:disable-next-line:no-non-null-assertion
        username: this.loginForm.get('username')!.value,
        // tslint:disable-next-line:no-non-null-assertion
        password: this.loginForm.get('password')!.value,
        otp,
        // tslint:disable-next-line:no-non-null-assertion
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe({
        next: () => {
          this.checkingOtp=false;
          this.isLogging=false;
          Swal.close();
          this.authenticationError = false;
          if (!this.router.getCurrentNavigation()) {

            this.messageService.add({
              severity: 'info',
              summary: 'Message',
              detail: 'Bienvenue'
            });

          this.router.navigate(['dashboard/home'])
              .then(() => {
              })
            .catch(()=>{
            })
          ;

          }
        },
        error: () => {
          this.checkingOtp=false;
          this.isLogging=false;
          Swal.close();

        },

      });
  }

}
