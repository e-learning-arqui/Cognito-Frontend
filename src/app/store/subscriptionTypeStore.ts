import { Injectable, inject } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';

import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  selectEntityByPredicate,
  selectManyByPredicate,
  updateEntities,
  upsertEntities,
  withEntities,
} from '@ngneat/elf-entities';

import { SubscriptionTypeDto } from '../model/dto/SubscriptionTypeDto';
const store = createStore(
    { name: 'subscriptionType' },
    withEntities<SubscriptionTypeDto>()
);

@Injectable({ providedIn: 'root' })
export class SubscriptionTypeStore{
    subscriptionType$ = store.pipe(selectAllEntities());

    setSubscriptionType(subscriptionType: SubscriptionTypeDto[]){
        store.update(
            upsertEntities(subscriptionType)
        );
    }

}