declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '590177532883-9277dnklrt8mprkfpko3t2n7jmtrlqrt.apps.googleusercontent.com',
      callback: (res: any) => this.handleLogin(res)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn'),  // Ensure the element exists
      {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350
      }
    );
    google.accounts.id.prompt(); // This prompts the user for sign-in if not logged in already
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any) {
    debugger
    if (response) {
      // decode the token
      const payload = this.decodeToken(response.credential)
      this.userService.setUser(payload);
      // navigate to home/quiz
      this.router.navigate(['quiz']);
    }
  }
}
