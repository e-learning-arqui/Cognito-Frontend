import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { userEnvironment } from '../environments/user';
import { PaymentEnv } from '../environments/payment';
import { CardDto } from '../model/dto/CardDto';
import { ApiResponse } from '../model/paginator';
import { Card } from '../model/Card';
import { Observable, map, tap } from 'rxjs';
import { CardStore } from '../store/cardStore';
import { SubscriptionSend } from '../model/SubscriptionSend';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  API_URL = `${userEnvironment.API_URL}api/v1`;
  Sub_URL = `${PaymentEnv.API_URL}api/v1`;
  constructor(
    private http: HttpClient,
    private CardStore: CardStore
  ) { }

  //Agregar tarjeta
  
  addCard(card: CardDto) {
    return this.http.post<ApiResponse<number>>(`${this.API_URL}/users/card`, card);
  }

  //Obtener tarjetas por usuario

  getCards(id: String): Observable<Card[]> {
    return this.http.get<ApiResponse<Card[]>>(`${this.API_URL}/users/${id}/card`).pipe(
      tap((response) => console.log(response)),
      map((response: ApiResponse<Card[]>) => response.response || []),
      tap((cards) => this.CardStore.setCard(cards)),
    );
    
  }

  //Agregar subscripcion 

  addSubscription(subscriptionSend: SubscriptionSend) {
    return this.http.post<ApiResponse<number>>(`${this.Sub_URL}/subscription`, subscriptionSend);
  }


  
}
