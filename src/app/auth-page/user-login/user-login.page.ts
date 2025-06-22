import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/srv/auth.service';
import { TranslationService } from 'src/app/shared/srv/translation.service';
import { UtilService } from 'src/app/shared/srv/util.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage {
  surName: string = '';
  Name: string = '';
  village: string = '';
  email: string = '';
  phoneNumber: string = '';
  isNewUser: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public utilService: UtilService,
    public translationService: TranslationService
  ) {}

  switchToCreateAccount() {
    this.isNewUser = true;
  }

  switchToLogin() {
    this.isNewUser = false; // Switch back to Login Form
  }

  // ✅ Email Validation
  isValidEmail(): boolean {
    if (!this.email) return true; // Email is optional
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.email);
  }

  // ✅ Phone Number Validation (10-digit numeric)
  isValidPhone(): boolean {
    return this.phoneNumber.length === 10 && /^\d+$/.test(this.phoneNumber);
  }

  // ✅ Check if Form is Valid
  isFormValid(): boolean {
    return this.surName.trim() !== '' &&
           this.Name.trim() !== '' &&
           this.village.trim() !== '' &&
           this.isValidPhone() &&
           this.isValidEmail();
  }

  /**
   * 🔹 Step 1: Check if Phone Number Exists
   */
  async login() {
    if (!this.phoneNumber || this.phoneNumber.length !== 10 || !/^\d+$/.test(this.phoneNumber)) {
      this.utilService.showToast('Enter a valid 10-digit phone number!');
      return;
    }
  
    this.utilService.showLoading('Checking account...');
  
    try {
      const userData = await this.authService.getUserData(this.phoneNumber);
  
      if (userData) {
        // ✅ Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userToken', userData.token || ''); // Store JWT if available
  
        this.utilService.dismissLoading();
        this.router.navigate(['/tabs/home']); // Redirect to home
        this.utilService.showToast('Login successfully!');
        this.isNewUser = false;
        this.resetForm();
      } else {
        this.utilService.dismissLoading();
        this.utilService.showToast('No account found. Please create one!',2000, 'warning');
        // Show account creation fields
        this.isNewUser = true;
        this.resetForm(); 
      }
    } catch (error) {
      this.utilService.dismissLoading();
      this.utilService.showToast('Error checking account. Try again!',2000,'danger');
      console.error('Login Error:', error);
    }
  }
  

  /**
   * 🔹 Step 2: Create Account for New User
   */
  async createAccount() {
    if (!this.isFormValid()) {
      this.utilService.showToast('Please fill all required fields correctly!', 2000, 'warning');
      return;
    }
  
    this.utilService.showLoading('Creating account...');
  
    try {
      const userData = {
        surName: this.surName,
        Name: this.Name,
        fullName: `${this.Name} ${this.surName}`,
        village: this.village,
        email: this.email || null,
        phoneNumber: this.phoneNumber
      };
  
      // console.log('User Data:', userData);
  
      await this.authService.saveUserData(userData);
  
      // ✅ Clear Form Fields After Success
      this.resetForm();
  
      this.utilService.dismissLoading();
      this.router.navigate(['/tabs/home']);
      this.utilService.showToast('Account created successfully!');
      this.isNewUser = false;
    } catch (error) {
      this.utilService.dismissLoading();
      this.utilService.showToast('Account creation failed. Try again!', 2000, 'danger');
      console.error('Account Creation Error:', error);
    }
  }
  
  /**
   * ✅ Reset Form Fields
   */
  resetForm() {
    this.surName = '';
    // this.Name = '';
    this.village = '';
    this.email = '';
    // this.phoneNumber = '';
  }
  
}
