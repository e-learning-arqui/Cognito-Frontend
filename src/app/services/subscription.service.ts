import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, map, tap } from 'rxjs';
import { SubscriptionTypeDto } from '../model/dto/SubscriptionTypeDto';
import { ApiResponse } from '../model/paginator';
import { SubscriptionTypeStore } from '../store/subscriptionTypeStore';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private http: HttpClient,
    private subscriptionTypeStore: SubscriptionTypeStore
  ) { }

  getSubscription(): Observable<any> {
    return this.http.get('http://localhost:7400/api/subscription');
  }



  getSubscriptionType(): Observable<SubscriptionTypeDto[]>{
    return this.http.get<ApiResponse<SubscriptionTypeDto[]>>('http://localhost:8081/payments/api/v1/subscriptionType').pipe(
      tap((response) => console.log(response)),
      map((response: ApiResponse<SubscriptionTypeDto[]>) => response.response || []),
      tap((subscriptionType) => this.subscriptionTypeStore.setSubscriptionType(subscriptionType)),
    );

  }



}
