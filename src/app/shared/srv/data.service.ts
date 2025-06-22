import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dbName = 'AppDatabase';
  private dbVersion = 1;
  private scannedStore = 'scannedData';
  private pinnedStore = 'pinnedData';

  constructor() {
    this.initDatabase();
  }

  // Initialize IndexedDB
  private initDatabase(): void {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(this.scannedStore)) {
        db.createObjectStore(this.scannedStore, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(this.pinnedStore)) {
        db.createObjectStore(this.pinnedStore, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onerror = (event) => {
      console.error('Error opening IndexedDB:', event);
    };
  }

  // Save a scanned item with a timestamp
  saveScannedItem(data: { image: string; text: string; timestamp: string }): Promise<void> {
    return this.addItem(this.scannedStore, data);
  }

  // Retrieve all scanned items
  getScannedData(): Promise<{ image: string; text: string; id: number; timestamp: string }[]> {
    return this.getAllItems(this.scannedStore);
  }

  // Save updated scanned data (bulk save)
  saveScannedData(data: { image: string; text: string; timestamp: string }[]): Promise<void> {
    return this.bulkSave(this.scannedStore, data);
  }

  // Save a pinned item with a timestamp
  savePinnedItem(data: { image: string; text: string; timestamp: string }): Promise<void> {
    return this.addItem(this.pinnedStore, data);
  }

  // Retrieve all pinned items
  getPinnedData(): Promise<{ image: string; text: string; timestamp: string }[]> {
    return this.getAllItems(this.pinnedStore);
  }

  // Save updated pinned data (bulk save)
  savePinnedData(data: { image: string; text: string; timestamp: string }[]): Promise<void> {
    return this.bulkSave(this.pinnedStore, data);
  }

  // Utility: Add an item to a store
  private addItem(storeName: string, data: { image: string; text: string; timestamp: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        store.add(data);

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  // Utility: Get all items from a store
  private getAllItems(storeName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const items: any[] = [];

        store.openCursor().onsuccess = (cursorEvent: any) => {
          const cursor = cursorEvent.target.result;
          if (cursor) {
            items.push(cursor.value);
            cursor.continue();
          } else {
            resolve(items);
          }
        };

        transaction.onerror = () => reject(transaction.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  // Utility: Bulk save data
  private bulkSave(storeName: string, data: { image: string; text: string; timestamp: string }[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        store.clear();

        data.forEach((item) => store.add(item));

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      };

      request.onerror = () => reject(request.error);
    });
  }
  
}
