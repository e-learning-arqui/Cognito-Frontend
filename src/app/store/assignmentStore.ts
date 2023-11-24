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

import { AssignmentDto } from '../model/dto/AssignmentDto';
const store = createStore(
    { name: 'assignment' },
    withEntities<AssignmentDto>()
);

@Injectable({ providedIn: 'root' })
export class AssignmentStore{
    assignment$ = store.pipe(selectAllEntities());

    setAssignment(assignment: AssignmentDto[]){
        store.update(
            upsertEntities(assignment)
        );
    }

}