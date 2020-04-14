import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  cookiesSubject = new Subject<any[]>();
  private cookies = [];

  constructor(private httpClient: HttpClient) { }

  saveCookies() {
    this.httpClient
      .post('https://cookiestock-7d25f.firebaseio.com/cookies.json', this.cookies)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur : ' + error);
        }
      );
  }
}
