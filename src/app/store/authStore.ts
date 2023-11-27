import {createStore, withProps, select, setProps} from '@ngneat/elf';
import {selectAllEntities, setEntities, updateEntities, upsertEntities, withEntities} from "@ngneat/elf-entities";
import {ApiResponse, Paginator} from "../model/paginator";
import {Injectable} from "@angular/core";
import {Course} from "../model/Course";
import {localStorageStrategy, persistState} from "@ngneat/elf-persist-state";

export interface AuthProps {
  token: string;
  username: string;
  isLogged: boolean;
  kcId?: string;
}




// @ts-ignore

const authStore = createStore(
  { name: 'auth'},
  withProps<AuthProps>({
    token: '',
    username: '',
    isLogged: false,
    kcId: ''
  })
);

export const persist = persistState(authStore, {
  key: 'auth',
  storage: localStorageStrategy,
});
@Injectable({ providedIn: 'root' })export class AuthRepository {
  auth$ = authStore.pipe(select((state) => state));

  getCourseProps(){
    return authStore.query((state) => state);
  }

  setAuthProps(props: AuthProps) {
    authStore.update(
      state => ({
        ...state,
        ...props
        }
      )
    );
  }

  logout() {
    console.log(localStorage.getItem('auth'))
    authStore.update(setProps({
      token: '',
      username: '',
      isLogged: false,
      kcId: ''

    }
    ));
  }




}

