import { Cookie } from './../../models/cookie.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CookiesService } from 'src/app/services/cookies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cookie-form',
  templateUrl: './cookie-form.component.html',
  styleUrls: ['./cookie-form.component.scss']
})
export class CookieFormComponent implements OnInit {

  cookieForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private cookiesService: CookiesService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.cookieForm = this.formBuilder.group({
      id: [0,null],
      name: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  onSaveCookie() {
    const name = this.cookieForm.get('name').value;
    const quantity = this.cookieForm.get('quantity').value;
    const newCookie = new Cookie(name, quantity);
    this.cookiesService.createNewCookie(newCookie);
    //this.router.navigate(['/cookies']);
  }

}
