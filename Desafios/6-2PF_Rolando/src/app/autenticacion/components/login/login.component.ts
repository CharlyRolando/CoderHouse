import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginValid = true;
  public username = '';
  public password = '';

  private _destroySub$ = new Subject<void>();

  constructor(private _router: Router) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public onSubmit(): void {
    //this.loginValid = true;

    this._router.navigate(['container']);
  }

  redirigir() {
    this._router.navigate(['container']);
  }
}
