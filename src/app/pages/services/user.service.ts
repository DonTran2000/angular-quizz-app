import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getUser() {
    return this.userSubject.value;
  }

  loadUser() {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  clearUser() {
    this.userSubject.next(null);
    sessionStorage.removeItem('loggedInUser');
  }
}