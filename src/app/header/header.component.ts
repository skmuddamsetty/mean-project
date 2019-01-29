import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authStatusListenerSub: Subscription;
  isAuthenticated = false;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {}
}
