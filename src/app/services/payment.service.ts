import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { userEnvironment } from '../environments/user';
import { CardDto } from '../model/dto/CardDto';
import { ApiResponse } from '../model/paginator';
import { Card } from '../model/Card';
import { Observable, map, tap } from 'rxjs';
import { CardStore } from '../store/cardStore';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  API_URL = `${userEnvironment.API_URL}api/v1/users`;
  constructor(
    private http: HttpClient,
    private CardStore: CardStore
  ) { }
  
  addCard(card: CardDto) {
    return this.http.post<ApiResponse<number>>(`${this.API_URL}/card`, card);
  }

  getCards(id: String): Observable<Card[]> {
    return this.http.get<ApiResponse<Card[]>>(`${this.API_URL}/${id}/card`).pipe(
      tap((response) => console.log(response)),
      map((response: ApiResponse<Card[]>) => response.response || []),
      tap((cards) => this.CardStore.setCard(cards)),
    );
    
  }
}
