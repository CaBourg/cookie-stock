import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cookie } from '../models/cookie.model';
import { CookiesService } from '../services/cookies.service';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-cookie-list',
  templateUrl: './cookie-list.component.html',
  styleUrls: ['./cookie-list.component.scss']
})
export class CookieListComponent implements OnInit, OnDestroy {

  cookies: Cookie[];
  cookiesSubscription: Subscription;
  cookie: Cookie;

  isAuth: boolean;

  constructor(private cookiesService: CookiesService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.cookiesSubscription = this.cookiesService.cookiesSubject.subscribe(
      (cookies: Cookie[]) => {
        this.cookies = cookies;
      }
    );
    this.cookiesService.emitCookies();

    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }
  
  onSupply() {
    this.cookiesService.saveCookies();
    this.cookiesService.emitCookies();
  }

  onDeleteCookie(cookie: Cookie) {
    this.cookiesService.removeCookie(cookie);
  }

  ngOnDestroy() {
    this.cookiesSubscription.unsubscribe();
  }

}
