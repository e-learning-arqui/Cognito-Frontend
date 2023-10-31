import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { userEnvironment } from '../environments/user';
import { CardDto } from '../model/dto/CardDto';
import { ApiResponse } from '../model/paginator';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  API_URL = `${userEnvironment.API_URL}api/v1/users/card`;
  constructor(
    private http: HttpClient
  ) { }
  
  addCard(card: CardDto) {
    return this.http.post<ApiResponse<number>>(this.API_URL, card);
  }

  getCards() {
    return this.http.get(`${this.API_URL}`);
  }
}
