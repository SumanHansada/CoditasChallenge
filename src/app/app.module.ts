import { LocationPipe } from './pipes/location.pipe';
import { CompanyNamePipe } from './pipes/company-name.pipe';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { GithubSearchComponent } from './github-search/github-search.component';
import { SearchService } from './services/search.service';
import { FullNamePipe } from './pipes/full-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CompanyNamePipe,
    FullNamePipe,
    LocationPipe,
    GithubSearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
