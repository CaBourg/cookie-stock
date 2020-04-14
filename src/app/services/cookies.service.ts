import { Cookie } from './../models/cookie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  cookiesSubject = new Subject<Cookie[]>();
  private cookies: Cookie[] = [];

  dbUrl: string = 'https://cookiestock-7d25f.firebaseio.com/cookies.json'; 

  constructor(private httpClient: HttpClient) { }

  saveCookies() {
    this.httpClient
      .post(this.dbUrl, this.cookies)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur : ' + error);
        }
      );
  }

  emitCookies() {
    this.cookiesSubject.next(this.cookies);
  }

  getCookies(): Observable<Cookie[]> {
    return this.httpClient.get<Cookie[]>(this.dbUrl);
  }

  createNewCookie(newCookie: Cookie) {
    this.cookies.push(newCookie);
    this.saveCookies;
    this.emitCookies;
  }

  removeCookie(cookie: Cookie) {
    const cookieIndexToRemove = this.cookies.findIndex(
      (cookieEl) => {
        if(cookieEl === cookie) {
          return true;
        }
      }
    );
    this.cookies.splice(cookieIndexToRemove, 1);
    this.saveCookies;
    this.emitCookies;
  }

}
