import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProgramPage } from './list-program.page';

const routes: Routes = [
  {
    path: '',
    component: ListProgramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProgramPageRoutingModule {}
