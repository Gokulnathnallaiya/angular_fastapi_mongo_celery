import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatasetFilesComponent } from './dataset-files/dataset-files.component';
import { KaggleDatasetViewerComponent } from './kaggle-dataset-viewer/kaggle-dataset-viewer.component';

import { SavedQueriesComponent } from './saved-queries/saved-queries.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ViewDatasetComponent } from './view-dataset/view-dataset.component';

const routes: Routes = [
//  { path: '', redirectTo: '/', pathMatch: 'full' },
 { path: 'saved-queries', component: SavedQueriesComponent, pathMatch: 'full' },
 { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'view-dataset', component: ViewDatasetComponent, pathMatch: 'full' },
 { path: 'search-results/:search', component: SearchResultsComponent },
  { path: 'dataset-files', component: DatasetFilesComponent, pathMatch: 'full' },
    { path: 'kaggle/view-dataset', component: KaggleDatasetViewerComponent, pathMatch: 'full' },





//  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [SavedQueriesComponent, DashboardComponent, ViewDatasetComponent, DatasetFilesComponent, SearchResultsComponent, KaggleDatasetViewerComponent];
