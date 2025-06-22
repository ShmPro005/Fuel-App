import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  // 🔹 Generate a Custom JWT-Like Token (Simulated)
  generateToken(): string {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  }


   /**
   * ✅ Check if user exists in Firebase by phone number
   * @param phoneNumber User's phone number
   * @returns User data if exists, otherwise null
   */
   async getUserData(phoneNumber: string): Promise<any> {
    const snapshot = await this.db.database.ref('users').orderByChild('phoneNumber').equalTo(phoneNumber).once('value');
    
    if (snapshot.exists()) {
      const userKey = Object.keys(snapshot.val())[0]; // Get the first user key
      return snapshot.val()[userKey]; // Return the user data
    }
    return null; // User not found
  }
  

  // 🔹 Store User Data in Firebase Realtime Database
  async saveUserData(userData: any) {
    const userRef = this.db.object(`users/${userData.village}`); // 🔹 Save under phone number
    await userRef.set({
      surName: userData.surName,
      name: userData.Name,
      fullName: userData.fullName,
      village: userData.village,
      email: userData.email || null,
      phoneNumber: userData.phoneNumber,
      createdAt: new Date().toISOString(),
      token: this.generateToken() // Generate JWT token
    });

    // 🔹 Store data locally
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userToken', this.generateToken());
  }
}
