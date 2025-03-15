import { Injectable } from '@angular/core';
import { environment } from '../../../environments/front-end/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private configuration = `${environment.production}`;

  constructor() { }

  logInfo(message: string, data?: any): void {
    console.log(`[INFO]: ${message}`, data);
  }

  logWarning(message: string, data?: any): void {
    console.warn(`[WARNING]: ${message}`, data);
  }

  logError(message: string, error?: any): void {
    console.error(`[ERROR]: ${message}`, error);
  }

  logDebug(message: string, data?: any): void {
    if (!this.configuration) {
      console.debug(`[DEBUG]: ${message}`, data);
    }
  }
}
