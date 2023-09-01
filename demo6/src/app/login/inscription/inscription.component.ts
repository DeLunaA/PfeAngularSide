import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from "primeng/api";
import { PasswordResetInitService } from "../password-reset/init/password-reset-init.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  providers: [ MessageService]
})
export class InscriptionComponent implements AfterViewInit {
  @ViewChild('matricule', { static: false })
  matricule?: ElementRef;

  success = false;
  loading=false;
  resetRequestForm = this.fb.group({
    matricule: [null, [Validators.required]],
  });

  constructor(    private messageService:MessageService,
                  private passwordResetInitService : PasswordResetInitService,
                private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    if (this.matricule) {
      this.matricule.nativeElement.focus();
    }
  }

  requestReset(): void {
    this.loading=true;
    // tslint:disable-next-line:no-non-null-assertion
    this.passwordResetInitService.inscription(this.resetRequestForm.get(['matricule'])!.value).subscribe(() =>
    {
      this.loading=false;

      this.messageService.add({
        severity: 'warning',
        summary: 'Message',
        detail: 'un email de confirmation a été envoyé '
      });
      this.loading=false;
    this.success = true;
    },
      (error)=>{
        this.loading=false;

        this.messageService.add({
          severity: 'error',
          summary: 'Message',
          detail: error.error.title
        });
      }
    );
  }
}
