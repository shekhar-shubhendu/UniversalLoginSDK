import {StorageService} from './StorageService';

export class MemoryStorageService implements StorageService {
  private store: Record<string, string | undefined> = {};

  get(key: string): string | null {
    const val = this.store[key];
    return val !== undefined ? val : null;
  }

  set(key: string, value: string): void {
    this.store[key] = value;
  }

  remove(key: string) {
    delete this.store[key];
  }
}
