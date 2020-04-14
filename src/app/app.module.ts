import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CookieListComponent } from './cookie-list/cookie-list.component';
import { CookieFormComponent } from './cookie-list/cookie-form/cookie-form.component';
import { CookieStockComponent } from './cookie-list/cookie-stock/cookie-stock.component';
import { CookiesService } from './services/cookies.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'cookies', component: CookieListComponent },
  { path: 'cookies/new', canActivate: [AuthGuardService], component: CookieFormComponent },
  { path: '', redirectTo: 'cookies', pathMatch: 'full' },
  { path: '**', redirectTo: 'cookie' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    CookieListComponent,
    CookieFormComponent,
    CookieStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, CookiesService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
