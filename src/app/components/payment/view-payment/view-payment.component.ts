import { Component, OnInit, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Card } from 'src/app/model/Card';
import { SubscriptionTypeDto } from 'src/app/model/dto/SubscriptionTypeDto';
import { PaymentService } from 'src/app/services/payment.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { CardStore } from 'src/app/store/cardStore';



@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {
  selectedPlan: SubscriptionTypeDto | null = null;
  userCards: Card[] = [];
  keycloakService: KeycloakService = inject(KeycloakService);

  constructor(
    private sharedDataService: SharedDataService,
    private paymentService: PaymentService,
    public cardStore: CardStore
  ) { }

  ngOnInit(): void {
    this.loadSelectedPlan();
    this.paymentService.getCards(this.keycloakService.getKeycloakInstance().subject!)
      .subscribe(cards => {
        this.userCards = cards;
      });
  }

  private loadSelectedPlan() {
    const planData = localStorage.getItem('selectedPlan');
    if (planData) {
      this.selectedPlan = JSON.parse(planData);
    }
  }

}



/*import { Component, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { PaymentService } from 'src/app/services/payment.service';
import { CardStore } from 'src/app/store/cardStore';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent {
  keycloakService: KeycloakService = inject(KeycloakService);
  
  paymentService: PaymentService = inject(PaymentService);
  constructor(public cardStore: CardStore) { }
  ngOnInit(): void {
    this.paymentService.getCards(this.keycloakService.getKeycloakInstance().subject!).subscribe();
  }

}*/
