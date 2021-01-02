import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IntroComponent } from './components/intro/intro.component';
import { DataService } from './services/data/data.service';
import { FooterComponent } from './components/footer/footer.component';
import { ModelsComponent } from './components/models/models.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    IntroComponent,
    ModelsComponent,
    NavBarComponent,
    GalleryComponent,
    ContactUsComponent,
    MilestonesComponent,
    FilterBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
