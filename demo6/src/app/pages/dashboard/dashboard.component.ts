import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICreateAccount, inits } from 'src/app/modules/wizards/create-account.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  formsCount = 5;
  account$: BehaviorSubject<ICreateAccount> =
    new BehaviorSubject<ICreateAccount>(inits);
  currentStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  isCurrentFormValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private unsubscribe: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {}

  updateAccount = (part: Partial<ICreateAccount>, isFormValid: boolean) => {
    const currentAccount = this.account$.value;
    const updatedAccount = { ...currentAccount, ...part };
    this.account$.next(updatedAccount);
    this.isCurrentFormValid$.next(isFormValid);
  };

  nextStep() {
    const nextStep = this.currentStep$.value + 1;
    if (nextStep > this.formsCount) {
      return;
    }
    this.currentStep$.next(nextStep);
  }

  prevStep() {
    const prevStep = this.currentStep$.value - 1;
    if (prevStep === 0) {
      return;
    }
    this.currentStep$.next(prevStep);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

