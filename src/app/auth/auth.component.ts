import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: any;
  signedIn: boolean;

  constructor(private authService: AuthService) { }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      this.user = res;
      this.signedIn = true;
    });
  }

  signOut() {
    this.authService.signOut();
    this.signedIn = false;
    this.user = null;
  }

  ngOnInit() {
    this.signedIn = false;
  }

}
