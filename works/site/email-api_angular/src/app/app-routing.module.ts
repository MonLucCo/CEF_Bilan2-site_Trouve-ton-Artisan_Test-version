import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailSenderComponent } from './components/email-sender/email-sender.component';

const routes: Routes = [
  { path: 'send-email', component: EmailSenderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
