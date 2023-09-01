import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { PasswordResetFinishService } from './password-reset-finish.service';
import { MessageService } from "primeng/api";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-password-reset-finish',
  templateUrl: './password-reset-finish.component.html',
  styleUrls: ['./password-reset-finish.component.css'],
  providers: [ MessageService]
})
export class PasswordResetFinishComponent implements OnInit, AfterViewInit {
  @ViewChild('newPassword', { static: false })
  newPassword?: ElementRef;

  initialized = false;
  doNotMatch = false;
  error = false;
  success = false;
  key = '';
  loading=false;
  fieldTextType=false;
  fieldTextType2=false;



  passwordForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  constructor(
    private toastrService: ToastrService,
    private messageService:MessageService,
                  private  router:Router,private passwordResetFinishService: PasswordResetFinishService, private route: ActivatedRoute, private fb: FormBuilder) {}
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.key) {
        this.key = params.key;
      }

      this.initialized = true;
    });
  }

  ngAfterViewInit(): void {
    if (this.newPassword) {
      this.newPassword.nativeElement.focus();
    }
  }

  finishReset(): void {
    this.doNotMatch = false;
    this.error = false;

    // tslint:disable-next-line:no-non-null-assertion
    const newPassword = this.passwordForm.get(['newPassword'])!.value;
    // tslint:disable-next-line:no-non-null-assertion
    const confirmPassword = this.passwordForm.get(['confirmPassword'])!.value;

    if (newPassword !== confirmPassword) {
      this.doNotMatch = true;
    } else {
      this.loading=true;

      this.passwordResetFinishService.save(this.key, newPassword).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Message',
            detail: 'Mot de passe changé avec succés'
          });
          this.toastrService.success("Mot de passe changé avec succés");
          this.success = true;
          this.loading=false;
          this.router.navigate(['authorize/login']);
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Message',
            detail: err.error.detail
          });
          this.error = true;
          this.success = false;
          this.loading=false;
        },
      });
    }
  }
}
