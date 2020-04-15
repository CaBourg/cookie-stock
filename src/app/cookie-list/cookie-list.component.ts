import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cookie } from '../models/cookie.model';
import { CookiesService } from '../services/cookies.service';

@Component({
  selector: 'app-cookie-list',
  templateUrl: './cookie-list.component.html',
  styleUrls: ['./cookie-list.component.scss']
})
export class CookieListComponent implements OnInit, OnDestroy {

  cookies: Cookie[];
  cookiesSubscription: Subscription;

  constructor(private cookiesService: CookiesService) { }

  ngOnInit(): void {
    this.cookiesSubscription = this.cookiesService.cookiesSubject.subscribe(
      (cookies: Cookie[]) => {
        this.cookies = cookies;
      }
    );
    this.cookiesService.emitCookies();
  }

  onDeleteCookie(cookie: Cookie) {
    this.cookiesService.removeCookie(cookie);
  }

  ngOnDestroy() {
    this.cookiesSubscription.unsubscribe();
  }

}
