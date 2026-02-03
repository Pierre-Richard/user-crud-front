import { Routes } from '@angular/router';
import { ListComponentComponent } from './component/list-component/list-component.component';
import { EdtiUserComponent } from './component/edti-user/edti-user.component';

export const routes: Routes = [
  //Route liste utilisateurs
  { path: '/users', component: ListComponentComponent },
  // Route edition
  { path: '/users/id/', component: EdtiUserComponent },
];
