import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import {ConfirmationService, MessageService, SelectItemGroup} from "primeng/api";
import { CardDto } from 'src/app/model/dto/CardDto';
import { PaymentService } from 'src/app/services/payment.service';


@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent {


  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);
  router: Router = inject(Router);
  paymentService: PaymentService = inject(PaymentService);
  keycloak : KeycloakService = inject(KeycloakService);
  formGroup! : FormGroup;

  constructor(private fb: FormBuilder) {  
    this.formGroup = this.fb.group({
      bankName: ['', Validators.required],
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expirationDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }


  formatCardNumber(event: any) {
    let value = event.target.value;
    value = value.replace(/\D/g, ""); // Remove non-digits
    value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add space every 4 digits
    this.formGroup.get('cardNumber')?.setValue(value);
  }

  formatExpirationDate(event: any) {
    let value = event.target.value;
    value = value.replace(/\D/g, ""); // Remove non-digits
    value = value.replace(/(\d{2})(?=\d)/g, "$1/"); // Add slash after 2 digits
    this.formGroup.get('expirationDate')?.setValue(value);

  }

  formatCvv(event: any) {
    let value = event.target.value;
    value = value.replace(/\D/g, ""); // Remove non-digits
    this.formGroup.get('cvv')?.setValue(value);
  }
  cardNameChange(event: any) {
    this.formGroup.value.cardName = event.target.value;
  }

  bankNameChange(event: any) {
    this.formGroup.value.bankName = event.target.value;
  }

  confirm(event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro?',
      icon: 'pi pi-check-square',
      accept: () => {
        this.messageService.add({severity:'success', summary:'Confirmado', detail:'tarjeta agregada exitosamente!'});
        console.log(this.formGroup.value.bankName);
        console.log(this.formGroup.value.number);
        console.log(this.formGroup.value.titular);
        console.log(this.formGroup.value.ccv);
        this.paymentService.addCard(this.toCardDto(this.formGroup)).subscribe((response) => {
          if(response.code == '0000'){
            this.messageService.add({severity:'success', summary:'Confirmado', detail:'Tarjeta agregada exitosamente!'});
          this.router.navigate([`/subscription/create`]).then(r => console.log(r))
          }else if(response.code == '0001'){
            this.messageService.add({severity:'error', summary:'Error', detail:'La tarjeta ya existe!'});

          }else{
            this.messageService.add({severity:'error', summary:'Error', detail:'No se pudo agregar la tarjeta!'});

          }
        });
      },
      reject: () => {
        this.messageService.add({severity:'error', summary:'Cancelado', detail:'Se cancelo el agregar tarjeta!'});
      }
    });
  }

  toCardDto(formGroup: FormGroup): CardDto {
    const expirationDate = this.convertExpirationToDate(formGroup.value.expirationDate);
    return {
      bankName: formGroup.value.bankName,
      number: formGroup.value.cardNumber,
      expiration: expirationDate,
      titular: formGroup.value.cardName,
      cvv: formGroup.value.cvv,
      userKeycloakId: this.keycloak.getKeycloakInstance().subject!
    }
    
  }

  convertExpirationToDate(expiration: string): Date {
    const [month, year] = expiration.split('/').map(str => parseInt(str, 10));
    return new Date(year + 2000, month - 1, 1);
  }

  
  
}
