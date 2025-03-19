import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../../services/message/message.service';
import { LoggerService } from '../../services/logger/logger.service';
import { StatusService } from '../../services/status/status.service';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-message-history',
  standalone: false,
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit, OnDestroy {
  messages$!: Observable<any[]>; // Liste des messages (Observable)
  selectedMessage: any = null; // Message sélectionné pour affichage détaillé
  messageToDelete: any = null; // Message sélectionné pour suppression
  deleteAll: boolean = false; // Indicate si tous les messages doivent être supprimés
  autoRefreshEnabled: boolean = false; // Active/désactive le rafraîchissement automatique
  progressValue: number = 0; // Valeur de progression (barre de rafraîchissement)
  refreshPeriod: number = 30; // Période de rafraîchissement (en secondes)
  progressInterval: number = 3; // Intervalle pour progression de la barre
  private subscriptions: Subscription = new Subscription(); // Regroupement des abonnements
  serverStatus: string = 'UNKNOWN'; // État du serveur Backend
  mailDevStatus: string = 'UNKNOWN'; // État de MailDev

  constructor(
    private messageService: MessageService,
    private logger: LoggerService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.fetchMessages();
    // S'abonner au statut du serveur
    this.subscriptions.add(
      this.statusService.serverStatus$.subscribe((status) => {
        this.serverStatus = status;
      })
    );

    // S'abonner au statut de MailDev
    this.subscriptions.add(
      this.statusService.mailDevStatus$.subscribe((status) => {
        this.mailDevStatus = status;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // Annule tous les abonnements lors de la destruction du composant
  }

  fetchMessages() {
    this.messages$ = this.messageService.getMessages();
    this.logger.logDebug(this, 'Chargement des messages...', null);

    // Réinitialise la barre de progression si le rafraîchissement auto est activé
    if (this.autoRefreshEnabled) {
      this.resetProgress();
    }
  }

  confirmDeleteMessage(message: any) {
    this.messageToDelete = message;
    this.deleteAll = false;
  }

  confirmDeleteAll() {
    this.deleteAll = true;
    this.messageToDelete = null;
  }

  deleteMessageConfirmed() {
    if (this.deleteAll) {
      this.deleteAllMessages();
    } else if (this.messageToDelete) {
      this.messageService.deleteMessage(this.messageToDelete.id).subscribe(() => {
        this.logger.logInfo(this, 'Message supprimé avec ID :', this.messageToDelete.id);
        this.fetchMessages(); // Rafraîchit la liste après suppression
        this.messageToDelete = null; // Réinitialise l'état
      });
    }
  }

  closeDeleteConfirmation() {
    this.messageToDelete = null;
    this.deleteAll = false;
  }

  deleteAllMessages() {
    this.messageService.deleteAllMessages().subscribe(() => {
      this.logger.logInfo(this, 'Tous les messages ont été supprimés.', null);
      this.fetchMessages(); // Rafraîchit la liste après suppression
    });
  }

  viewMessageDetails(message: any) {
    this.selectedMessage = message; // Définit les données pour la modale
  }

  closeDetails() {
    this.selectedMessage = null;
  }

  trackByMessageId(index: number, message: any): string {
    return message.id || ''; // Optimisation pour *ngFor
  }

  toggleAutoRefresh() {
    this.autoRefreshEnabled = !this.autoRefreshEnabled;

    if (this.autoRefreshEnabled) {
      this.startAutoRefresh();
    } else {
      this.stopAutoRefresh();
    }
  }

  startAutoRefresh() {
    this.logger.logInfo(this, 'Rafraîchissement automatique activé.', null);

    // Rafraîchissement périodique des messages
    this.subscriptions.add(
      interval(this.refreshPeriod * 1000).subscribe(() => this.fetchMessages())
    );

    // Mise à jour de la barre de progression
    this.subscriptions.add(
      interval(this.progressInterval * 1000).subscribe(() => {
        if (this.progressValue >= 100) {
          this.resetProgress();
        } else {
          this.progressValue += 100 / (this.refreshPeriod / this.progressInterval);
        }
      })
    );
  }

  stopAutoRefresh() {
    this.logger.logInfo(this, 'Rafraîchissement automatique désactivé.', null);
    this.subscriptions.unsubscribe(); // Arrête tous les abonnements
    this.subscriptions = new Subscription(); // Réinitialise les abonnements
    this.progressValue = 0; // Réinitialise la barre de progression
  }

  resetProgress() {
    this.progressValue = 0;
  }

  updateRefreshPeriod(periodInSeconds: number) {
    this.refreshPeriod = periodInSeconds;
    this.logger.logInfo(this, `Nouvelle période de rafraîchissement : ${periodInSeconds} secondes.`, null);

    if (this.autoRefreshEnabled) {
      this.stopAutoRefresh();
      this.startAutoRefresh();
    }
  }

  openStatusModal() { }


}
