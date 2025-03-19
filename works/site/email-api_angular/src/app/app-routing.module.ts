import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailSenderComponent } from './components/email-sender/email-sender.component';
import { EmailHistoryComponent } from './components/email-history/email-history.component';
import { HeroComponent } from './components/hero/hero.component';
import { MessageHistoryComponent } from './components/message-history/message-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // redirection par défaut
  { path: 'accueil', component: HeroComponent },
  { path: 'send-email', component: EmailSenderComponent },
  { path: 'email-history', component: MessageHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
