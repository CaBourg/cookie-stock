import { Cookie } from './../models/cookie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  cookiesSubject = new Subject<Cookie[]>();
  cookies: Cookie[] = [];

  database = firebase.database();

  dbUrl: string = 'https://cookiestock-7d25f.firebaseio.com/cookies.json'; 

  constructor(private httpClient: HttpClient) {
    this.getCookies();
  }

  saveCookies() {
    this.httpClient
      .put(this.dbUrl, this.cookies)
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

  getCookies() {
    this.httpClient
      .get<Cookie[]>(this.dbUrl)
      .subscribe(
        (response) => {
          this.cookies = response;
          this.emitCookies();
        },
        (error) => {
          console.log('Erreur : ' + error);
        }
      )
  }

  createNewCookie(newCookie: Cookie) {
    this.cookies.push(newCookie);
    this.saveCookies();
    this.emitCookies();
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
