import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionTypeDto } from 'src/app/model/dto/SubscriptionTypeDto';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { SubscriptionTypeStore } from 'src/app/store/subscriptionTypeStore';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  subscriptionService: SubscriptionService = inject(SubscriptionService);
  constructor(
    public subscriptionTypeStore: SubscriptionTypeStore,
    private sharedDataService: SharedDataService,
     private router: Router
  
    ) { }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptionType().subscribe();
  }
  onSubscribe(subType: SubscriptionTypeDto) {
    this.sharedDataService.setSelectedPlan(subType);
    this.router.navigate(['/subscription/create',{ planId: subType.id }]); 
  }


}
