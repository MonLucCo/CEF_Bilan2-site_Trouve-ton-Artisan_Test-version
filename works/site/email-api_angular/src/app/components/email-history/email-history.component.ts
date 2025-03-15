import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-history',
  standalone: false,
  templateUrl: './email-history.component.html',
  styleUrl: './email-history.component.css'
})
export class EmailHistoryComponent implements OnInit {
  emailHistory = [
    { from: 'example1@example.com', to: 'example2@example.com', subject: 'Test 1', date: '2025-03-14' },
    { from: 'example3@example.com', to: 'example4@example.com', subject: 'Test 2', date: '2025-03-13' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
