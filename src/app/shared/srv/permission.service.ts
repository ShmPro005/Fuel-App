import { Injectable, inject } from '@angular/core';
import { Camera } from '@capacitor/camera';
import { FcmService } from './fcm/fcm.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
 
  fcm = inject(FcmService);

  constructor() {}

  /**
   * Checks and requests Camera Permission.
   */
  async checkCameraPermission(): Promise<boolean> {
    try {
      // Request permission to access the camera
      const permissionStatus = await Camera.requestPermissions();

      if (permissionStatus.camera === 'granted') {
        // console.log('---Camera permission granted');
        return true;
      } else {
        // console.warn('----Camera permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting camera permission', error);
      return false;
    }
  }

  /**
   * Checks and requests Gallery Permission.
   */
  async checkGalleryPermission(): Promise<boolean> {
    try {
      const permissionStatus = await Camera.requestPermissions();
      console.log('------Gallery permission status:', permissionStatus);
      
      return permissionStatus.photos === 'granted';
    } catch (error) {
      console.error('Error requesting gallery permission', error);
      return false;
    }
  }

  /**
   * Initializes all required permissions at app startup.
   */
  async initializePermissions(): Promise<void> {
    // const cameraGranted = await this.checkCameraPermission();
    // const galleryGranted = await this.checkGalleryPermission();

    setTimeout(() => {
      this.fcm.initPush();
    }, 1000);

    // console.log('---Camera Permission:', cameraGranted ? 'Granted' : 'Denied');
    // console.log('----Gallery Permission:', galleryGranted ? 'Granted' : 'Denied');
  }
}
