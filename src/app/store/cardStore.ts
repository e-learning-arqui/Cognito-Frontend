import { Injectable, inject } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';

import {
  addEntities,
  selectAllEntities,

  upsertEntities,
  withEntities,
} from '@ngneat/elf-entities';

import { Card } from '../model/Card';
const store = createStore(
    { name: 'cards' },
    withEntities<Card>()
);

@Injectable({ providedIn: 'root' })
export class CardStore{
    
    card$ = store.pipe(selectAllEntities());

    setCard(card: Card[]){
        store.update(
            upsertEntities(card)
        );
    }

}