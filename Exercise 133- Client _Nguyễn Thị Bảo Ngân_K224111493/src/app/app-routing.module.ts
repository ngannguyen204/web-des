import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionViewComponent } from './fashion-view/fashion-view.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';
const routes: Routes = [
  { path: '', component: FashionViewComponent },
  { path: 'fashion-detail/:id', component: FashionDetailComponent } //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
