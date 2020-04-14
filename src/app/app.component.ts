import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyA4Do8p2EIqZSkjLyhQfNADzdgSH4X7l4E",
      authDomain: "cookiestock-7d25f.firebaseapp.com",
      databaseURL: "https://cookiestock-7d25f.firebaseio.com",
      projectId: "cookiestock-7d25f",
      storageBucket: "cookiestock-7d25f.appspot.com",
      messagingSenderId: "743136978794",
      appId: "1:743136978794:web:e9d958d94ba6bcd76a6713"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
