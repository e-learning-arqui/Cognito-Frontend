import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubscriptionTypeDto } from '../model/dto/SubscriptionTypeDto';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private selectedPlanSource = new BehaviorSubject<SubscriptionTypeDto | null>(this.getStoredPlan());
  selectedPlan$ = this.selectedPlanSource.asObservable();

  setSelectedPlan(plan: SubscriptionTypeDto) {
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    this.selectedPlanSource.next(plan);
  }

  private getStoredPlan(): SubscriptionTypeDto | null {
    const plan = localStorage.getItem('selectedPlan');
    return plan ? JSON.parse(plan) : null;
  }
}
