import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onLogin(ngForm: NgForm) {
    if (ngForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(ngForm.value.email, ngForm.value.password);
  }
}
