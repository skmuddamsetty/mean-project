import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onSingup(ngForm: NgForm) {
    if (ngForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(ngForm.value.email, ngForm.value.password);
  }
}
