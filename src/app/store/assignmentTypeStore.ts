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

import { AssignmentTypeDto } from '../model/dto/AssignmentTypeDto';
const store = createStore(
    { name: 'assignmentType' },
    withEntities<AssignmentTypeDto>()
);

@Injectable({ providedIn: 'root' })
export class AssignmentTypeStore{
    assignmentType$ = store.pipe(selectAllEntities());

    setAssignmentType(assignmentType: AssignmentTypeDto[]){
        store.update(
            upsertEntities(assignmentType)
        );
    }

}