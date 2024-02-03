import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { AgeRangeDisplayPipe } from './pipes/age-range-display.pipe';
import { FullNameDisplayPipe } from './pipes/full-name-display.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInFormComponent,
    AgeRangeDisplayPipe,
    FullNameDisplayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatTableModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatInputModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
