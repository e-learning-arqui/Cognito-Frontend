import {createStore} from "@ngneat/elf";
import {selectAllEntities, upsertEntities, withEntities} from "@ngneat/elf-entities";
import {Injectable} from "@angular/core";
import {UrlDto} from "../model/dto/UrlDto";



const classStore = createStore(
  {name: 'classes'},
  withEntities<UrlDto>(),
);
@Injectable({ providedIn: 'root' })
export class ClassRepository{
  class$ = classStore.pipe(selectAllEntities());

  setClasses(classes: UrlDto[]){
    classStore.update(upsertEntities(classes));
  }

}
