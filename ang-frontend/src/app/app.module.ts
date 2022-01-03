import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SavedQueriesComponent } from './saved-queries/saved-queries.component';
import { AppRoutingModule, routingComponents } from './app.routing.module';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewDatasetComponent } from './view-dataset/view-dataset.component';
import { KeysPipe } from './keys.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalContent } from './regiseterModal/registerModal.component';
import { LoginModalContent } from './LoginModal/loginModal.component';
import { AuthInterceptor } from './services/authInterceptor';
import { DataSharingService } from './services/datasharing.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    routingComponents,
    HeaderComponent,
    ViewDatasetComponent,
    RegisterModalContent,
    LoginModalContent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    DataSharingService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
