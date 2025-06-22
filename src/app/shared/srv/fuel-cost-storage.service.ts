// src/app/services/fuel-cost-storage.service.ts
import { Injectable } from '@angular/core';
import { FuelCostRecord } from 'src/app/models/fuel-cost-record.model';
import { UtilService } from './util.service';
 
@Injectable({
  providedIn: 'root',
})
export class FuelCostStorageService {
  private dbName = 'FuelCalculatorDB';
  private dbVersion = 1;
  private storeName = 'fuel_cost_history';
  private db: IDBDatabase | null = null;

  constructor(public utilService: UtilService) {
    this.initDatabase();
  }

  // Initialize IndexedDB
  private initDatabase(): void {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(this.storeName)) {
        const store = db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('date', 'date', { unique: false });
      }
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      // console.log('IndexedDB initialized successfully.');
    };

    request.onerror = (event: Event) => {
      console.error('Error initializing IndexedDB:', (event.target as IDBOpenDBRequest).error);
    };
  }

  // Save a new fuel cost record
  saveRecord(record: FuelCostRecord): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }
  //  console.log('record',record);
   
      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(record);

      request.onsuccess = (event: Event) => {
        const id = (event.target as IDBRequest).result as number;
        resolve(id);
      };

      request.onerror = (event: Event) => {
        console.error('Error saving record:', (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
    });
  }

  // Retrieve all fuel cost records
  getAllRecords(): Promise<FuelCostRecord[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        console.error('Database is not initialized.');
        reject('Database not initialized');
        return;
      }
  
      try {
        const transaction = this.db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();
  
        request.onsuccess = (event: Event) => {
          const records = (event.target as IDBRequest).result as FuelCostRecord[];
          resolve(records);
        };
  
        request.onerror = (event: Event) => {
          console.error('Error retrieving records:', (event.target as IDBRequest).error);
          reject('Failed to retrieve records.');
        };
      } catch (error) {
        console.error('Unexpected error in getAllRecords:', error);
        reject('Unexpected error retrieving records.');
      }
    });
  }
  

  // Update an existing fuel cost record
  updateRecord(record: FuelCostRecord): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      if (!record.id) {
        reject('Record ID is missing');
        return;
      }

      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(record);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event: Event) => {
        console.error('Error updating record:', (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
    });
  }

  // Delete a fuel cost record by ID
  deleteRecord(id: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        this.utilService.dismissLoading();
        return;
      }

      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        this.utilService.dismissLoading();
        resolve();
      };

      request.onerror = (event: Event) => {
        console.error('Error deleting record:', (event.target as IDBRequest).error);
        this.utilService.dismissLoading();

        reject((event.target as IDBRequest).error);
      };
    });
  }

  // Clear all fuel cost records
  clearAllRecords(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('Database not initialized');
        return;
      }

      const transaction = this.db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event: Event) => {
        console.error('Error clearing records:', (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
    });
  }
}
