import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('userToken'); // Check if user is logged in
    if (!isAuthenticated) {
      this.router.navigate(['/language-selection']);
      return false;
    }
    return true;
  }
}
