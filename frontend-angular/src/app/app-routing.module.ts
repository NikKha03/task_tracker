import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { TestPageComponent } from './test-page/test-page.component';

const routes: Routes = [
  { path: 'app', component: StartPageComponent },
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: 'test', component: TestPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
