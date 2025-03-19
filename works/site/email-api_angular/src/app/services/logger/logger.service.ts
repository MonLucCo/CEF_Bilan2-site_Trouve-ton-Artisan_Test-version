import { Injectable } from '@angular/core';
import { environment } from '../../../environments/front-end/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private configuration = environment.production;

  constructor() {
    this.logDebug(this, "Le service de logs est actif, 'debug' est à :", !this.configuration);
  }

  private getClassName(caller: any): string {
    return caller?.constructor?.name || 'UnknownClass'; // Récupère le nom de la classe appelante
  }

  private log(caller: any, level: 'info' | 'warn' | 'error' | 'debug', message: string, data: any): void {
    const className = this.getClassName(caller); // Récupère la classe à partir de l'appelant
    const formattedMessage = `[${className}] : [${level.toUpperCase()}] ${message}`;

    if (level === 'debug' && this.configuration) {
      return; // Ignore les logs `debug` en mode production
    }

    if (data === null) {
      console[level](formattedMessage); // Affiche uniquement le message
    } else {
      console[level](formattedMessage, data); // Affiche le message et la donnée (même si data est 'undefined')
    }
  }

  logInfo(caller: any, message: string, data: any): void {
    this.log(caller, 'info', message, data);
  }

  logWarning(caller: any, message: string, data: any): void {
    this.log(caller, 'warn', message, data);
  }

  logError(caller: any, message: string, error: any): void {
    this.log(caller, 'error', message, error);
  }

  logDebug(caller: any, message: string, data: any): void {
    if (!this.configuration) {
      this.log(caller, 'debug', message, data);
    }
  }
}
