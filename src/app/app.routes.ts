import { Routes } from '@angular/router';

import { EdtiUserComponent } from './component/edti-user/edti-user.component';
import { ListComponentComponent } from './component/list-component/list-component.component';

export const routes: Routes = [
  //Route liste utilisateurs
  { path: 'users', component: ListComponentComponent },
  // Route edition
  { path: 'users/:id/edit', component: EdtiUserComponent },
];
