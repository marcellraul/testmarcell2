import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEntriesComponent } from './page/list-entries/list-entries.component';
import { ViewEntriesComponent } from './page/view-entries/view-entries.component';

const routes: Routes = [
  {
    path: 'entries',
    component: ListEntriesComponent,
  },

  {
    path: 'view/:id',
    component: ViewEntriesComponent,
  },
  {
    path: '',
    redirectTo: '/entries',
    pathMatch: 'full', //
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
