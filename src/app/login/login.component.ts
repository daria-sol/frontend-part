import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {routerTransition} from '../router.animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {first, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private translate: TranslateService,
    public router: Router) {
    this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  onLoggedin() {
    const username = this.f.username.value;
    const password = this.f.password.value;



    this.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
        });
  }

  login(username: string, password: string) {
    return this.http.post(`http://localhost:8082/login`, {username: username, password: password})
      .pipe(map(user => {
        // log in successful
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }
}
