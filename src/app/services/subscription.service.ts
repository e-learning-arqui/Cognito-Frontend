import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, map, tap } from 'rxjs';
import { SubscriptionTypeDto } from '../model/dto/SubscriptionTypeDto';
import { ApiResponse } from '../model/paginator';
import { SubscriptionTypeStore } from '../store/subscriptionTypeStore';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  PAYMENT_URL = environment.PAYMENT_URL;

  constructor(
    private http: HttpClient,
    private subscriptionTypeStore: SubscriptionTypeStore
  ) { }

  // getSubscription(): Observable<any> {
  //   return this.http.get('http://localhost:7400/api/subscription');
  // }



  getSubscriptionType(): Observable<SubscriptionTypeDto[]>{
    const URL = `${this.PAYMENT_URL}/api/v1/subscriptionType`;
    return this.http.get<ApiResponse<SubscriptionTypeDto[]>>(URL).pipe(
      tap((response) => console.log(response)),
      map((response: ApiResponse<SubscriptionTypeDto[]>) => response.response || []),
      tap((subscriptionType) => this.subscriptionTypeStore.setSubscriptionType(subscriptionType)),
    );

  }



}
