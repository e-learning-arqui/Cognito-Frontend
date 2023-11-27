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
    const url = `http://localhost:8081/ms-user/api/v1/users/card`
    return this.http.post<ApiResponse<number>>(`${url}`, card);
  }

  //Obtener tarjetas por usuario

  getCards(id: String): Observable<Card[]> {
    const url = `http://localhost:8081/ms-user/api/v1/users/${id}/card`
    console.log(this.API_URL);
    return this.http.get<ApiResponse<Card[]>>(`${url}`).pipe(
      tap((response) => console.log(response)),
      map((response: ApiResponse<Card[]>) => response.response || []),
      tap((cards) => this.CardStore.setCard(cards)),
    );

  }

  //Agregar subscripcion

  addSubscription(subscriptionSend: SubscriptionSend) {
    const url = `http://localhost:8081/payments/api/v1/subscription`
    return this.http.post<ApiResponse<number>>(`${this.Sub_URL}/subscription`, subscriptionSend);
  }



}
