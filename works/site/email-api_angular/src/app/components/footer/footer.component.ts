import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../services/status/status.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  serverStatus: string = 'UNKNOWN'; // Initialisation de la variable
  mailDevStatus: string = 'UNKNOWN'; // Initialisation de la variable

  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    // S'abonner aux statuts pour affichage en temps réel
    this.statusService.serverStatus$.subscribe(status => this.serverStatus = status);
    this.statusService.mailDevStatus$.subscribe(status => this.mailDevStatus = status);
  }
}
