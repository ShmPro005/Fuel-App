import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/shared/srv/network.service';

@Component({
  selector: 'app-offline-message',
  templateUrl: './offline-message.component.html',
  styleUrls: ['./offline-message.component.scss'],
})
export class OfflineMessageComponent  implements OnInit {
  isOnline = true;

  constructor(private networkService: NetworkService) {}

  ngOnInit() {
    this.networkService.getNetworkStatus().subscribe((status) => {
      // console.log('OfflineMessageComponent------status----',status);
      this.isOnline = status;
    });
  }

}
