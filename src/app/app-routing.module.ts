import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphPageComponent } from './pages/graph-page/graph-page.component';

const routes: Routes = [
  { path: 'graph', component: GraphPageComponent },
  { path: '**', redirectTo: 'graph' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
