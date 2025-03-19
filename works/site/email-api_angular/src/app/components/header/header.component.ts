import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../services/status/status.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  serverStatus: string = 'UNKNOWN'; // Initialisation de la variable
  mailDevStatus: string = 'UNKNOWN';

  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    // Appel initial pour récupérer les statuts
    this.statusService.fetchServerStatus().subscribe((response) => {
      this.serverStatus = response.status; // Met à jour serverStatus
    });

    this.statusService.fetchMailDevStatus().subscribe((response) => {
      this.mailDevStatus = response.status; // Met à jour mailDevStatus
    });
  }

}
