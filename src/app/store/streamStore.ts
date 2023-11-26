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
import { StreamDto } from '../model/dto/StreamDto';


const store = createStore(
    { name: 'stream' },
    withEntities<StreamDto>()
);

@Injectable({ providedIn: 'root' })
export class StreamStore{
    streamKey$ = store.pipe(selectAllEntities());

    setStream(stream: StreamDto){
        store.update(
            upsertEntities(stream)
        );
    }

}