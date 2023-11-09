import { Component, inject } from '@angular/core';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { SubscriptionTypeStore } from 'src/app/store/subscriptionTypeStore';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  subscriptionService: SubscriptionService = inject(SubscriptionService);
  constructor(public subscriptionTypeStore: SubscriptionTypeStore ) { }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptionType().subscribe();
  }

}
