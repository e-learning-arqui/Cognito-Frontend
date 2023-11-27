import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Card } from 'src/app/model/Card';
import { SubscriptionSend } from 'src/app/model/SubscriptionSend';
import { SubscriptionTypeDto } from 'src/app/model/dto/SubscriptionTypeDto';
import { PaymentService } from 'src/app/services/payment.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { CardStore } from 'src/app/store/cardStore';
import {UserService} from "../../../services/user.service";



@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {
  selectedPlan: SubscriptionTypeDto | null = null;
  selectedCardId: number | null = null;

  userCards: Card[] = [];
  keycloakService: KeycloakService = inject(KeycloakService);
  private userService: UserService = inject(UserService);
  constructor(
    private sharedDataService: SharedDataService,
    private paymentService: PaymentService,
    public cardStore: CardStore,
    private router: Router,

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
  handleSubscription() {
    if (this.selectedPlan && this.selectedCardId !== null) {
      const subscriptionSend: SubscriptionSend = {
        cardId: this.selectedCardId,
        subscriptionTypeId: this.selectedPlan.id
      };

      this.paymentService.addSubscription(subscriptionSend).subscribe({
        next: (response) => {
          console.log('Suscripción realizada con éxito', response);
          this.updateSubscription();
        },
        error: (error) => {
          console.error('Error al realizar la suscripción', error);
        }
      });
    } else {
      console.warn('Selecciona un plan y una tarjeta para continuar');
    }
  }

  navigateToAddCard() {
    this.router.navigate(['/add-card']);
  }

  updateSubscription() {
    this.userService.updateSubscription(this.keycloakService.getKeycloakInstance().subject!).subscribe(
      (response) => {
        console.log('Suscripción actualizada con éxito', response);

      })

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
