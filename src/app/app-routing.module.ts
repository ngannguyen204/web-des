import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionEditComponent } from './fashion-edit/fashion-edit.component';
import { FashionComponent } from './fashion/fashion.component';
const routes: Routes = [
  { path: 'fashions', component: FashionComponent },
  { path: 'fashion-edit/:id', component: FashionEditComponent},
  { path: '', redirectTo: 'fashions', pathMatch: 'full' },
  { path: '**', redirectTo: 'fashions' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
