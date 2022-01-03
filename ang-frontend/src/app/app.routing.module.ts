import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SavedQueriesComponent } from './saved-queries/saved-queries.component';
import { ViewDatasetComponent } from './view-dataset/view-dataset.component';

const routes: Routes = [
//  { path: '', redirectTo: '/', pathMatch: 'full' },
 { path: 'saved-queries', component: SavedQueriesComponent, pathMatch: 'full' },
 { path: '', component: DashboardComponent, pathMatch: 'full' },
 { path: 'view-dataset', component: ViewDatasetComponent, pathMatch: 'full' },
 { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [SavedQueriesComponent, DashboardComponent, ViewDatasetComponent];
