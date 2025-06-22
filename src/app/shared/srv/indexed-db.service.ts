import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase, DBSchema } from 'idb';

// Define the schema for your IndexedDB
interface FuelDB extends DBSchema {
  fuelRecords: {
    key: number;
    value: {
      id: number;
      fuelCost: number;
      distance: number;
      fuelPrice: number;
      average: number;
      date: string;
    };
    indexes: { id: number };
  };
}

// Define valid store names
type StoreName = 'fuelRecords';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbPromise!: Promise<IDBPDatabase<FuelDB>>;

  constructor() {
    this.initDB();
  }

  // Initialize the database
  async initDB() {
    this.dbPromise = openDB<FuelDB>('FuelAppDataBase', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('fuelRecords')) {
          const store = db.createObjectStore('fuelRecords', { keyPath: 'id', autoIncrement: true });
          store.createIndex('id', 'id', { unique: true });
        }
      },
    });
    // console.log('IndexedDB initialized for Fuel Calculation App');
  }

  // Add a new fuel record
  async addItem(value: Omit<FuelDB['fuelRecords']['value'], 'id'>) {
    const db = await this.dbPromise;
    const id = await db.add('fuelRecords', { id: Date.now(), ...value } as FuelDB['fuelRecords']['value']);
    // console.log(`[IndexedDB] Added fuel record with ID: ${id}`);
    return id;
  }

  // Get all fuel records
  async getAllItems(): Promise<FuelDB['fuelRecords']['value'][]> {
    const db = await this.dbPromise;
    const items = await db.getAll('fuelRecords');
    // console.log(`[IndexedDB] Retrieved fuel records:`, items);
    return items;
  }

  // Get a single fuel record by ID
  async getItemById(id: number): Promise<FuelDB['fuelRecords']['value'] | undefined> {
    const db = await this.dbPromise;
    const item = await db.get('fuelRecords', id);
    // console.log(`[IndexedDB] Retrieved fuel record with ID ${id}:`, item);
    return item;
  }

  // Update a fuel record by ID
  async updateItem(id: number, value: Omit<FuelDB['fuelRecords']['value'], 'id'>) {
    const db = await this.dbPromise;
    await db.put('fuelRecords', { id, ...value } as FuelDB['fuelRecords']['value']);
    // console.log(`[IndexedDB] Updated fuel record with ID ${id}`);
  }

  // Delete a fuel record by ID
  async deleteItem(id: number) {
    const db = await this.dbPromise;
    await db.delete('fuelRecords', id);
    // console.log(`[IndexedDB] Deleted fuel record with ID ${id}`);
  }
}
