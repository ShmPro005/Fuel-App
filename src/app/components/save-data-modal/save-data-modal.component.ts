import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-save-data-modal',
  templateUrl: './save-data-modal.component.html',
  styleUrls: ['./save-data-modal.component.scss'],
})
export class SaveDataModalComponent {
  @Input() record!: FuelCostRecord;

  name: string = '';
  villageName: string = '';
  mobile: string = '';
  notes: string = '';

  constructor(private modalController: ModalController, private translateService: TranslateService) {}

  dismissModal() {
    this.modalController.dismiss({
      action: 'cancel'
    });
  }

  saveWithoutData() {
    this.modalController.dismiss({
      action: 'saveWithoutData',
      record: this.record,
      optionalData: {}
    });
  }

  saveAndGoAhead() {
    const optionalData = {
      name: this.name.trim() || undefined,
      villageName: this.villageName.trim() || undefined,
      mobile: this.mobile.trim() || undefined,
      notes: this.notes.trim() || undefined
    };
    
    this.modalController.dismiss({
      action: 'save',
      record: this.record,
      optionalData: optionalData
    });
  }

  onMobileInput(event: any) {
    // Remove any non-numeric characters including minus and decimal points
    const input = event.target;
    const value = input.value.replace(/[^0-9]/g, '');
    if (input.value !== value) {
      input.value = value;
      this.mobile = value;
    }
  }

  onMobileKeyPress(event: KeyboardEvent) {
    // Prevent minus and decimal point keys
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode === 45 || charCode === 46 || charCode === 101 || charCode === 69) {
      event.preventDefault();
    }

    // Allow only numeric keys (0-9), backspace, delete, tab, escape, enter, arrows
    const allowedKeys = [8, 9, 13, 27, 37, 38, 39, 40, 46]; // backspace, tab, enter, escape, arrows, delete
    if ((charCode < 48 || charCode > 57) && allowedKeys.indexOf(charCode) === -1) {
      event.preventDefault();
    }
  }
}
