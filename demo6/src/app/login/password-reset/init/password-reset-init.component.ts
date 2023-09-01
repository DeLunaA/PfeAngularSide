import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PasswordResetInitService } from './password-reset-init.service';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-password-reset-init',
  templateUrl: './password-reset-init.component.html',
  styleUrls: ['./password-reset-init.component.css'],
  providers: [ MessageService]
})
export class PasswordResetInitComponent implements AfterViewInit {
  @ViewChild('email', { static: false })
  email?: ElementRef;

  success = false;
  loading=false;
  resetRequestForm = this.fb.group({
    email: [null, [Validators.required]],
  });

  constructor(    private messageService:MessageService,
                  private passwordResetInitService: PasswordResetInitService, private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    if (this.email) {
      this.email.nativeElement.focus();
    }
  }

  requestReset(): void {
    this.loading=true;
    // tslint:disable-next-line:no-non-null-assertion
    this.passwordResetInitService.save(this.resetRequestForm.get(['email'])!.value).subscribe(() =>
    {
      console.log("saved ");
      this.messageService.add({
        severity: 'warning',
        summary: 'Message',
        detail: 'un email a été envoyé '
      });
      this.loading=false;
    this.success = true;
    }
    );
  }
}
