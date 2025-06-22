// src/app/services/data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private dbName = 'AppDatabase';
  private dbVersion = 1;
  private storeNames: string[] = ['fuelCostHistory', 'appSettings'];
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDatabase();
  }

  // Initialize IndexedDB
  private initDatabase(): void {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      for (const storeName of this.storeNames) {
        if (!db.objectStoreNames.contains(storeName)) {
          if (storeName === 'appSettings') {
            db.createObjectStore(storeName, { keyPath: 'key' });
          } else {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
          }
        }
      }
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      // console.log('IndexedDB initialized successfully.');
    };

    request.onerror = (event: Event) => {
      console.error('Error opening IndexedDB:', (event.target as IDBOpenDBRequest).error);
    };
  }

  // Add or update a key-value item
  setStorage(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized.');
        return;
      }

      const transaction = this.db.transaction('appSettings', 'readwrite');
      const store = transaction.objectStore('appSettings');
      const request = store.put({ key, value });

      request.onsuccess = () => resolve();
      request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
    });
  }

  // Get a key-value item
  getStorage(key: string): Promise<{ key: string, value: string } | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized.');
        return;
      }

      const transaction = this.db.transaction('appSettings', 'readonly');
      const store = transaction.objectStore('appSettings');
      const request = store.get(key);

      request.onsuccess = (event: Event) => {
        const result = (event.target as IDBRequest).result;
        resolve(result || null);
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  // Remove a key-value item
  removeStorage(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized.');
        return;
      }

      const transaction = this.db.transaction('appSettings', 'readwrite');
      const store = transaction.objectStore('appSettings');
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
    });
  }

  // Existing addItem, getAllItems, deleteItem, bulkSave remain unchanged...
}
