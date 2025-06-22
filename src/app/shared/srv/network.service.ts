import { Injectable, NgZone } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  networkStatus = new BehaviorSubject<boolean>(true);

  constructor(private zone: NgZone) {
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Initializes the network service. This includes setting up a listener for network
   * status changes. When the network status changes, the `networkStatus` BehaviorSubject
   * is updated with the new status.
   * @param zone The NgZone service is required to ensure that the network status is
   * updated within the Angular zone when the network status changes.
   */
/******  4a65c580-e06f-4568-aaf8-5ac24f878afe  *******/    this.initializeNetworkListener();
  }

  private async initializeNetworkListener() {
    // Log the current network status at initialization
    const status = await Network.getStatus();
    this.zone.run(() => {
      this.networkStatus.next(status.connected);
    });

    // Listen for network status changes
    Network.addListener('networkStatusChange', (status) => {
      // console.log('---Network status changed:', status);
      this.zone.run(() => {
        this.networkStatus.next(status.connected);
      });
    });
  }

  getNetworkStatus() {
    return this.networkStatus.asObservable();
  }
}
